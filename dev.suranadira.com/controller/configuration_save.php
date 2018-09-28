<?php
if (!isset($_POST["user"])) die();
if (!isset($_POST["command"])) die();
$user = $_POST["user"];
$configuration = $_POST["command"];

define('_ZEXEC', 1);
require_once "../config.php";
// require_once "model/class.exception.php";
require_once "../model/class.dal.php";
$ZDal = new ZDal();
$sql = "
  INSERT INTO conf (
    user_fid, conf, status
  )
  VALUES (
    '{$user}', '{$configuration}', 0
  )
  ON DUPLICATE KEY UPDATE
    conf = '{$configuration}', status = 0, modified = UTC_TIMESTAMP()
";

$ZDal->z_query($sql);
echo "success";
?>
