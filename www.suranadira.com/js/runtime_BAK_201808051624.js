$( document ).ready(function() {
  var properties = [];
  var sura = new Suranadira({"classEnabled": false});
  createControls(sura);
});

function createControls(sura) {
  $( "table.commands tr" ).each(function( index ) {
    console.log( index + ": " + $( this ).text() );
  });
  // var controlsList = {
  //   "priority": 4,
  //   "metronomeEnabled": "bool", "voicesEnabled": "bool", "syllablesEnabled": "bool", "circlesEnabled": "bool", "truthGridEnabled": "bool", "charactersEnabled": "bool",
  //   "phaseMode": 5, "voicesColorCodingMode": 3, "charactersColorCodingMode": 7
  // };
  // var propCaption, propParam, propValue, propType;
  // properties = sura.getProperties();
  // // console.log(properties);
  // $(".command").off("click");
  // $( "#controlsContainer" ).html("");
  // for (var k in controlsList) {
  //   //console.log(k + "=" + controlsList[k]);
  //   // console.log(k + "=" + properties[k]);
  //   // console.log(properties[controlsList[k]]);
  //   propParam = k; // controlsList[k];
  //   // propType = jQuery.type(properties[controlsList[k]]);
  //   propType = jQuery.type(properties[k]);
  //   // propValue = properties[controlsList[k]];
  //   propValue = properties[k];
  //   // console.log("TYPE: " + propType);
  //   if (propType === "boolean") propValue = propValue ? "false" : "true";
  //   else if (propType === "number") {
  //     // console.log("NUMBER");
  //     propValue = parseInt(propValue);
  //     propValue += 1;
  //     propValue %= controlsList[k];
  //   }
  //   propCaption = propParam + " = " + propValue;
  //   $( "#controlsContainer" ).append( "<div><input type=\"button\" class=\"command\" prop-param=\"" + propParam + "\" prop-value=\"" + propValue + "\" prop-type=\"" + propType + "\" id=\"" + propParam + "_" + propValue + "_" + propType + "\" value=\"" + propCaption + "\"></div>" );
  }

  $(".command").on("click", function() {
    var data = { command: this.id };
    $.post("command_add.php", data, function(data) {
      // console.log(data);
    });
    var propParam= $(this).attr("prop-param");
    var propValue = $(this).attr("prop-value");
    // console.log(propValue);
    var propType = $(this).attr("prop-type");
    if (propType === "boolean") propValue = (propValue === "true");
    else if (propType == "number") propValue = parseInt(propValue);
    // console.log(propValue);
    // console.log("TYPE2: " + propType);
    sura.updateProperty(propParam, propValue);
    createControls(sura);
  });
}
