const fs = require('fs');
var process = require('process');
const cp = require('child_process')


var fetchInputJSONdata= function (file) {
        
             return (JSON.parse(fs.readFileSync(file,'utf8')));

    }
//READ INPUT.JSON
var inputJSONData = fetchInputJSONdata('./input.json');

(function () {

    for (var x in inputJSONData.tasks) {
        var stdout = cp.execFileSync('node', ['./app.js', inputJSONData.tasks[x]]).toString();
        console.log("Rebasing for task:- " + inputJSONData.tasks[x].toString());
        console.log(stdout);
    }
})();