var blocks = [];

var fields = [
  "preloadedPosition",
  "expectedPosition",
  "preloadedPentade",
  "bufferLocalPentade",
  "selectedPentade",
  "bufferLocalPosition",
  "timerPrecision",
  "countBufferReloaded",
  "bufferWidth",
  "runtimeCommand",
  "partCurrent",
  "pageCurrent",
  "beatCurrent",
  "loadScoreToBuffer",
  "loadScoreFromBuffer",
  "currentPosition",
  "startPositionDay",
  "test"
];

blocks["debug"] = `
<table>
  <tr>
    <td valign="top">
      <table class="debug">
        <tr>
          <td>Preloaded Position</td>
          <td><div id="preloadedPosition"></div></td>
        </tr>
        <tr>
          <td>Expected Position</td>
          <td><div id="expectedPosition"></div></td>
        </tr>
        <tr>
          <td>Preloaded Pentade</td>
          <td><div id="preloadedPentade"></div></td>
        </tr>
        <tr>
          <td>Buffer Local Pentade</td>
          <td><div id="bufferLocalPentade"></div></td>
        </tr>
        <tr>
          <td>Selected Pentade</td>
          <td><div id="selectedPentade"></div></td>
        </tr>
      </table>
    </td>
    <td valign="top">
      <table class="debug">
        <tr>
          <td>BufferLocalPosition</td>
          <td><div id="bufferLocalPosition"></div></td>
        </tr>
        <tr>
          <td>Timer Precision</td>
          <td><div id="timerPrecision"></div></td>
        </tr>
        <tr>
          <td>Count Buffer Reloaded</td>
          <td><div id="countBufferReloaded"></div></td>
        </tr>
        <tr>
          <td>Buffer Width</td>
          <td><div id="bufferWidth"></div></td>
        </tr>
        <tr>
          <td>Runtime Command</td>
          <td><div id="runtimeCommand"></div></td>
        </tr>
      </table>
    </td>
    <td valign="top">
      <table class="debug">
        <tr>
          <td>partCurrent</td>
          <td><div id="partCurrent"></div></td>
        </tr>
        <tr>
          <td>pageCurrent</td>
          <td><div id="pageCurrent"></div></td>
        </tr>
        <tr>
          <td>beatCurrent</td>
          <td><div id="beatCurrent"></div></td>
        </tr>
        <tr>
          <td>loadScoreToBuffer</td>
          <td><div id="loadScoreToBuffer"></div></td>
        </tr>
        <tr>
          <td>loadScoreFromBuffer</td>
          <td><div id="loadScoreFromBuffer"></div></td>
        </tr>
      </table>
    </td>
    <td valign="top">
      <table class="debug">
        <tr>
          <td>currentPosition</td>
          <td><div id="currentPosition"></div></td>
        </tr>
        <tr>
          <td>startPositionDay</td>
          <td><div id="startPositionDay"></div></td>
        </tr>
        <tr>
          <td>test</td>
          <td><div id="test"></div></td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`;
for (var k in blocks) {
  $("#" + k).append(blocks[k]);
}
for (var k in fields) {
  $("#" + fields[k]).addClass("debug-field")
}
$(".debug-field").text("...");
