<?php
if (!isset($_POST["guid"])) die();
if (!isset($_POST["code"])) die();
$guid = $_POST["guid"];
$code = $_POST["code"];

define('_ZEXEC', 1);
require_once "../config.php";
require_once "../model/class.dal.php";
$ZDal = new ZDal();

// Retrieve the configuration
$sql = "
  SELECT id
  FROM users
  WHERE server = '{$guid}' AND code = '{$code}'
";

$ret = $ZDal->z_query($sql);
$arr = $ZDal->z_fetch_assoc();
if ($arr) {
  $user = $arr["id"];
} else {
  $user = 1; // user not found, use the default user
}

echo json_encode(["user", $user]);
?>
