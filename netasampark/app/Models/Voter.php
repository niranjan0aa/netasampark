<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Voter extends Model
{
    use Searchable;

    protected $fillable = [
        'voter_id',
        'name',
        'father_name',
        'mother_name',
        'gender',
        'date_of_birth',
        'age',
        'phone',
        'email',
        'address',
        'pincode',
        'booth_id',
        'ward_id',
        'constituency_id',
        'caste',
        'religion',
        'occupation',
        'education',
        'economic_status',
        'support_level',
        'is_influencer',
        'influence_score',
        'tags',
        'household_id',
        'is_head_of_household',
        'sms_consent',
        'whatsapp_consent',
        'email_consent',
        'voice_consent',
        'consent_updated_at',
        'last_contacted_at',
        'total_interactions',
        'engagement_score',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'tags' => 'array',
        'is_influencer' => 'boolean',
        'is_head_of_household' => 'boolean',
        'sms_consent' => 'boolean',
        'whatsapp_consent' => 'boolean',
        'email_consent' => 'boolean',
        'voice_consent' => 'boolean',
        'consent_updated_at' => 'datetime',
        'last_contacted_at' => 'datetime',
        'engagement_score' => 'decimal:2',
    ];

    // Relationships
    public function booth(): BelongsTo
    {
        return $this->belongsTo(Booth::class);
    }

    public function ward(): BelongsTo
    {
        return $this->belongsTo(Ward::class);
    }

    public function constituency(): BelongsTo
    {
        return $this->belongsTo(Constituency::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    // Scopes
    public function scopeWithConsent($query, $channel)
    {
        return $query->where($channel . '_consent', true);
    }

    public function scopeInfluencers($query)
    {
        return $query->where('is_influencer', true);
    }

    public function scopeBySupport($query, $level)
    {
        return $query->where('support_level', $level);
    }

    public function scopeByConstituency($query, $constituencyId)
    {
        return $query->where('constituency_id', $constituencyId);
    }

    public function scopeByBooth($query, $boothId)
    {
        return $query->where('booth_id', $boothId);
    }

    // Searchable configuration
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'voter_id' => $this->voter_id,
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'constituency' => $this->constituency->name ?? '',
            'ward' => $this->ward->name ?? '',
            'booth' => $this->booth->name ?? '',
        ];
    }

    // Helper methods
    public function hasConsent(string $channel): bool
    {
        return $this->{$channel . '_consent'} ?? false;
    }

    public function getFullNameAttribute(): string
    {
        return trim($this->name . ' S/O ' . $this->father_name);
    }

    public function getSupportLevelColorAttribute(): string
    {
        return match($this->support_level) {
            'strong_support' => 'green',
            'lean_support' => 'lime',
            'neutral' => 'gray',
            'lean_opposition' => 'orange',
            'strong_opposition' => 'red',
            default => 'gray',
        };
    }
}
