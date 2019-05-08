const fs = require('fs');
var process = require('process');
const cp = require('child_process')
var fetchInputJSONdata= function (file) {
        
             return (JSON.parse(fs.readFileSync(file,'utf8')));

    }

    var inputJSONData=fetchInputJSONdata('./input.json');
    console.log(inputJSONData.tasks);
    a();
    function a (){

       for(var x in inputJSONData.tasks){
        var stdout=cp.execFileSync('node', ['./app.js',inputJSONData.tasks[x]]).toString();
        console.log("Rebasing for task:- "+inputJSONData.tasks[x].toString());
        console.log(stdout);
        //console.log(stdout);
        //console.log(stdout);
        //  cp.exec('git status', (err, stdout, stderr) => {
        //     if (err) {
        //       console.error(`exec error: ${err}`);
        //       return;
        //     }
        //     console.log(stdout)
        //,(error, stdout, stderr) => {
        //     if (error) {
        //         console.log(error);
        //         console.log(stderr)
        //     }
        //     console.log(stdout);
        // });
    // });
}
}