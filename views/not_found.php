<?php
session_start();
include 'headers.php';
?>
<!DOCTYPE html>
<html lang="en" xmlns:http="http://www.w3.org/1999/xhtml">
<head>
    <title>Not Found</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>The movie that you are searching was not found</h1>
    <a href="javascript:history.go(-1)">GO BACK</a>
</body>
</html>
<?php
include 'footers.php';
?>
