<?php
$dict = preg_split("/\n/", trim(file_get_contents('short.txt')));

function encode($n)
{
    global $dict;
    $len = count($dict);

    $result = [];
    while ($n > 0) {
        array_unshift($result, $dict[$n % $len]);
        $n = intdiv($n, $len);
    }
    return join(', ', $result);
}

function decode($w)
{
    global $dict;
    $reverse = array_flip($dict);
    $len = count($dict);

    $words = preg_split('/,\s*/', $w);
    $factor = 1;
    $result = 0;
    while ($words) {
        $word = array_pop($words);
        if (!isset($reverse[$word])) {
            return "ERROR";
        }
        $result += $n = $reverse[$word] * $factor;
        $factor *= $len;
    }
    return $result;
}

if (isset($_GET['n'])) {
    $n = intval($_GET['n']);
    echo encode($n);
}
else
if (isset($_GET['w'])) {
    echo decode($_GET['w']);
}
else {
    echo "ERROR";
}
