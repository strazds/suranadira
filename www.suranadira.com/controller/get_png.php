<?php
// Test: https://dev.suranadira.com/controller/get_png.php?part-last=63&part=1&page=1
define('_ZEXEC', '1');
defined('_ZCONFIG') or require "../config.php";
// ob_clean();
$debug = false;
if ($debug) {
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
}
ini_set('memory_limit', '-1');
// $file = $_GET["file"];
$dir_rel = "../";
$section = 5; // how many pages should be loaded together
$last_part_id = $_GET["part-last"];
$part_id = $_GET["part"];
$part_id_temp = $part_id;
$page_id = $_GET["page"];

$scores_path = "{$dir_rel}lib/png/suranadira12/";
// $scores_cache_path = "{$dir_rel}tmp/";
$cache_path = $dir_rel . ZConfig::$dir_cache;
$scores_cache_path = $dir_rel . ZConfig::$dir_cache_scores;
$cache_file = "{$scores_cache_path}suranadira12_{$part_id}_{$page_id}.png";

/**
 * Try to get from cache first
 */
if (file_exists($cache_file)) {
  $dest = imagecreatefrompng($cache_file);
  if ($dest !== false) {
    outputImage($dest);
  }
}

/**
 * Generate and save to cache
 */
else {
  $max_page = 9; // default
  if ($part_id == 62 && $page_id > floor($section / 2)) $max_page = 10;
  elseif ($part_id == 63) $max_page = 10;
  elseif ($part_id == 1 && $page_id <= floor($section / 2)) $max_page = 10;

  $pageIDs = getPageIDs($page_id, $max_page, $section);
  $prev_id = -10000; // 0
  $file = array();
  $im = array();
  if ($page_id < ceil($section / 2)) {
    $part_id--;
    // if ($part_id < 1) $part_id = 3; // todo: adjust this!
  }
  foreach($pageIDs as $key => $id) {
    if ($id < $prev_id) {
      $part_id++;
    }
    if ($part_id > $last_part_id) {
      $path = "{$scores_path}sura_time" . 1 . "_";
    } elseif ($part_id > 0) {
      $path = "{$scores_path}sura_time" . $part_id . "_";
    } else {
      $path = "{$scores_path}sura_time" . $last_part_id . "_";
    }
    $file[$key] = "{$path}{$id}.png";
    $im[$key] = imagecreatefrompng($file[$key]);
    if ($debug) echo $im[$key];
    $prev_id = $id;
  }
  $size1 = getimagesize($file[0]);
  $width1 = $size1[0];
  $height1 = $size1[1];
  if ($debug) echo "$width1; $height1; <br>";

  foreach($im as $key => $this_im) {
    formatImage($this_im, $width1, $height1);
  }

  // $trim_top = 100;
  // $trim_bottom = 160;
  $trim_top = 99; // 97;
  $trim_bottom = 161; // 163;

  $dest = imagecreatetruecolor(5 * $width1, $height1 - $trim_top - $trim_bottom);
  if ($debug) echo "$dest; <br>";

  $dst_x = 0;
  $dst_y = 0;
  $src_x = 0;
  $src_y = $trim_top; // 0
  $src_w = $width1;
  $src_h = $height1;

  foreach($im as $key => $this_im) {
    $dst_x = $key * $width1;
    imagecopy($dest, $this_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h);
  }
  if ($debug) echo "$dest; <br>";

  $part_id = $part_id_temp;
  $prev_page_id = -10000;
  if ($page_id < ceil($section / 2)) {
    $part_id--;
  }
  if ($part_id < 1) $part_id = $last_part_id;
  for ($n = 0; $n < $section; $n++) {
    $this_page_id = $pageIDs[$n]; // $page_id - 2 + $n;
    if ($this_page_id < $prev_page_id) {
      $part_id++;
    }
    if ($part_id > $last_part_id) {
      $part_id = 1;
    }
    $text = "Armands  Strazds   ·   Suranadira  12   ·   Part  {$part_id}   ·   Page  {$this_page_id}";
    $dst_x = $width1 * $n;
    $dst_y = ($height1 - $trim_bottom - $trim_bottom) / 2;
    drawText($dest, $text, $dst_x, $dst_y);
    $prev_page_id = $this_page_id;
  }

  $ret = outputImage($dest, $cache_file);
  if ($ret != 1) {
    // Todo: $ret == 2 -> Error: failed to create the cache directory
  }

}


function formatImage(&$im, $width, $height) {
  $white = imagecolorallocate($im, 255, 255, 255);
  // Remove the header
  imagefilledrectangle($im, 0, 0, $width, 90, $white);

  // Remove the metronome track
  imagefilledrectangle($im, 0, 1500, $width, $height, $white); // imagerectangle
  imagefilledrectangle($im, 0, 1441, 94, 1500, $white);
  imagefilledrectangle($im, 94, 1435, 110, 1437, $white);
}

function getPageIDs($page_id, $max_page = 9, $section = 5) {
  $debug = false;
  $page_ids = array();
  for($n = 0; $n < $max_page; $n++) {
    $page_ids[] = $n + 1;
  }
  for($n = 0; $n < $max_page - ceil($section / 2); $n++) {
    array_push($page_ids, array_shift($page_ids));
  }
  if ($debug) echo implode(", ", $page_ids) . "<br>";
  for($n = 0; $n < $page_id; $n++) {
    array_push($page_ids, array_shift($page_ids));
  }
  if ($debug) echo implode(", ", $page_ids) . "<br>";
  $page_ids = array_slice($page_ids, 0, $section);
  if ($debug) echo implode(", ", $page_ids) . "<br>";
  return $page_ids;
}

function drawText($dest, $text, $x, $y) {
  global $dir_rel;
  $black = imagecolorallocate($dest, 0, 0, 0);
  // $fontfile = $dir_rel . ZConfig::$dir_fonts; // view/fonts/pala.ttf;
  $fontfile = $dir_rel . ZConfig::$dir_fonts . "pala.ttf"; // view/fonts/pala.ttf;
  // $fontfile =  "../view/fonts/pala.ttf"; // view/fonts/pala.ttf;
  $font_size = 21;
  $angle = 90;
  // putenv('GDFONTPATH=' . realpath('.'));
  // putenv('GDFONTPATH=' . realpath('./fonts'));
  $text_size = 0;
  $ret = imagettfbbox ($font_size, 0, $fontfile, $text);
  if ($ret !== false) {
    $text_size = $ret[2] - $ret[0];
  }
  imagettftext($dest, $font_size, $angle, $x, $y + $text_size / 2, $black, $fontfile, $text);
}

/**
 * Saves the scores to cache and outputs to the browser
 * @param  resource $dest     The image resource id
 * @param  string $save_to    The path and filename to cache the image to
 * @return boolean            1 - success, 2 - failed to create the cache directory
 */
function outputImage($dest, $save_to = null) {
  global $debug, $cache_path, $scores_cache_path;
  if (!$debug) header('Content-Type: image/png');
  if ($save_to != null) {
    if (!is_dir($cache_path)) {
      if (!mkdir($cache_path)) {
        return 2;
      }
    }
    if (!is_dir($scores_cache_path)) {
      if (!mkdir($scores_cache_path)) {
        return 3;
      }
    }
    $ret = imagepng($dest, $save_to);
  }
  imagepng($dest);
  // if (!$debug) echo "Image saved to {$save_to}: {$ret}";
  imagedestroy($dest);
  return 1;
}

?>
