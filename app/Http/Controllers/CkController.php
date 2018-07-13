<?php

namespace App\Http\Controllers;

use App\Services\ShortcodeGenerator;
use App\Services\WordEncoder;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CkController extends Controller
{
    const URL_PATTERN = '#^https://www\.chefkoch\.de/rezepte/(\d+)#';
    const RANGE = 1000000;

    public function encode(WordEncoder $encoder, ShortcodeGenerator $shortcode, string $url)
    {
        if (!preg_match(self::URL_PATTERN, $url, $matches)) {
            throw new HttpException(404, "URL parameter does not match expected pattern");
        }
        $recipe_id = $matches[1];

        $code = $shortcode->encode($recipe_id, self::RANGE, [
            'realm' => 'chefkoch',
            'type' => 'recipe'
        ]);

        return $encoder->encode($code);
    }

    public function decode(WordEncoder $encoder, ShortcodeGenerator $shortcode, string $words)
    {
        $code = $encoder->decode($words);
        return $shortcode->decode($code, [
            'realm' => 'chefkoch',
            'type' => 'recipe'
        ]);
    }
}
