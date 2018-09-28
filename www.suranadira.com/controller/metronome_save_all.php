<?php
// https://dev.suranadira.com/controller/metronome_save_all.php
$start = 0;
for ($n = 1; $n <= 63; $n++) {
  if ($n < 62) $length = 162;
  else if ($n == 62) $length = 180;
  else if ($n == 63) $length = 178;
  // data = {"user": user, "id": n, "start": start, "length": length};
  $_REQUEST["id"] = $n;
  $_REQUEST["start"] = $start;
  $_REQUEST["length"] = $length;
  // request("metronome-save", "metronome_save.php", data);
  include "metronome_save.php";

  // console.log(data);
  $start += $length;
}
echo json_encode(["metronome-saved", 1]);
?>
