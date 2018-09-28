<?php
// if (1 || !function_exists('compositionSave')) {
  function compositionSave($properties, $example_page) {
    global $debug, $msg_debug, $ZDal;

    $size = getimagesize($example_page);
    $width = $size[0];
    $height = $size[1];
    if ($debug) $msg_debug[] = "width: {$width}" . "<br>";
    if ($debug) $msg_debug[] = "height: {$height}" . "<br>";

    $title = $properties["title"];
    $start = $properties["start"];
    $length = $properties["length"];
    $top = $properties["top"];
    $voices = $properties["voices"];
    $groups = $properties["groups"];
    $mode = $properties["mode"];
    $basetone = $properties["basetone"];
    $cast = $properties["cast"];

    $sql = "
      INSERT INTO compositions (
        `title`, `start`, `length`, `top`, `voices`, `groups`, `mode`, `basetone`, `cast`, `width`, `height`
      )
      VALUES (
        '{$title}', '{$start}', '{$length}', '{$top}', '{$voices}', '{$groups}', '{$mode}', '{$basetone}', '{$cast}', '{$width}', '{$height}'
      )
      ON DUPLICATE KEY UPDATE
        mode = '{$mode}', basetone = '{$basetone}', cast = '{$cast}', width = '{$width}', height = '{$height}', created = UTC_TIMESTAMP()
    ";
    $ZDal->z_query($sql);
    // $z_affected_rows = $ZDal->z_affected_rows();
    // if ($debug) echo "z_affected_rows: {$z_affected_rows}" . "<br>";
    // die();
    $z_insert_id = $ZDal->z_insert_id();
    if ($debug) $msg_debug[] = "z_insert_id: {$z_insert_id}" . "<br>";
    return array("composition_id" => $z_insert_id, "page_width" => $width);
  }

  function pagesSave($composition_id, $page_width) {
    global $debug, $msg_debug, $properties;
    for ($n = 1; $n <= $properties["pages"]; $n++) {
      // $image_file = "../svg/s1_{$n}." . $properties["extension"];
      $image_file = $properties["path"] . "{$n}." . $properties["extension"];
      $page_id = $n;
      if ($debug) $msg_debug[] = "image_file: {$image_file}, page_id: {$page_id} " . "<br>";
      pageSave($composition_id, $image_file, $page_id, $page_width);
    }
  }

  function pageSave($composition_id, $image_file, $page_id, $page_width) {
    global $debug, $msg_debug, $ZDal;

    if (!file_exists($image_file)) {
      $msg_debug[] = "File not found: '{$image_file}'. <br>";
      return false;
    }

    $im = imagecreatefrompng($image_file);
    // $size = getimagesize($image_file);
    // $width = $size[0];
    // $height = $size[1];
    // imagefilter($im, IMG_FILTER_NEGATE);
    // imagefilter($im, IMG_FILTER_BRIGHTNESS, -64);
    // // imagefilter($im, IMG_FILTER_SMOOTH, 3);
    $white = imagecolorallocate($im, 255, 255, 255);
    $black = imagecolorallocate($im, 0, 0, 0);
    $color = imagecolorallocate($im, 255, 0, 0);
    $x1 = 120;
    $x2 = 1200;
    $y = 1555;
    // imageline($im, $x1, $y, $x2, $y, $color); // test line
    $ticks = array();
    $prev_x = 0;
    for ($x = $x1; $x < $x2; $x++) {
      $color2 = imagecolorat($im, $x, $y);
      if ($color2 == $black) {
        // imageline($im, $x - 2, 1555, $x - 2, 1565, $color); // mark found ticks
        $ticks[] = $x - $prev_x;
        $prev_x = $x;
        $x += 5; // for the case the note stem is more than 1px wide
      }
    }
    if (count($ticks) > 0) {
      $ticks[] = $page_width - $prev_x; // add the distance from the last tick to the page margin
      if ($debug) $msg_debug[] = "Page {$page_id} ticks: " . json_encode($ticks) . "<br>";
      $ticks = json_encode($ticks);
      // require_once "model/class.exception.php";
      if (0) {
        $sql = "
          SELECT composition_fid
          FROM pages
          WHERE composition_fid = 1
          AND page = '{$page_id}'
        ";
        $ZDal->z_query($sql);
        $arr = $ZDal->z_fetch_assoc();
        // if (!$arr) {
      }
      if (1) {
        $sql = "
          INSERT INTO pages (
            composition_fid, page, metronome
          )
          VALUES (
            '{$composition_id}', '{$page_id}', '{$ticks}'
          )
          ON DUPLICATE KEY UPDATE
            metronome = '{$ticks}', created = UTC_TIMESTAMP()
        ";

        $ZDal->z_query($sql);
        // if ($ZDal->z_affected_rows())
        if ($debug) {
          switch ($ZDal->z_affected_rows()) {
            case 1:
              $msg_debug[] = "Page successfully added. <br>";
              break;
            case 2:
              $msg_debug[] = "Page successfully updated. <br>";
              break;
            default:
              $msg_debug[] = "Error saving the page. <br>";
          }
        }
      }
    }

    // // Remove the header
    // imagefilledrectangle($im, 0, 0, $width, 90, $white);
    //
    // // Remove the metronome track
    // imagefilledrectangle($im, 0, 1500, $width, $height, $white); // imagerectangle
    // imagefilledrectangle($im, 0, 1441, 94, 1500, $white);
    // imagefilledrectangle($im, 94, 1435, 110, 1437, $white);

    // if (0 && !$debug) {
    if (!$debug) {
      header('Content-Type: image/png');
      imagepng($im);
      imagedestroy($im);
    } else {
      // echo json_encode(["metronome-saved", $msg_debug]);
      // echo json_encode(["metronome-saved", 1]);
    }
  }
// }

?>
