<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en" xmlns:http="http://www.w3.org/1999/xhtml">
<head>
    <title>Not Found</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/styles/style.css" type="text/css" media="all" />
</head>
<body>
<div class="row">
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
    <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8">
        <?php include 'headers_test.php'; ?>
    </div>
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
</div>
<div class="row">
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
    <div class="col-xs-8 col-md-8 col-lg-8 col-sm-8">
        <h1 style="text-align: center;">The movie that you are searching for was not found</h1>
    </div>
    <div class="col-xs-2 col-md-2 col-lg-2 col-sm-2"></div>
</div>

    <?php include "footers_test.php"; ?>
</body>
</html>