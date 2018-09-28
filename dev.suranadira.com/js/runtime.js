var sura, properties,
courses = ["Introduction", "Syllables", "Phases", "Philosophy"];

$( document ).ready(function() {
  // activateSharedWorker();
  sura = new Suranadira({"classEnabled": false});
  properties = sura.getProperties();
  createControls();
  loadConfiguration();
  loadEvents();
});

function openLastCategory() {
  var lastCategory = getCookie("last-category");
  if (lastCategory != null) {
    $('#categories').val(lastCategory);
    $('#categories').trigger('change');
  }
}

function createControls() {
  var table = `
    <table class="properties">
      <tr class="titlebar">
        <td colspan="2">
          <span class="param title">
            <strong>Properties<span id="changed" class="hidden"><sup>*</sup></span></strong>
          </span>
          <span class="value titlebar-buttons">
            <span>
              <input type="button" id="cmd_ok" class="button titlebar-button" name="cmd_ok" value="Apply">
            </span>
            <span>
              <input type="button" id="cmd_reset" class="button titlebar-button" name="cmd_reset" value="Reset">
            </span>
          </span>
        </td>
      </tr>
      <tr class="categories-selector">
        <td colspan="2">
          <select id="categories">
            <option value="none" selected disabled>(Please select)</option>
          </select>
        </td>
      </tr>
    </table>
  `;
  $("#controlsContainer").append(table);
  var categories =
    {
      "Lessons": {
        "Introduction": ["number", "array", {
          "none": -1,
          "Syllables": 0,
          "Voices": 3,
          "Characters": 2,
          "Score": 1
        }],
        "Syllables": ["number", "array", {
          "none": -1,
          "syllableTypes": 0,
          "syllableRotation": 1,
          "syllableTruthGrid": 2
        }],
        "Phases": ["number", "array", {
          "none": -1,
          "elements": 0,
          "radicals": 1,
          "roots": 2,
          "words": 3
        }],
        "Philosophy": ["number", "array", {
          "none": -1,
          "noumena": 0,
          "phenomena": 1
        }]
      },

      "EnableDisableCommands": {
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
        }],
        "scoreEnabled": ["boolean", "array", {
          "False": false,
          "True": true
        }]
      },

      "DiverseCommands": {
        "priority": ["number", "type", "priorities"],
        "metronomeEnabled": ["boolean", "array", {
          "False": false,
          "True": true
        }]
      },

      "BehaviourCommands": {
        "unit": ["number", "array", {
          "Default": 40,
          "Small": 30,
          "Large": 65 // 60 // 63 // 67 // 60 // 65
        }],
        "endLevel": ["number", "array", {
          "One Group": 3,
          "Two Groups": 7,
          "Three Groups (Time 24h)": 11,
          "Four Groups": 15,
          "Five Groups (Default)": 19
        }],
        "startExcerptCharacters": ["number", "array", {
          "firstGroup": 0,
          "secondGroup": 4,
          "thirdGroup": 8
        }],
        "endExcerptCharacters": ["number", "array", {
          "firstGroup": 3,
          "secondGroup": 7,
          "thirdGroup": 11,
          "fourthGroup": 15,
          "fifthGroup": 19
        }],
        "startExcerptVoices": ["number", "array", {
          "firstGroup": 0,
          "secondGroup": 4,
          "thirdGroup": 8
        }],
        "endExcerptVoices": ["number", "array", {
          "firstGroup": 3,
          "secondGroup": 7,
          "thirdGroup": 11,
          "fourthGroup": 15,
          "fifthGroup": 19
        }]
      },

      "AppearanceCommands": {
        "colors": ["sarray", "array", {
          // "Default": ["steelblue", "MediumSeaGreen", "maroon", "gold", "BlueViolet", "DarkSlateGray"],
          "Default": ["#4682B4", "#3CB371", "#800000", "#FFD700", "#8A2BE2", "#2F4F4F"],
          "HighContrast": ["#212F3C", "#3CB371", "#800000", "#FFD700", "#8A2BE2", "#2F4F4F"]
        }]
      },

      "ColorCodingCommands": {
        "syllablesColorCodingMode": ["number", "type", "syllablesColorCodingModes"],
        "charactersColorCodingMode": ["number", "type", "charactersColorCodingModes", {
          "someElements": "markElements",
          "someLevels": "markLevels",
          "someComponentCycles": "markLevels",
          "allPhases": "phaseMode"
        }],
        "phaseMode": ["number", "type", "phases"],
        "markElements": ["array", "array", {
          "0": "[0]",
          "H": "[1]",
          "A": "[2]",
          "Z": "[3]",
          "V": "[4]",
          "I": "[5]",
          "A + V": "[2, 4]",
          "0 + H + I": "[0, 1, 5]"
        }],
        "markLevels": ["array", "array", {
          "None": "[]",
          "First": "[1]",
          "Second": "[2]",
          "Third": "[3]",
          "Fourth": "[4]",
          "First + Second": "[1, 2]",
          "Second + Third": "[2, 3]",
          "Third + Fourth": "[3, 4]"
        }],
        "voicesColorCodingMode": ["number", "type", "voicesColorCodingModes"]
      }

    };
  //var categories = JSON.parse(commands);
  // console.log(categories);

  /**
   * Populate properties table
   * @param  {[type]} category [description]
   * @param  {[type]} commands [description]
   */
  $.each(categories, function(category, commands) {
    addCategory(category);
    $.each(commands, function(param, values) {
      // console.log(param, values);
      var param_datatype = values[0];
      var values_datatype = values[1];
      var dependencies = "";
      if (typeof values[3] != "undefined") {
        // console.log(values[3]);
        dependencies = JSON.stringify(values[3]);
      }
      switch (values_datatype) {
        case "type":
          addCommand(param, sura[values[2]], param_datatype, category, dependencies);
          break;
        case "array":
          // console.log(values[1]);
          addCommand(param, values[2], param_datatype, category, dependencies);
          break;
        default:
      }
    });
  });
}

