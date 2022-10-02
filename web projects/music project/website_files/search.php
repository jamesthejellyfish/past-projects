<?php


$mysqli = new mysqli("localhost", "root", "knoxkuc", "music_database");
if ($mysqli->connect_error) {
  die('Could not connect: ' . mysqli_error($con));
}

$sql="SELECT * FROM `music_list` WHERE `lyrics` LIKE '%". $_GET['q'] . "%' ORDER BY `popularity` DESC LIMIT 20";
$stmt = $mysqli->prepare($sql);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($song, $artist, $lyrics, $timestamped_lyrics, $filename, $popularity);
while ($stmt->fetch()) {
$seperated_lyrics = explode("\n", $timestamped_lyrics);
//$comma_separated  = implode(":", $seperated_lyrics);
//echo $comma_separated;
foreach ($seperated_lyrics as $lyric){
	if (strpos($lyric, $_GET['q']) !== false){
		$index = array_search($lyric, $seperated_lyrics);
		$prev_lyric_array = explode(' ', $seperated_lyrics[max($index-1, 0)]);
		$next_lyric_array = explode(' ', $seperated_lyrics[min($index+1, count($seperated_lyrics))]);
		$start_time = intval(floatval($prev_lyric_array[0]));
		$end_time = intval(floatval($next_lyric_array[1]));
		$video_url = substr($filename, -15, 11);
		echo '<iframe width="560" height="315" src="https://www.youtube.com/embed/' . $video_url . '?start=' . max($start_time, 0) . '&end=' . ($end_time) . '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		echo "<p>" . str_replace($_GET['q'],"<b>" . $_GET['q'] . "</b>",preg_replace('/\d+\.\d+ /', '', $lyric)) . "</p>";
	}
}
}
$stmt->close();
?>