<?php

// https://dev.suranadira.com/controller/metronome_save.php?file=test0201.png&page=1
// https://dev.suranadira.com/controller/metronome_save.php?id=5&start=648&length=162

$debug = true;
$msg_debug = array();

define('_ZEXEC', 1);
require_once "../config.php";
require_once "../model/class.dal.php";
require_once "metronome_functions.php";

$ZDal = new ZDal();

// $file = $_GET["file"];
// if ($debug) echo "image_file: " . $image_file . "<br>";

$composition_id = $_REQUEST["id"];
$composition_start = $_REQUEST["start"];
$composition_length = $_REQUEST["length"];

$properties = array();
$properties["composition_id"] = $composition_id; // 4; // always change (last: 3)
$properties["title"] = "Sura Time " . $properties["composition_id"];
$properties["start"] = $composition_start; // "0"; // always change (last: 324)
$properties["length"] = $composition_length; // "162"; // sometimes change
$properties["top"] = "0";
$properties["voices"] = "12";
$properties["groups"] = "3";
$properties["mode"] = "0";
$properties["basetone"] = "53";
$properties["cast"] = "Vn, Vn, Va";
$properties["pages"] = $composition_id < 62 ? 9 : 10;
// $properties["path"] = "../svg/sura_time" . $properties["composition_id"] . "_";
$properties["path"] = "../lib/png/suranadira12/sura_time" . $properties["composition_id"] . "_";
$properties["extension"] = "png";

$example_page = $properties["path"] . "1." . $properties["extension"];



$ret = compositionSave($properties, $example_page);
$composition_id = $ret["composition_id"];
$page_width = $ret["page_width"];
pagesSave($composition_id, $page_width);

?>
