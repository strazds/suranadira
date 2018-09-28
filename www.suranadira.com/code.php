<?php

function getGUID() {
  return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}

$isDevicePaired = false;
$isPairingCodeSet = false;

if (0) {
  setcookie("pairing-guid", "", time() - 3600); // delete cookie
  setcookie("pairing-code", "", time() - 3600); // delete cookie
}

if (isset($_COOKIE["suranadira-user"])) {
  $isDevicePaired = true;
}

if (isset($_COOKIE["pairing-code"])) {
  $isPairingCodeSet = true;
}

if (!$isDevicePaired && !$isPairingCodeSet) {

  $digits = 4;

  define('_ZEXEC', 1);
  require_once "config.php";
  // require_once "model/class.exception.php";
  require_once "model/class.dal.php";
  $ZDal = new ZDal();
  $guid = getGUID();

  for ($n = 0; $n < 10; $n++) {
    $code = mt_rand(pow(10, $digits - 1), pow(10, $digits) - 1);
    // $code = 5227;

    $sql = "
      INSERT INTO codes (
        guid, code
      )
      VALUES (
        '{$guid}', '{$code}'
      )
    ";

    $ZDal->z_query($sql);
    $z_insert_id = $ZDal->z_insert_id();
    if ($z_insert_id == "0") {
      setcookie("pairing-guid", $guid, time() + (ZConfig::$pairing_code_timeout * 60), "/");
      setcookie("pairing-code", $code, time() + (ZConfig::$pairing_code_timeout * 60), "/");
      break;
    }
    else $z_insert_id = "none";
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
	<title>Suranadira Code</title>
	<link href="gfx/rc.ico" rel="shortcut icon" type="image/x-icon" />
	<link href="css/normalize.css" rel="stylesheet" />
	<link href="css/main.css" rel="stylesheet" />
	<link href="css/code.css" rel="stylesheet" />
</head>
<body class="" style="">
	<table class="screen" style="">
		<tr>
			<td align="center">
        <?php
        if ($isDevicePaired) {
          echo "<div class=\"status\">Device already paired.</div>";
        } elseif ($isPairingCodeSet) {
          echo "<div id=\"code\">" . $_COOKIE["pairing-code"] . "</div>";
        } else {
          if ($z_insert_id == "0") echo "{$code}";
          else echo "<div class=\"status\">Error generating code.</div>";
          // echo "{$code} ({$z_insert_id})";
        }
        ?>
			</td>
		</tr>
	</table>
</body>
</html>
