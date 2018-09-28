<?php

function getGUID() {
  return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}

if (0) {
  setcookie("suranadira-user", "", time() - 3600); // delete cookie
  setcookie("pairing-guid", "", time() - 3600); // delete cookie
  die();
}

$isDevicePaired = false;

if (isset($_COOKIE["suranadira-user"])) {
  $isDevicePaired = true;
}

$code = isset($_REQUEST["code"]) ? $_REQUEST["code"] : "";
$arr = array("code" => "none");
$z_insert_id = null;
// echo $code;

if (!$isDevicePaired && $code != "") {
  define('_ZEXEC', 1);
  require_once "config.php";
  // require_once "model/class.exception.php";
  require_once "model/class.dal.php";
  $ZDal = new ZDal();

  // Retrieve the configuration
  $pairing_code_timeout = ZConfig::$pairing_code_timeout;
  $sql = "
    SELECT guid, code
    FROM codes
    WHERE code = '{$code}'
    AND created >= NOW() - INTERVAL {$pairing_code_timeout} MINUTE
  ";

  $ret = $ZDal->z_query($sql);
  // echo "ret: {$ret}";
  $arr = $ZDal->z_fetch_assoc();
  $guid = getGUID();
  if ($arr["code"] == $code) {
    $guid_server = $arr["guid"];
    $sql = "
      INSERT INTO users (
        server, client, code, created
      )
      VALUES (
        '{$guid_server}', '{$guid}', '{$code}', UTC_TIMESTAMP()
      )
    ";

    $ZDal->z_query($sql);
    $z_insert_id = $ZDal->z_insert_id();
    if (is_numeric($z_insert_id)) {
      require_once "model/class.crypto.php";
      $Encryptor = new Encryptor($guid);
      //ZCrypto::init($guid);
      $user_id_encrypted = $Encryptor->encrypt($z_insert_id);
      // Set cookie for future usage
      setcookie("suranadira-user", $user_id_encrypted, time() + (10 * 365 * 86400), "/"); // 86400 = 1 day
      setcookie("pairing-guid", $guid, time() + (10 * 365 * 86400), "/"); // 86400 = 1 day

      $user_id_decrypted = $Encryptor->decrypt($user_id_encrypted);

      // echo "$user_id_encrypted / $user_id_decrypted";

      // Delete the used code from DB
      $sql = "
        DELETE FROM codes
        WHERE code = '{$code}'
      ";
      $ZDal->z_query($sql);

    }

    // Collect garbage
    $sql = "
      DELETE FROM codes
      WHERE created < NOW() - INTERVAL {$pairing_code_timeout} MINUTE
    ";
    $ZDal->z_query($sql);

  }

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta http-equiv="cache-control" content="max-age=0" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
		<meta http-equiv="pragma" content="no-cache" />
	<title>Suranadira Runtime Controller</title>
	<link href="gfx/rc.ico" rel="shortcut icon" type="image/x-icon" />
	<link href="css/normalize.css" rel="stylesheet" />
	<link href="css/main.css" rel="stylesheet" />
	<link href="css/pair.css" rel="stylesheet" />
</head>
<body class="" style="">
	<table class="screen" style="">
		<tr>
			<td align="center">
        <?php
        if ($isDevicePaired) {
          echo "<div class=\"status\">Device already paired.</div>";
        } elseif (!is_null($z_insert_id)) {
          if (!is_numeric($z_insert_id)) echo "Error pairing devices";
          else {
            echo "<div class=\"status\">Success</div>";
          }
        } else {
          if ($code != "") {
            echo "<div class=\"label\">Error pairing devices. Try again.</div>";
          }
          echo "<div class=\"label\">Enter the pairing code: </div>";
        ?>
        <form method="post">
          <div id="code">
            <input id="input-code" type="number" name="code"/>
          </div>
        </form>
      <?php } ?>
			</td>
		</tr>
	</table>
</body>
</html>
