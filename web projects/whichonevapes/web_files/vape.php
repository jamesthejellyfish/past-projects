<?php
$mysqli = new mysqli("localhost", "root", "knoxkuc", "which_one");
if($mysqli->connect_error) {
  exit('Could not connect');
}
$iv = '1234567891011121';
$key = "whichOneVapes";
$ciphering = "AES-128-CTR";
$iv_length = openssl_cipher_iv_length($ciphering);
$options = 0;

$checkmark = $_COOKIE['checkbox'];
$checks = array("Movie Actress", "TV Actress", "Voice Actress", "Stage Actress", "Soap Opera Actress", "Movie Actor", "TV Actor", "Voice Actor", "Stage Actor", "Soap Opera Actor", "YouTube Star", "TikTok Star", "Instagram Star", "Podcaster", "Country Singer", "Soul Singer", "Rock Singer", "World Music Singer", "Reggae Singer", "R&B Singer", "Punk Singer", "Pop Singer", "Opera Singer", "Metal Singer", "Folk Singer");
for($i = 0; $i <= count($checks); $i++) {
	 if($checkmark[$i] == "1"){
     ${"variable$i"} = $checks[$i];
	 }
	 else{
	 ${"variable$i"} = "cheese";
	 }
}
	if(openssl_decrypt($_COOKIE["name1"], $ciphering, $key, $options, $iv) == $_COOKIE["name1Hash"] && openssl_decrypt($_COOKIE["name2"], $ciphering, $key, $options, $iv) == $_COOKIE["name2Hash"]){
	if($_GET['q'] == '1'){
	$sql = "SELECT `score` FROM `celebrity_list` WHERE `name`=?";
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("s", $_COOKIE["name1"]);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($cscore);
	$stmt->fetch();	
	$cscore = $cscore + 1;
	$cscore = strval($cscore);
	$sql = "UPDATE `celebrity_list` SET `score`='" . $cscore . "' WHERE `name`=?";
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("s", $_COOKIE["name1"]);
	$stmt->execute();
	$sql = "SELECT `score` FROM `celebrity_list` WHERE `name`=?";
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("s", $_COOKIE["name2"]);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($cscore);
	$stmt->fetch();	
	//$cscore = $cscore - 1;
	$cscore = strval($cscore);
	//$sql = "UPDATE `celebrity_list` SET `score`='" . $cscore . "' WHERE `name`='" . $_COOKIE["name2"] . "'";
	//$stmt = $mysqli->prepare($sql);
	//$stmt->execute();
	}
	if($_GET['q'] == '2'){
	$sql = "SELECT `score` FROM `celebrity_list` WHERE `name`=?";
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("s", $_COOKIE["name2"]);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($cscore);
	$stmt->fetch();	
	$cscore = $cscore + 1;
	$cscore = strval($cscore);
	$sql = "UPDATE `celebrity_list` SET `score`='" . $cscore . "' WHERE `name`=?";
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("s", $_COOKIE["name2"]);
	$stmt->execute();
	$sql = "SELECT `score` FROM `celebrity_list` WHERE `name`=?";
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("s", $_COOKIE["name1"]);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($cscore);
	$stmt->fetch();	
	//$cscore = $cscore - 1;
	$cscore = strval($cscore);
	//$sql = "UPDATE `celebrity_list` SET `score`='" . $cscore . "' WHERE `name`='" . $_COOKIE["name1"] . "'";
	//$stmt = $mysqli->prepare($sql);
	//$stmt->execute();
}
	}
	

$sql = "SELECT name, profession, score, info FROM celebrity_list WHERE `profession`='" . $variable0 . "' OR `profession`='" . $variable1 . "' OR `profession`='" . $variable2 . "' OR `profession`='" . $variable2 . "' OR `profession`='" . $variable3 . "' OR `profession`='" . $variable4 . "' OR `profession`='" . $variable5 . "' OR `profession`='" . $variable6 . "' OR `profession`='" . $variable7 . "' OR `profession`='" . $variable8 . "' OR `profession`='" . $variable9 . "' OR `profession`='" . $variable10 . "' OR `profession`='" . $variable11 . "' OR `profession`='" . $variable12 . "' OR `profession`='" . $variable13 . "' OR `profession`='" . $variable14 . "' OR `profession`='" . $variable15 . "' OR `profession`='" . $variable16 . "' OR `profession`='" . $variable17 . "' OR `profession`='" . $variable18 . "' OR `profession`='" . $variable19 . "' OR `profession`='" . $variable20 . "' OR `profession`='" . $variable21 . "' OR `profession`='" . $variable22 . "' OR `profession`='" . $variable23 . "' OR `profession`='" . $variable24 . "' ORDER BY RAND() LIMIT 1";
$stmt = $mysqli->prepare($sql);

$stmt->execute();
$stmt->store_result();
$stmt->bind_result($cname, $cprof, $score, $info);
$stmt->fetch();

//$sql = "SELECT name, profession, score, info FROM celebrity_list ORDER BY RAND() LIMIT 1";

$stmt->execute();
$stmt->store_result();
$stmt->bind_result($cname2, $cprof2, $score2, $info2);
$stmt->fetch();
$stmt->close();

setcookie("name1", $cname);
setcookie("name1Hash", openssl_encrypt($cname, $ciphering,
            $key, $options, $iv));
setcookie("prof1", $cprof);
setcookie("info1", $info);
setcookie("name2", $cname2);
setcookie("name2Hash", openssl_encrypt($cname2, $ciphering,
            $key, $options, $iv));
setcookie("prof2", $cprof2);
setcookie("info2", $info2);
setcookie("winner", "0");
setcookie("score1", $score);
setcookie("score2", $score2);

?>