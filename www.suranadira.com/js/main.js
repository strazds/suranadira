$( document ).ready(function() {
	var debug = isDebugMode(),
	user = getUser(),
	pentade = getPentade(),
	view = getView();
	// console.log("view: " + view);
	// Override user according to the view
	if (view == "noumena") user = 39;
	else if (view == "phenomena") user = 40;
	else if (view == "experience") user = 1;
	// console.log("view: " + view);

	// console.log(pentade);
	if (debug) {
		$("body").css("background", "green");
		$("#debug").removeClass("hidden");
	}
	$.jCanvas.defaults.fromCenter = true;
	var properties = [];
	properties["debug"] = debug;
	properties["user"] = user;
	properties["overridePentade"] = (pentade == null ? null : new Big(pentade));
	properties["endLevel"] = 19;
	// if (view != null) properties["isRemoteMode"] = false;
	// setPropertiesByView(view);
	var sura = new Suranadira(properties);
	// $("body").fadeIn(2500, function() {
	// });
	$("body").show();
	$("#reload").click(function(e) {
		properties = sura.getProperties();
		// sura.updateProperty("endLevel", 11);
		// console.log(properties);
		sura.reset();
		sura = new Suranadira(properties);
	});
	enableFullscreen("body");
});

function isDebugMode() {
	return urlParamExists("d");
}

function getUser() {
	return getUrlParam("u");
}

function getPentade() {
	return getUrlParam("p");
}

function getView() {
	return getUrlParam("view");
}

function urlParamExists(param) {
	// var query = window.location.search.substring(1);
	// var qs = parse_query_string(query);
	// return (typeof qs[param] !== "undefined");
	return getUrlParam(param) != null;
}

function getUrlParam(param) {
	var query = window.location.search.substring(1);
	var qs = parse_query_string(query);
	return (typeof qs[param] === "undefined" ? null : qs[param]);
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

// var isFullscreen = false;
function enableFullscreen(element) {
	if (window.fullScreenApi.supportsFullScreen) {
		var fsElement = document.getElementById(element);

		// handle body double click
		$( "body" ).dblclick(function() {
			window.fullScreenApi.requestFullScreen(fsElement);
			// else window.fullScreenApi.exitFullscreen(fsElement);
			// isFullscreen = !isFullscreen;
		});

		fsElement.addEventListener(fullScreenApi.fullScreenEventName, function() {
			if (fullScreenApi.isFullScreen()) {
				// 'Whoa, you went fullscreen';
			} else {
				// 'Back to normal';
			}
		}, true);

	} else {
		// 'SORRY: Your browser does not support FullScreen';
	}
}
