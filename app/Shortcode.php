<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shortcode extends Model
{
    protected $fillable = ['key', 'realm', 'type', 'value'];

}