<?php
require 'vendor/autoload.php';

class RottenTomatoesInfo {
    function __construct($tomatoURL){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL,$tomatoURL);
        $content = curl_exec($ch);
        $this->doc = phpQuery::newDocument($content);
        curl_close($ch);
    }

    public function top_critics() {
        $doc = $this->doc;
        /*for top critics*/
        // get percentage
        $top_critics_all =  $doc['div#top-critics-numbers'];
        $top_critics_score = $top_critics_all['span[itemprop=ratingValue]'];

        //get average rating, reviews counted , fresh and rotten
        $top_critics_get_left_data = array();
        $top_critics_all_data = $top_critics_all['div#scoreStats']->remove();
        $top_critics_score_data = $top_critics_all_data['span.subtle']->remove();

        $str = explode(" ", $top_critics_all_data->text());
        $top_critics_get_left_data['Percentage'] = $top_critics_score->html();
        $top_critics_get_left_data['Average_Rating'] = $str[3];
        $top_critics_get_left_data['Reviews_Counted'] = $str[7];
        $top_critics_get_left_data['Fresh'] = $str[11];
        $top_critics_get_left_data['Rotten'] = $str[14];
        //print_r($top_critics_get_left_data);
        return $top_critics_get_left_data;
        // end getting values of top-critics for percentage, average rating, reviews counted , fresh and rotten
        /*end top critics*/
    }

    public function all_critics() {
        $doc = $this->doc;
        /*for all critics*/
        // get percentage
        $all_critics_all =  $doc['div#all-critics-numbers'];
        $all_critics_score = $all_critics_all['span[itemprop=ratingValue]'];

        //get average rating, reviews counted , fresh and rotten
        $all_critics_get_left_data = array();
        $all_critics_all_data = $all_critics_all['div#scoreStats']->remove();
        $all_critics_score_data = $all_critics_all_data['span.subtle']->remove();

        $str = explode(" ", $all_critics_all_data->text());
        $all_critics_get_left_data['Percentage'] = $all_critics_score->html();
        $all_critics_get_left_data['Average_Rating'] = $str[3];
        $all_critics_get_left_data['Reviews_Counted'] = $str[7];
        $all_critics_get_left_data['Fresh'] = $str[11];
        $all_critics_get_left_data['Rotten'] = $str[14];
        //print_r($all_critics_get_left_data);
        return $all_critics_get_left_data;
        // end getting values of all-critics for percentage, average rating, reviews counted , fresh and rotten
        /*end all critics*/
    }
    public function audience() {
        $doc = $this->doc;
        /*for audience data*/ //meter-value
        $per = $doc['div.meter-value']->text();
        $p = explode('%',$per);
        $save =  $doc['div.audience-info']->remove();
        $audience_data = array();
        $str = explode(':',$save['div']->text());
        $str_1 = explode(" ",$str[1]);
        $audience_data['Average_Rating'] = $str_1[1];
        $audience_data['User_Ratings'] = $str[2];
        $audience_data['User_Percentage'] = $p[0];
        //print_r($audience_data);
        return $audience_data;
        /*end audience data*/
    }

    public function consensus() {
        $doc = $this->doc;
        /*for consensus*/
        $save = $doc['p.critic_consensus']->remove();
        //$save = $doc['span.subtle']->text();
        $str = explode(":",$save->text());
        $str_1 = explode("Critics Consensus",$str[1]);
        $consensus_data = array();
        $consensus_data['Consensus'] = $str_1[0];
        return $consensus_data;
    }
}
//$doc = phpQuery::newDocument($content);
/*$url = 'http://www.rottentomatoes.com/m/now_you_see_me_2/';
$obj = new RottenTomatoesInfo($url);
print_r($obj->audience());*/
//echo $obj->consensus()['Consensus'];