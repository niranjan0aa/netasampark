<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Domain as BaseDomain;

class Domain extends BaseDomain
{
    protected $fillable = [
        'domain',
        'tenant_id',
        'is_primary',
        'certificate_status',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];
}
