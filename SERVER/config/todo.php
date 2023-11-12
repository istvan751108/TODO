<?php

return [
    'validation' => [
        'name' => 'required|min:4|max:20',
        'priority' => 'required|in:normal,urgent,extraUrgent',
        'date' => 'required',
        'message' => 'required|min:10|max:300',
    ],
];
