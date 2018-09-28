<?php

// https://dev.suranadira.com/controller/metronome_retrieve.php?user=1&title=Sura Time 62&page=10

if (!isset($_POST["user"])) die();
$user = $_POST["user"];

if (!isset($_POST["title"])) die();
$title = $_POST["title"]; // Test Composition

if (!isset($_POST["page"])) die();
$page = $_POST["page"];

define('_ZEXEC', 1);
require_once "../config.php";
// require_once "model/class.exception.php";
require_once "../model/class.dal.php";
$ZDal = new ZDal();

// Retrieve the configuration
// $sql = "
//   SELECT page, metronome
//   FROM pages
//   WHERE composition_fid = 3
//   AND page >= 1
//   AND page < 4
//   ORDER BY page ASC
// ";
$sql = "
  SELECT p.metronome, c.width AS page_width, c.height AS page_height
  FROM pages AS p
  LEFT OUTER JOIN compositions AS c ON c.id = p.composition_fid
  WHERE c.title = '{$title}'
  AND p.page = '{$page}'
";

$ZDal->z_query($sql);
// $arr = array();
// for ($n = 0; $n < $ZDal->z_num_rows(); $n++) {
//   $arr[] = $ZDal->z_fetch_assoc();
// }

$arr = $ZDal->z_fetch_assoc();
// echo json_encode($arr);
// echo json_encode(["metronome", $arr["metronome"], $arr["page_width"], $arr["page_height"]]);
// echo json_encode(["metronome", {"metronome": $arr["metronome"], "page_width": $arr["page_width"], "page_height": $arr["page_height"}]]);
echo json_encode(["metronome", $arr]);
// echo json_encode(["metronome", $arr]);
?>
