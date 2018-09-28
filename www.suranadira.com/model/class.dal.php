<?php
// no direct access
defined( '_ZEXEC' ) or die( 'Access restricted' );

// defined( '_ZCONFIG' ) or require_once "../config.php";

// require_once "interface.dal.php";

/// require_once "class.dal_context.php";

// class ZDal extends ZDalContext implements ZDal_Interface {
class ZDal {

	private $stmt = null;

	/**
	 * Sets initial ZIME properties.
	 */
	function __construct() {
		try {
			$this->z_connect(array('host'=>ZConfig::$host . "", 'user'=>ZConfig::$user . "", 'password'=>ZConfig::$password . "", 'db'=>ZConfig::$db . ""));
		} catch (ZException $e) {
			if (ZConfig::$_debug) {
		    	echo $e;
			}
		}
	}

	function z_conn() {
		return ZConfig::$db_connection_id;
	}

	function z_connect($server=null) {
		if(!$server) return false;

		$conn = false; // init

		if(empty($server['port'])) {
			$port = 3306;
		} else {
			$port = $server['port'];
		}

		if(empty($server['user'])) $server['user'] = 'root';
		if(empty($server['password'])) $server['password'] = '';

		if(!empty($server['options'])) {
			$conn = mysql_connect($server['host'] . ':' . $port, $server['user'], $server['password'],true,$server['options']);
		} else {
			$conn = mysql_connect($server['host'] . ':' . $port, $server['user'], $server['password'],true);
		}
		if(!empty($server['db'])) {
			mysql_select_db($server['db']);
			mysql_set_charset('utf8', $conn);
			//$this->z_query("SET time_zone = 'Europe/Riga';", $conn);
		}
		if (!$conn) {
			if (ZConfig::$_debug) {
				throw new ZException('ERROR_DAL_' . mysql_errno());
			}
		}

		ZConfig::$db_connection_id = $conn;
		return $conn;
	}

	function z_query($sql='', $conn=null) {
		if($conn) {
			$this->stmt = mysql_query($sql, $conn);
		} else {
			$this->stmt = mysql_query($sql, $this->z_conn());
		}
		return $this->stmt;
	}

	function z_num_rows($stmt=null) {
		if(!$stmt) $stmt=$this->stmt;
		if ($stmt) {
			return mysql_num_rows($stmt);
		} else {
			return 0;
		}
	}

	function z_value($row, $field, $stmt=null) {
		if(!$stmt) $stmt=$this->stmt;
		if ($stmt) {
			return mysql_result($stmt, $row, $field);
		} else {
			return null;
		}
	}

	function z_insert_id($stmt=null) {
		if(!$stmt) $stmt=$this->stmt;
		if ($stmt) {
			if (mysql_affected_rows() > 0) {
				return mysql_insert_id();
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	function z_affected_rows($stmt=null) {
		if(!$stmt) $stmt=$this->stmt;
		if ($stmt) {
			return mysql_affected_rows();
		} else {
			return null;
		}
	}

	function z_fetch_assoc($stmt=null) {
		if(!$stmt) $stmt=$this->stmt;
		return mysql_fetch_assoc($stmt);
	}

	function z_fetch_array($stmt=null) {
		if(!$stmt) $stmt=$this->stmt;
		return mysql_fetch_array($stmt);
	}

	function z_errno($stmt = null) {
		if(!$stmt) return mysql_errno($this->z_conn());
		return mysql_errno($stmt);
	}

	function z_error($stmt = null) {
		if(!$stmt) return mysql_error($this->z_conn());
		return mysql_error($stmt);
	}

	function z_select_db($db, $conn=null) {
		if($conn) {
			$ret = mysql_select_db($db, $conn);
			mysql_set_charset('utf8', $conn);
			return $ret;
		}
		$ret = mysql_select_db($db,$this->z_conn());
		mysql_set_charset('utf8', $this->z_conn());
		return $ret;
	}

	function z_free_result($stmt = null) {
		if($stmt) return mysql_free_result($stmt);
		if($this->stmt) return mysql_free_result($this->stmt);
		return true;
	}

	function z_close($conn = null) {
		if($conn) return mysql_close($conn);
		if($this->z_conn()) return mysql_close($this->z_conn());
		return false;
	}

	function z_begin($conn = null) {
		if(!$conn) {
			return mysql_query('begin',$this->z_conn());
		} else {
			return mysql_query('begin',$conn);
		}
	}

	function z_autocommit($state = true, $conn = null) {
		if($state) $state = 'true'; else $state = 'false';
		if(!$conn) {
			return mysql_query("set autocommit=$state",$this->z_conn());
		} else {
			return mysql_query("set autocommit=$state",$conn);
		}
	}

	function z_commit($conn = null) {
		if($conn) {
			return mysql_query('commit', $conn);
		} else {
			return mysql_query('commit',$this->z_conn());
		}
	}

	function z_rollback($conn = null) {
		if($conn) {
			return mysql_query('rollback', $conn);
		} else {
			return mysql_query('rollback',$this->z_conn());
		}
	}

	function z_real_escape_string($string, $conn = null) {
		if($conn) {
			return mysql_real_escape_string($string, $conn);
		}
		return mysql_real_escape_string($string,$this->z_conn());

	}

}
?>
