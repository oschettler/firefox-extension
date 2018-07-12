<?php
$words = preg_split("/\n/", file_get_contents('php://stdin'));
foreach ($words as $word) {
    if (strlen($word) < 7) {
        echo $word, "\n";
    }
}
