<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todoup extends Model
{
    protected $fillable = [
        'name',
        'priority',
        'date',
        'message'
    ];

    public function getPriorityAttribute($value)
    {
        $priorities = [
            'normal' => 'Normál',
            'urgent' => 'Sürgős',
            'extraUrgent' => 'Extra sürgős',
        ];

        return $priorities[$value] ?? $value;
    }
}