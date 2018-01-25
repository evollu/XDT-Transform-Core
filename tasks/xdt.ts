import task = require('vsts-task-lib');
import path = require('path');

task.setResourcePath(path.join(__dirname, 'task.json'));

var xml = task.getInput('xml')
var output = task.getInput('output')
var xdt = task.getInput('xdt')

const { exec } = require('child_process');
exec(`dotnet dotnet-transform-xdt.dll -x ${xml} -o ${output} -t ${xdt}`, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(stdout);
  console.error(stderr);
});