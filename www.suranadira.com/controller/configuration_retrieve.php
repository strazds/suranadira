<?php
if (!isset($_POST["user"])) die();
$user = $_POST["user"];

define('_ZEXEC', 1);
require_once "../config.php";
// require_once "model/class.exception.php";
require_once "../model/class.dal.php";
$ZDal = new ZDal();

// Retrieve the configuration
$sql = "
  SELECT conf
  FROM conf
  WHERE user_fid = '{$user}'
";

$ret = $ZDal->z_query($sql);
$arr = $ZDal->z_fetch_assoc();
if (!$arr) {
  $user = 1; // user not found, switch to default user
  // Retrieve the configuration
  $sql = "
    SELECT conf
    FROM conf
    WHERE user_fid = '{$user}'
  ";

  $ret = $ZDal->z_query($sql);
  $arr = $ZDal->z_fetch_assoc();
}

// Set the status of the configuration as retrieved
$sql = "
  UPDATE conf
  SET status = 1
  WHERE user_fid = '{$user}'
";
$ZDal->z_query($sql);

// echo json_encode($arr);
/// echo $arr["conf"];
echo json_encode(["configuration", $arr["conf"]]);
?>
