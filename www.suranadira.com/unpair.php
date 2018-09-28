<?php
$isDeviceUnpaired = false;
if (isset($_POST["unpair"])) {
  setcookie("suranadira-user", "", time() - 3600); // delete cookie
  setcookie("pairing-guid", "", time() - 3600); // delete cookie
  setcookie("pairing-code", "", time() - 3600); // delete cookie
  $isDeviceUnpaired = true;
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
        <?php if (!$isDeviceUnpaired) { ?>
          <?php echo "<div class=\"label\">Do you really want to unpair this device?</div>"; ?>
          <form method="post">
            <input id="button-unpair" type="submit" name="unpair" value="Unpair"/>
          </form>
        <?php } else { ?>
          <?php echo "<div class=\"status\">Device unpaired successfully.</div>"; ?>
        <?php } ?>
			</td>
		</tr>
	</table>
</body>
</html>