function addCategory(category) {
  $("#categories").append("<option value=\"" + category + "\">" + category + "</option>");
}

function addCommand(param, values, datatype, category, dependencies) {
  // console.log("===============");
  // console.log("Param: " + param);
  var select = "<select class=\"command\" id=\"" + param + "\" datatype=\"" + datatype + "\" dependencies='" + dependencies + "'>";
  var n = 0;
  $.each(values, function(key, value) {
    select += "<option value=\"" + value + "\" key=\"" + key + "\">";
    // console.log(key, value);
    select += n + " - " + key;
    select += "</option>";
    n++;
  });
  select += "</select>";
  $("#controlsContainer table").append("<tr class=\"categories " + category + " hidden\"><td class=\"param\" title=\"" + param + "\">" + param + "</td><td class=\"value\">" + select + "</td></tr>");
}

function loadConfiguration() {
  var data = {
    user: user
  };
  $.post("controller/configuration_retrieve.php", data, function(data) {
    // console.log(data);
    if (data.length < 2) return;
    data = JSON.parse(data);
    // console.log(data);
    data = data[1];
    var propParam, propValue;
    // var command, commands = data.split(";");
    var commands = JSON.parse(data);
    $.each(commands, function(id, command) {
      // console.log(id, command_string);
      /// command = command_string.split("_");
      propParam = command[0];
      propValue = command[1];
      $("#" + propParam).val(propValue);
    });
    markChanged(false);
    openLastCategory();
  });
}

function markChanged(status) {
  if (typeof status == "undefined") status = true;
  if (status) {
    $("#changed").removeClass("hidden");
  } else {
    $("#changed").addClass("hidden");
  }
}

function resetCommandHints() {
  $(".param").css("text-decoration", "none");
}

function setCommandHint(command) {
  $(".param[title=\"" + command + "\"]").css("text-decoration", "underline");
}

