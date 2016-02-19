<?php
$get_str = "Killer Zombies from the Titanic";
$str = str_replace(' ','-',$get_str);
echo $str . "<br>";
$get_trailer = $str;
$url_get_trailer = 'http://api.traileraddict.com/?count=1&width=680&credit=no&film='.$get_trailer;
echo $url_get_trailer;
$upcoming = simplexml_load_file($url_get_trailer);
foreach($upcoming->trailer as $x => $updates)
{
    echo $updates->embed;
    echo '<br><br>';
}

$url_get_trailer = 'http://simpleapi.traileraddict.com/'.$get_trailer.'/trailer';
echo $url_get_trailer;
$upcoming = simplexml_load_file($url_get_trailer);
foreach($upcoming->trailer as $x => $updates)
{
    echo $updates->film;
    echo '<br>';
    echo $updates->release_date;
    echo '<br>';
    echo $updates->cast;
    echo '<br>';
    echo $updates->description;
    echo '<br>';
    //now echo the embedded trailer (large)
    echo $updates->embed_large;
}
?>
