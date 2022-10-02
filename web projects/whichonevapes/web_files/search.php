<!DOCTYPE html>
<html>
<head>
<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table, td, th {
  border: 1px solid black;
  padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>
<?php


$mysqli = new mysqli("localhost", "root", "knoxkuc", "which_one");
if ($mysqli->connect_error) {
  die('Could not connect: ' . mysqli_error($con));
}

echo "<table>
<tr>
<th>Name</th>
<th>Profession</th>
<th>Score</th>
<th>Rank</th>
</tr>";
$sql="SELECT * FROM ( SELECT name, profession, score, @curRank := IF(@prevRank = score, @curRank , IF(@prevRank := score, @curRank + 1, @curRank + 1 ) ) as rank FROM celebrity_list u CROSS JOIN (SELECT @curRank := 0, @prevRank := NULL, @row := 0) r ORDER BY score DESC ) T WHERE name LIKE ? ORDER BY `score` DESC";
$stmt = $mysqli->prepare($sql);
$param = "%{$_GET['q']}%";
$is_success = $stmt->bind_param("s", $param);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($name, $profession, $score, $rank);

while ($stmt->fetch()) {
echo "<tr>";
echo "<td>" . $name . "</td>";
echo "<td>" . $profession . "</td>";
echo "<td>" . $score . "</td>";
echo "<td>" . $rank . "</td>";
echo "</tr>";
}
echo "</table>";
$stmt->close();
?>
</body>
</html>