function loadEvents() {
  $("#categories").on("change", function() {
    var category = $("#categories option:selected").val();
    $(".categories").addClass("hidden");
    $("." + category).removeClass("hidden");
    // console.log(category);
    setCookie("last-category", category, 7); // cache last category for a week
  });

  $(".command").on("change", function() {
    var dependencies = $(this).attr("dependencies");
    var this_param = $(this).attr("id");
    var this_id = $(this).find(":selected").attr("key");
    var this_value = $(this).find(":selected").attr("value");
    setDependencies(this_param, this_value);
    resetCommandHints();
    if (dependencies != "") {
      dependencies = JSON.parse(dependencies);
      $.each(dependencies, function(option, select) {
        if (this_id == option) {
          // console.log(this_id, option, select);
          // $(".param[title=\"" + select + "\"]").css("text-decoration", "underline");
          setCommandHint(select);
        }
      });
    }
    // console.log(dependencies);
    markChanged();
  });

  function setDependencies(param, value) {
    // console.log(param, value);
    if (!isCourse(param)) return;
    applyDefaultSettings();
    resetUnused(param);
    if (param == "Introduction") {

      if (value == "0") { // Syllables
        $("#priority option[key^='voices']").prop('selected', true);
        $("#syllablesEnabled option[key='True']").prop('selected', true);
        $("#syllablesColorCodingMode option[key^='none']").prop('selected', true);
      }
      else if (value == "1") { // Score
        $("#priority option[key^='voices']").prop('selected', true);
        $("#unit option[key='Large']").prop('selected', true);
        $("#endLevel option[key^='Three']").prop('selected', true);
        $("#scoreEnabled option[key='True']").prop('selected', true);
        $("#circlesEnabled option[key='True']").prop('selected', true);
      }
      else if (value == "2") { // Characters
        $("#priority option[key^='characters']").prop('selected', true);
        $("#charactersEnabled option[key='True']").prop('selected', true);
        $("#charactersColorCodingMode option[key^='none']").prop('selected', true);
      }
      else if (value == "3") { // Voices
        $("#priority option[key^='voices']").prop('selected', true);
        $("#voicesEnabled option[key='True']").prop('selected', true);
        $("#circlesEnabled option[key='True']").prop('selected', true);
        $("#voicesColorCodingMode option[key^='none']").prop('selected', true);
      }
    }

    else if (param == "Syllables") {

      // Section specific commands
      $("#priority option[key^='voices']").prop('selected', true);

      if (value == "0") { // syllableTypes
        $("#syllablesEnabled option[key='True']").prop('selected', true);
        $("#syllablesColorCodingMode option[key^='allSyllables']").prop('selected', true);
      }
      else if (value == "1") { // syllableRotation
        $("#syllablesEnabled option[key='True']").prop('selected', true);
        $("#circlesEnabled option[key='True']").prop('selected', true);
        $("#syllablesColorCodingMode option[key^='none']").prop('selected', true);
      }
      else if (value == "2") { // syllableTruthGrid
        $("#truthGridEnabled option[key='True']").prop('selected', true);
        $("#syllablesEnabled option[key='True']").prop('selected', true);
        $("#syllablesColorCodingMode option[key^='none']").prop('selected', true);
      }
    }

    else if (param == "Phases") {

      // Section specific commands
      $("#charactersEnabled option[key='True']").prop('selected', true);
      $("#charactersColorCodingMode option[key^='allPhases']").prop('selected', true);
      $("#colors option[key^='HighContrast']").prop('selected', true);
      $("#priority option[key^='characters']").prop('selected', true);

      if (value == "0") {
        $("#phaseMode option[key^='elements']").prop('selected', true);
      }
      else if (value == "1") {
        $("#phaseMode option[key^='radicals']").prop('selected', true);
      }
      else if (value == "2") {
        $("#phaseMode option[key^='roots']").prop('selected', true);
      }
      else if (value == "3") {
        $("#phaseMode option[key^='words']").prop('selected', true);
      }
    }

    else if (param == "Philosophy") {

      // Section specific commands
      $("#charactersEnabled option[key='True']").prop('selected', true);
      $("#voicesEnabled option[key='True']").prop('selected', true);
      $("#circlesEnabled option[key='True']").prop('selected', true);

      if (value == "0") { // noumena
        $("#priority option[key^='characters']").prop('selected', true);
      }
      else if (value == "1") { // phenomena
        $("#priority option[key^='voices']").prop('selected', true);
      }
    }

  }

  function isCourse(course) {
    return $.inArray(course, courses) > (-1);
  }

  function resetUnused(used) {
    $.each(courses, function(index, course) {
      if (used != course) $("#" + course + " option[key^='none']").prop('selected', true);
    });
  }

  function applyDefaultSettings() {

    // EnableDisableCommands
    $("#truthGridEnabled option[key='True']").prop('selected', false);
    $("#syllablesEnabled option[key='True']").prop('selected', false);
    $("#voicesEnabled option[key='True']").prop('selected', false);
    $("#circlesEnabled option[key='True']").prop('selected', false);
    $("#charactersEnabled option[key='True']").prop('selected', false);
    $("#scoreEnabled option[key='True']").prop('selected', false);

    // DiverseCommands
    $("#priority option[key^='characters']").prop('selected', true);
    $("#metronomeEnabled option[key='False']").prop('selected', true);

    // BehaviourCommands
    $("#unit option[key='Default']").prop('selected', true);
    $("#endLevel option[key^='Four']").prop('selected', true);
    $("#startExcerptCharacters option[key^='first']").prop('selected', true);
    $("#endExcerptCharacters option[key^='fifth']").prop('selected', true);
    $("#startExcerptVoices option[key^='first']").prop('selected', true);
    $("#endExcerptVoices option[key^='fifth']").prop('selected', true);

    // AppearanceCommands
    $("#colors option[key^='Default']").prop('selected', true);

    // ColorCodingCommands
    $("#syllablesColorCodingMode option[key^='none']").prop('selected', true);
    $("#charactersColorCodingMode option[key^='none']").prop('selected', true);
    $("#phasegMode option[key^='none']").prop('selected', true);
    $("#markElements option[key^='0']").prop('selected', true);
    $("#markLevels option[key^='none']").prop('selected', true);
    $("#voicesColorCodingMode option[key^='none']").prop('selected', true);
  }

  $("#cmd_reset").on("click", function() {
    loadConfiguration();
    resetCommandHints();
  });

  $("#cmd_ok").on("click", function() {
    var propParam, propValue_string, propValue, propType, commands = [], command = [];
    $.each($(".command"), function(id, select) {
      // console.log(id, select);
      propParam = select.id;
      propValue_string = $("#" + propParam + " option:selected").val();
      propValue = propValue_string;
      propType = $("#" + propParam).attr("datatype");
      if (propType === "boolean") propValue = (propValue === "true");
      else if (propType == "number") propValue = parseInt(propValue);
      command = [propParam, propValue_string, propType];
      commands.push(command);
    });
    command = JSON.stringify(commands);
    command = { user: user, command: command };
    $.post("controller/configuration_save.php", command, function(data) {
      // console.log(data);
      markChanged(false);
    });
  });

}
