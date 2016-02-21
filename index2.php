<?php
session_start();
include 'views/headers.php';
include 'imdb.php';
$obj = new Imdb();
$var = $obj->getMovieInfo("Titanic");
//var_dump($var);
$va = file_put_contents('./'.$var['title'].'.jpg', file_get_contents('http://ia.media-imdb.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1._SX214_CR0,0,214,314_.jpg'));
//$rt = file_get_contents("http://www.rottentomatoes.com/m/deadpool/");
$url_for_search_movie_by_title = 'http://www.rottentomatoes.com/m/deadpool/';
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url_for_search_movie_by_title);
$content = curl_exec($ch);
//$content;
?>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <!--<script data-main="/scripts/RottenCrawler.js" src="http://requirejs.org/docs/release/2.1.11/minified/require.js"></script>-->
    <!--<script src="http://requirejs.org/docs/release/2.1.11/minified/require.js"></script>-->
    <!--<script src="/scripts/RottenCrawler.js"></script>-->
    <!--<script data-main="/scripts/main.js" src="/scripts/RottenCrawler.js"></script>-->
    <script src="/scripts/bundle.js"></script>
</head>
<body>
<script>

    var obj = new RottenCrawler(<?php echo '"'.'qwerty'.'"' ?>);
    obj.getMovieInfo()
        .then(function() {
            console.log(rc);
        });
    console.log('-***************************************************************');
</script>
<img class="" id="poster_image" src = <?php echo './'.$var['title'].'.jpg'; ?>>
<p>this is the home page</p>
</body>

</html>
<?php
include 'views/footers.php';
?>