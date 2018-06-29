<?php

error_log(strftime('[%Y-%m-%d %H:%M:%S] URL: ' . $_GET['url'] . "\n"), 3, '/tmp/voico.log');
