<?php

namespace App\Services;

use App\Models\Message;
use App\Models\Campaign;
use App\Models\Voter;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CommunicationService
{
    /**
     * Send SMS via configured provider
     */
    public function sendSMS(string $to, string $message, ?string $templateId = null, array $params = []): array
    {
        $provider = config('services.sms.provider', 'gupshup');
        
        return match($provider) {
            'gupshup' => $this->sendGupshupSMS($to, $message, $templateId, $params),
            'msg91' => $this->sendMsg91SMS($to, $message, $templateId, $params),
            'routemobile' => $this->sendRouteMobileSMS($to, $message, $templateId, $params),
            default => throw new \Exception("Unsupported SMS provider: {$provider}"),
        };
    }

    /**
     * Send WhatsApp message via BSP
     */
    public function sendWhatsApp(string $to, string $message, ?string $templateId = null, array $params = []): array
    {
        $provider = config('services.whatsapp.provider', 'gupshup');
        
        return match($provider) {
            'gupshup' => $this->sendGupshupWhatsApp($to, $message, $templateId, $params),
            'meta' => $this->sendMetaWhatsApp($to, $message, $templateId, $params),
            default => throw new \Exception("Unsupported WhatsApp provider: {$provider}"),
        };
    }

    /**
     * Send email via SES
     */
    public function sendEmail(string $to, string $subject, string $content, array $attachments = []): array
    {
        try {
            // Using Laravel's mail system with SES
            \Mail::send([], [], function ($message) use ($to, $subject, $content) {
                $message->to($to)
                    ->subject($subject)
                    ->html($content);
            });

            return [
                'success' => true,
                'message_id' => uniqid('email_'),
                'status' => 'sent',
            ];
        } catch (\Exception $e) {
            Log::error('Email sending failed', [
                'to' => $to,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage(),
                'status' => 'failed',
            ];
        }
    }

    /**
     * Make voice call via Exotel
     */
    public function makeVoiceCall(string $to, string $callerId, ?string $audioUrl = null): array
    {
        $provider = config('services.voice.provider', 'exotel');
        
        return match($provider) {
            'exotel' => $this->makeExotelCall($to, $callerId, $audioUrl),
            'twilio' => $this->makeTwilioCall($to, $callerId, $audioUrl),
            default => throw new \Exception("Unsupported voice provider: {$provider}"),
        };
    }

    /**
     * Send bulk campaign
     */
    public function sendCampaign(Campaign $campaign): void
    {
        $voters = $this->getTargetVoters($campaign);
        
        foreach ($voters as $voter) {
            $this->sendCampaignMessage($campaign, $voter);
        }
    }

    /**
     * Send campaign message to individual voter
     */
    private function sendCampaignMessage(Campaign $campaign, Voter $voter): void
    {
        // Check consent
        if (!$voter->hasConsent($campaign->type)) {
            return;
        }

        // Personalize message
        $personalizedContent = $this->personalizeMessage($campaign->message_content, $voter);

        // Create message record
        $message = Message::create([
            'campaign_id' => $campaign->id,
            'voter_id' => $voter->id,
            'channel' => $campaign->type,
            'direction' => 'outbound',
            'status' => 'pending',
            'content' => $personalizedContent,
            'to_number' => $voter->phone,
            'to_email' => $voter->email,
        ]);

        // Send via appropriate channel
        try {
            $result = match($campaign->type) {
                'sms' => $this->sendSMS($voter->phone, $personalizedContent),
                'whatsapp' => $this->sendWhatsApp($voter->phone, $personalizedContent),
                'email' => $this->sendEmail($voter->email, $campaign->name, $personalizedContent),
                'voice' => $this->makeVoiceCall($voter->phone, config('services.voice.caller_id')),
            };

            // Update message status
            $message->update([
                'status' => $result['success'] ? 'sent' : 'failed',
                'external_id' => $result['message_id'] ?? null,
                'failure_reason' => $result['error'] ?? null,
                'sent_at' => $result['success'] ? now() : null,
                'cost' => $this->calculateMessageCost($campaign->type),
            ]);

            // Update campaign stats
            $campaign->increment($result['success'] ? 'sent_count' : 'failed_count');

        } catch (\Exception $e) {
            Log::error('Campaign message sending failed', [
                'campaign_id' => $campaign->id,
                'voter_id' => $voter->id,
                'error' => $e->getMessage(),
            ]);

            $message->update([
                'status' => 'failed',
                'failure_reason' => $e->getMessage(),
            ]);

            $campaign->increment('failed_count');
        }
    }

    /**
     * Get target voters for campaign
     */
    private function getTargetVoters(Campaign $campaign): \Illuminate\Database\Eloquent\Collection
    {
        $query = Voter::query();

        // Apply campaign segments
        foreach ($campaign->target_segments as $segment) {
            switch ($segment['type']) {
                case 'constituency':
                    $query->whereIn('constituency_id', $segment['values']);
                    break;
                case 'support_level':
                    $query->whereIn('support_level', $segment['values']);
                    break;
                case 'age_range':
                    $query->whereBetween('age', [$segment['min'], $segment['max']]);
                    break;
                case 'gender':
                    $query->whereIn('gender', $segment['values']);
                    break;
                case 'tags':
                    $query->whereJsonContains('tags', $segment['values']);
                    break;
            }
        }

        // Ensure consent for the channel
        $query->where($campaign->type . '_consent', true);

        return $query->get();
    }

    /**
     * Personalize message content with voter data
     */
    private function personalizeMessage(string $content, Voter $voter): string
    {
        $replacements = [
            '{{name}}' => $voter->name,
            '{{first_name}}' => explode(' ', $voter->name)[0],
            '{{voter_id}}' => $voter->voter_id,
            '{{constituency}}' => $voter->constituency->name ?? '',
            '{{ward}}' => $voter->ward->name ?? '',
            '{{booth}}' => $voter->booth->number ?? '',
        ];

        return str_replace(array_keys($replacements), array_values($replacements), $content);
    }

    /**
     * Calculate cost per message based on channel
     */
    private function calculateMessageCost(string $channel): float
    {
        return match($channel) {
            'sms' => 0.25, // ₹0.25 per SMS
            'whatsapp' => 0.50, // ₹0.50 per WhatsApp
            'email' => 0.05, // ₹0.05 per email
            'voice' => 2.00, // ₹2.00 per minute
            default => 0.00,
        };
    }

    // Provider-specific implementations

    private function sendGupshupSMS(string $to, string $message, ?string $templateId = null, array $params = []): array
    {
        $apiKey = config('services.sms.gupshup.api_key');
        $senderId = config('services.sms.gupshup.sender_id');

        $response = Http::withHeaders([
            'apikey' => $apiKey,
        ])->post('https://enterprise.smsgupshup.com/GatewayAPI/rest', [
            'method' => 'SendMessage',
            'send_to' => $to,
            'msg' => $message,
            'userid' => config('services.sms.gupshup.user_id'),
            'password' => config('services.sms.gupshup.password'),
            'v' => '1.1',
            'format' => 'json',
            'msg_type' => 'TEXT',
            'auth_scheme' => 'plain',
        ]);

        if ($response->successful()) {
            $data = $response->json();
            return [
                'success' => true,
                'message_id' => $data['response']['id'] ?? uniqid('sms_'),
                'status' => 'sent',
            ];
        }

        return [
            'success' => false,
            'error' => $response->body(),
            'status' => 'failed',
        ];
    }

    private function sendGupshupWhatsApp(string $to, string $message, ?string $templateId = null, array $params = []): array
    {
        $apiKey = config('services.whatsapp.gupshup.api_key');
        $appId = config('services.whatsapp.gupshup.app_id');

        $payload = [
            'channel' => 'whatsapp',
            'source' => $appId,
            'destination' => $to,
            'message' => [
                'type' => 'text',
                'text' => $message,
            ],
        ];

        $response = Http::withHeaders([
            'apikey' => $apiKey,
            'Content-Type' => 'application/json',
        ])->post('https://api.gupshup.io/sm/api/v1/msg', $payload);

        if ($response->successful()) {
            $data = $response->json();
            return [
                'success' => true,
                'message_id' => $data['messageId'] ?? uniqid('wa_'),
                'status' => 'sent',
            ];
        }

        return [
            'success' => false,
            'error' => $response->body(),
            'status' => 'failed',
        ];
    }

    private function makeExotelCall(string $to, string $callerId, ?string $audioUrl = null): array
    {
        $accountSid = config('services.voice.exotel.account_sid');
        $apiKey = config('services.voice.exotel.api_key');
        $apiSecret = config('services.voice.exotel.api_secret');

        $response = Http::withBasicAuth($apiKey, $apiSecret)
            ->post("https://api.exotel.com/v1/Accounts/{$accountSid}/Calls/connect.json", [
                'From' => $callerId,
                'To' => $to,
                'Url' => $audioUrl ?? config('services.voice.exotel.default_url'),
                'CallType' => 'trans',
            ]);

        if ($response->successful()) {
            $data = $response->json();
            return [
                'success' => true,
                'call_id' => $data['Call']['Sid'] ?? uniqid('call_'),
                'status' => 'initiated',
            ];
        }

        return [
            'success' => false,
            'error' => $response->body(),
            'status' => 'failed',
        ];
    }

    private function sendMsg91SMS(string $to, string $message, ?string $templateId = null, array $params = []): array
    {
        // MSG91 implementation
        return ['success' => false, 'error' => 'MSG91 not implemented yet'];
    }

    private function sendRouteMobileSMS(string $to, string $message, ?string $templateId = null, array $params = []): array
    {
        // RouteMobile implementation
        return ['success' => false, 'error' => 'RouteMobile not implemented yet'];
    }

    private function sendMetaWhatsApp(string $to, string $message, ?string $templateId = null, array $params = []): array
    {
        // Meta Cloud API implementation
        return ['success' => false, 'error' => 'Meta WhatsApp not implemented yet'];
    }

    private function makeTwilioCall(string $to, string $callerId, ?string $audioUrl = null): array
    {
        // Twilio implementation
        return ['success' => false, 'error' => 'Twilio not implemented yet'];
    }
}