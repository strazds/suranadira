var prevConfiguration = null;

onmessage = function(e) {
  if (!e.isTrusted) return;
  // console.log(e);
  switch (e.data[0]) {
    case "retrieve-user":
      // console.log(e.data);
      retrieveUser(e.data[1], e.data[2], e.data[3]);
      break;
    case "retrieve-configuration":
      // console.log("retrieve-configuration for user " + e.data[1]);
      retrieveConfiguration(e.data[1]);
      break;
    case "retrieve-metronome":
      // console.log("retrieve-metronome");
      retrieveMetronome(e.data[1], e.data[2], e.data[3]);
      break;
    case "save-metronome":
      // console.log("retrieve-metronome");
      saveMetronome(e.data[1]);
      break;
    default: // Save current configuration
      // console.log(e);
      // saveConfiguration(e.data);
  }
};

// function addListener() {
//   // Show a connected message when the WebSocket is opened.
//   // console.log(socket);
//   socket.onopen = function(event) {
//     console.log('WebSocket is connected.');
//     // connection.send("AS");
//   };
// }

function retrieveUser(user, guid, code) {
  if (user != null) {
    postMessage(["user", user]); // paired user
    return;
  }

  // var guid = getCookie("pairing-guid");
  // var code = getCookie("pairing-code");
  if (guid == null) {
    user = 1; // default user
    postMessage(["user", user]);
    return;
  } else {
    var data = {"guid": guid, "code": code};
    // console.log(data);
    request("user", "../controller/user_retrieve.php", data);
  }
}

function retrieveConfiguration(user) {
  var data = {"user": user};
  request("configuration", "../controller/configuration_retrieve.php", data);
  // setInterval(function() {
  //   request("configuration", "../controller/configuration_retrieve.php", data);
  // }, 1000);
}

function retrieveMetronome(user, part, page) {
  var data = {"user": user, "title": "Sura Time " + part, "page": page};
  // console.log(data);
  request("metronome", "../controller/metronome_retrieve.php", data);
}

function saveMetronome(user) {
  var data = {"user": user};
  request("metronome-save", "../controller/metronome_save_all.php", data);
}

function onRequestSuccess(type, data) {
  switch (type) {
    case "user":
      // console.log(data);
      var user = data;
      postMessage(["user", user]);
      break;
    case "configuration":
      if (data != prevConfiguration) {
        if (data.length > 2) postMessage(["configuration", data]);
        else postMessage(["configuration", "empty"]);
        prevConfiguration = data;
      }
      break;
    case "metronome":
      // console.log(data);
      if (data != null && data.metronome.length > 2) postMessage(["metronome", data.metronome, data.page_width, data.page_width, data.page_height]);
      else postMessage(["metronome", "empty"]);
      break;
    case "metronome-saved":
      console.log(type, data);
      break;
    default:
      //
  }
}

function request(type, url, data) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // success
      // console.log("Response: ");
      // console.log(this.responseText);
      var responseText = JSON.parse(this.responseText);
      if (responseText.length) {
        var responseType = responseText[0];
        onRequestSuccess(responseType, responseText[1]);
      }
    }
  };
  data = Object.keys(data).map(key => key + '=' + data[key]).join('&');
  // xhttp.open("POST", "../configuration_retrieve.php?_=" + new Date().getTime(), false); // un/pw?
  xhttp.open("POST", url + "?_=" + new Date().getTime(), false); // un/pw?
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(data);
  // console.log("Data sent: " + data);
}
