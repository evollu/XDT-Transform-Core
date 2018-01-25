"use strict";
exports.__esModule = true;
var task = require("vsts-task-lib");
var path = require("path");
task.setResourcePath(path.join(__dirname, 'task.json'));
var xml = task.getInput('xml');
var output = task.getInput('output');
var xdt = task.getInput('xdt');
var exec = require('child_process').exec;
exec("dotnet dotnet-transform-xdt.dll -x " + xml + " -o " + output + " -t " + xdt, function (err, stdout, stderr) {
    if (err) {
        // node couldn't execute the command
        return;
    }
    // the *entire* stdout and stderr (buffered)
    console.log(stdout);
    console.error(stderr);
});
