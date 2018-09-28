<?php
// no direct access
defined( '_ZEXEC' ) or die( 'Access restricted' );
if(!defined('_ZCONFIG')) define('_ZCONFIG', 1);
define('_CONFIG_CONTEXT', 'live');

switch (_CONFIG_CONTEXT) {
	default: // case 'dev':
		/**
		* Staging version settings
		*/
		class ZConfig_Extends {
			static $context 				= _CONFIG_CONTEXT;

			/**
			* DB settings
			*/
			static $db 									= "sura";
			static $dbtype 							= "mysql";
			static $host 								= "localhost";
			static $dbprefix 						= "";
			static $db_connection_id 		= null; // runtime param
			static $is_db_selected 			= false; // runtime param
			static $user 								= "u201807310857";
			static $password 						= "pmGdzy_038Hg7";

			/**
			* Path settings
			*/
			static $dir_cache 					= "var/cache/";
			static $dir_cache_scores 		= "var/cache/scores/";
			static $dir_fonts 					= "view/fonts/";

			/**
			* Misc settings
			*/
			static $pairing_code_timeout 		= 15; // 15 minutes

		}
		break;
}

class ZConfig extends ZConfig_Extends {
													// if set to FALSE, some css might not work properly
	/**
	* Version
	*/
	static $version_major 			= "0";
	static $version_minor 			= "0";
	static $version_build 			= "1";		// increase when synch with Live

}

?>
