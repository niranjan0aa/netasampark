<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Voter;
use App\Services\CommunicationService;
use Illuminate\Http\Request;

class CommunicationController extends Controller
{
    public function __construct(
        private CommunicationService $communicationService
    ) {}

    /**
     * Show inbox with all inbound messages
     */
    public function inbox(Request $request)
    {
        $query = Message::with(['voter', 'campaign'])
            ->where('direction', 'inbound')
            ->latest();

        // Filter by channel
        if ($request->filled('channel')) {
            $query->where('channel', $request->channel);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search in content
        if ($request->filled('search')) {
            $query->where('content', 'like', '%' . $request->search . '%');
        }

        $messages = $query->paginate(25)->withQueryString();

        return inertia('Communications/Inbox', [
            'messages' => $messages,
            'filters' => $request->only(['channel', 'status', 'search']),
        ]);
    }

    /**
     * Show message templates
     */
    public function templates()
    {
        // TODO: Implement template management
        $templates = [
            [
                'id' => 1,
                'name' => 'Festival Wishes',
                'channel' => 'whatsapp',
                'content' => 'Dear {{name}}, Wishing you and your family a very happy {{festival}}! 🎉',
                'template_id' => 'festival_wishes_001',
                'status' => 'approved',
            ],
            [
                'id' => 2,
                'name' => 'Meeting Invitation',
                'channel' => 'sms',
                'content' => 'Hi {{name}}, You are invited to attend the booth committee meeting on {{date}} at {{venue}}. Please confirm your attendance.',
                'template_id' => 'meeting_invite_001',
                'status' => 'approved',
            ],
        ];

        return inertia('Communications/Templates', [
            'templates' => $templates,
        ]);
    }

    /**
     * Send individual message
     */
    public function send(Request $request)
    {
        $validated = $request->validate([
            'voter_id' => 'required|exists:voters,id',
            'channel' => 'required|in:sms,whatsapp,email,voice',
            'content' => 'required|string',
            'template_id' => 'nullable|string',
        ]);

        $voter = Voter::findOrFail($validated['voter_id']);

        // Check consent
        if (!$voter->hasConsent($validated['channel'])) {
            return back()->with('error', 'Voter has not consented to ' . $validated['channel'] . ' communication.');
        }

        // Create message record
        $message = Message::create([
            'voter_id' => $voter->id,
            'channel' => $validated['channel'],
            'direction' => 'outbound',
            'status' => 'pending',
            'content' => $validated['content'],
            'to_number' => $voter->phone,
            'to_email' => $voter->email,
            'template_id' => $validated['template_id'],
        ]);

        try {
            // Send message
            $result = match($validated['channel']) {
                'sms' => $this->communicationService->sendSMS($voter->phone, $validated['content']),
                'whatsapp' => $this->communicationService->sendWhatsApp($voter->phone, $validated['content']),
                'email' => $this->communicationService->sendEmail($voter->email, 'Message from Campaign', $validated['content']),
                'voice' => $this->communicationService->makeVoiceCall($voter->phone, config('services.voice.caller_id')),
            };

            // Update message
            $message->update([
                'status' => $result['success'] ? 'sent' : 'failed',
                'external_id' => $result['message_id'] ?? null,
                'failure_reason' => $result['error'] ?? null,
                'sent_at' => $result['success'] ? now() : null,
            ]);

            if ($result['success']) {
                return back()->with('success', 'Message sent successfully.');
            } else {
                return back()->with('error', 'Failed to send message: ' . ($result['error'] ?? 'Unknown error'));
            }

        } catch (\Exception $e) {
            $message->update([
                'status' => 'failed',
                'failure_reason' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to send message: ' . $e->getMessage());
        }
    }

    /**
     * Handle inbound message webhook
     */
    public function handleInbound(Request $request)
    {
        // This would be called by SMS/WhatsApp providers
        $validated = $request->validate([
            'from' => 'required|string',
            'to' => 'required|string',
            'content' => 'required|string',
            'channel' => 'required|in:sms,whatsapp',
            'message_id' => 'required|string',
            'timestamp' => 'required',
        ]);

        // Find voter by phone number
        $voter = Voter::where('phone', $validated['from'])->first();

        // Create inbound message
        Message::create([
            'voter_id' => $voter?->id,
            'channel' => $validated['channel'],
            'direction' => 'inbound',
            'status' => 'received',
            'content' => $validated['content'],
            'from_number' => $validated['from'],
            'to_number' => $validated['to'],
            'external_id' => $validated['message_id'],
            'conversation_id' => $this->getOrCreateConversationId($validated['from'], $validated['channel']),
        ]);

        // TODO: Auto-create ticket if needed
        // TODO: Send auto-reply if configured

        return response()->json(['status' => 'received']);
    }

    /**
     * Get or create conversation ID for threading
     */
    private function getOrCreateConversationId(string $phoneNumber, string $channel): string
    {
        // Simple conversation ID based on phone and channel
        return md5($phoneNumber . '_' . $channel);
    }
}
