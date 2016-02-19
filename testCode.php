<?php
include 'imdb.php';

$imdb = new Imdb();
var_dump($imdb->getMovieInfo('kung fu panda 3'));