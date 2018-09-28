var sura, properties;
$( document ).ready(function() {
  sura = new Suranadira({"classEnabled": false});
  properties = sura.getProperties();
  createControls();
  loadConfiguration();
  loadEvents();
});

function createControls() {
  var table = `
    <table class="properties">
      <tr>
        <td></td>
        <td>
          <input type="button" id="cmd_ok" name="cmd_ok" value="OK">
        </td>
      </tr>
    </table>
  `;
  $("#controlsContainer").append(table);
  var commands = `
    {
      "priority": ["number", "type", "priorities"],
      "metronomeEnabled": ["boolean", "array", {
        "False": false,
        "True": true
      }],
      "truthGridEnabled": ["boolean", "array", {
        "False": false,
        "True": true
      }],
      "syllablesEnabled": ["boolean", "array", {
        "False": false,
        "True": true
      }],
      "voicesEnabled": ["boolean", "array", {
        "False": false,
        "True": true
      }],
      "circlesEnabled": ["boolean", "array", {
        "False": false,
        "True": true
      }],
      "charactersEnabled": ["boolean", "array", {
        "False": false,
        "True": true
      }]
    }
  `;
  commands = JSON.parse(commands);
  $.each(commands, function(param, values) {
    // console.log(param, values);
    var param_datatype = values[0];
    var values_datatype = values[1];
    switch (values_datatype) {
      case "type":
        addCommand(param, sura[values[2]], param_datatype);
        break;
      case "array":
        // console.log(values[1]);
        addCommand(param, values[2], param_datatype);
        break;
      default:
    }
  });
}

function addCommand(param, values, datatype) {
  console.log("===============");
  console.log("Param: " + param);
  var select = "<select class=\"command\" id=\"" + param + "\" datatype=\"" + datatype + "\">";
  var n = 0;
  $.each(values, function(key, value) {
    select += "<option value=\"" + value + "\">";
    console.log(key, value);
    select += n + " - " + key;
    select += "</option>";
    n++;
  });
  select += "</select>";
  $("#controlsContainer table").append("<tr><td class=\"param\">" + param + "</td><td class=\"value\">" + select + "</td></tr>");
}

function loadConfiguration() {
  var data = {
    user: 1
  };
  $.post("configuration_retrieve.php", data, function(data) {
    // console.log(data);
    var propParam, propValue;
    var command, commands = data.split(";");
    $.each(commands, function(id, command_string) {
      command = command_string.split("_");
      propParam = command[0];
      propValue = command[1];
      $("#" + propParam).val(propValue);
    });
  });
}

function loadEvents() {
  $("#cmd_ok").on("click", function() {
    var propParam, propValue_string, propValue, propType, commands = [], command;
    $.each($(".command"), function(id, select) {
      console.log(id, select);
      propParam = select.id;
      propValue_string = $("#" + propParam + " option:selected").val();
      propValue = propValue_string;
      propType = $("#" + propParam).attr("datatype");
      if (propType === "boolean") propValue = (propValue === "true");
      else if (propType == "number") propValue = parseInt(propValue);
      console.log(propParam + " = " + propValue);
      // sura.updateProperty(propParam, propValue);
      command = propParam + "_" + propValue_string + "_" + propType;
      commands.push(command);
    });
    command = commands.join(";");
    command = { command: command };
    $.post("command_add.php", command, function(data) {
      console.log(data);
    });
    $.post("configuration_save.php", command, function(data) {
      console.log(data);
    });
  });
}
