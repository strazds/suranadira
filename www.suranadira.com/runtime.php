<?php
$guid = isset($_COOKIE["pairing-guid"]) ? $_COOKIE["pairing-guid"] : null;
$user_id = 1;
if (!is_null($guid)) {
	require_once "model/class.crypto.php";
	$Encryptor = new Encryptor($guid);
	$user_id = $Encryptor->decrypt($_COOKIE["suranadira-user"]);
	if (!is_numeric($user_id)) $user_id = 1; // default user
	// echo "User ID: {$user_id}";
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
	<link href="css/runtime.css" rel="stylesheet" />
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-124418866-1"></script>
	<script src="js/gtag.js"></script>
</head>
<body class="" style="">
	<table class="screen" style="">
		<tr>
			<td align="center">
				<div id="controlsContainer"></div>
				<div>User ID: <?php echo $user_id; ?></div>
			</td>
		</tr>
	</table>
	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="plugins/big.js/big.min.js"></script>
	<script src="js/cookie.js"></script>
	<script src="model/class.suranadira.js"></script>
	<script>var user = <?php echo $user_id; ?></script>
	<script src="js/runtime.js?v=1.0.0.<?php echo time(); ?>"></script>
</body>
</html>
