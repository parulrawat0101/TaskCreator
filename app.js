const fs=require('fs');
const util=require('util')
var path=require('path');
var process=require('process');

var utility=require('./utility.js')

var arr=new Array();
utility.fetchJSONdata('./init.json')
    .then((result) => {
        // enable status true  //and if the directory mentioned exists
        if (JSON.parse(result).enable === 'true' && fs.statSync(JSON.parse(result).path).isDirectory() === true) {
            //config path
            arr.push(JSON.parse(result).path);

        }
        // else {console.log("set enable to true");}
    })
    .catch((error) => {
        console.log(error);
    });
    console.log(configPath);
utility.inputTaskID()
    .then((taskID) => {
        // utility.createFolderPath(taskID);
        console.log(taskID);
        console.log(configPath);
    })
    .catch(() => {
        console.log("Please enter valid Task ID");
});


