"use strict";
exports.__esModule = true;
var task = require("vsts-task-lib");
var path = require("path");
var exec = require('child_process').exec;

task.setResourcePath(path.join(__dirname, 'task.json'));

var input = task.getInput('transforms', true);
var workingFolder = task.getInput('workingFolder') || task.cwd();
var dllPath = path.join(__dirname, 'dotnet-transform-xdt.dll');

var lines = input.split(/\s*\r?\n\s*/);
for(var i=0; i<lines.length; i++){
    if(!lines[i]){
        continue;
    }
    var items = lines[i].split(/\s*=>\s*/);
    var xml = path.join(workingFolder, items[1]);
    var xdt = path.join(workingFolder, items[0]);
    var output = items.length >=3 ? path.join(workingFolder, items[2]) : xml;
    exec("dotnet " + dllPath + " -x " + xml + " -o " + output + " -t " + xdt, function (err, stdout, stderr) {
        if (err) {
            throw new Error(err);
            return;
        }
        console.log(stdout);
        if(stderr){
            throw new Error(stderr);
        }
    });
}

