<?php

namespace App\Services;

use App\Shortcode;

class ShortcodeGenerator
{
    public function encode($value, $range, $options = [])
    {
        $realm = $options['realm'] ?? null;
        $type = $options['type'] ?? null;

        $shortcode = Shortcode::where('value', $value)
            ->where('realm', $realm)
            ->where('type', $type)
            ->first();

        while (!$shortcode) {
            $shortcode = Shortcode::create([
                'key' => random_int(1, $range - 1),
                'realm' => $realm,
                'type' => $type,
                'value' => $value,
            ]);
        }

        return $shortcode->key;
    }

    public function decode($key, $options = [])
    {
        $realm = $options['realm'] ?? null;
        $type = $options['type'] ?? null;

        $shortcode = Shortcode::where('key', $key)
            ->where('realm', $realm)
            ->where('type', $type)
            ->first();

        return $shortcode ? $shortcode->value : null;
    }
}