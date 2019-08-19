function hashify(cmd_output) {
  var keys = extract_data(cmd_output.split('\n')[0]);
  console.log(keys);
  var act_vals = [];
  var raw_values = cmd_output.split('\n');
  for (var i = 1; i < raw_values.length - 1; i++) {
    var row = {};
    var vals = extract_data(raw_values[i]);
    for (var j = 0; j < keys.length; j++) {
      row[keys[j]] = vals[j];
    }
    act_vals.push(row);
  }
  return {values: act_vals, keys: keys};
}

function extract_data(line_data) {
  return line_data.split(/\s+/);
}
module.exports = hashify;
