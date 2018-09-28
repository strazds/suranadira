var fields = [];
fields["debug"] = `
<table class="debug">
  <tr>
    <td>Preloaded Position</td>
    <td><div id="preloadedPosition"></div></td>
  </tr>
  <tr>
    <td>Preloaded Pentade</td>
    <td><div id="preloadedPentade"></div></td>
  </tr>
  <tr>
    <td>Adjusted Pentade</td>
    <td><div id="adjustedPentade"></div></td>
  </tr>
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
</table>
`;
for (var k in fields) {
  $( "#" + k ).append( fields[k] );
}
