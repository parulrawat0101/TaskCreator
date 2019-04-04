const fs=require('fs');
const util=require('util')
var path=require('path');
var process=require('process');
var configPath;
var stepConcatenationPath;
var utility=require('./utility.js')
// var {taskID}=require('./utility.js')

//var arr=new Array();
utility.fetchJSONdata('./init.json')
    .then((result) => {
        // enable status true  //and if the directory mentioned exists
        if (JSON.parse(result).enable === 'true'
             && fs.statSync(JSON.parse(result).path).isDirectory() === true
            && fs.statSync(JSON.parse(result).stepConcatenation).isDirectory() === true) {
            //config path
            configPath=JSON.parse(result).path;
            stepConcatenationPath=JSON.parse(result).stepConcatenation;
            return configPath;
        }
    })
    .then((configPath)=>{
        // console.log(stepConcatenationPath);
        // console.log(this.taskID);
        var x=utility.createFolderPath(configPath);
        // utility.fetchJSONdata.bind(x);
        //console.log(stepConcatenationPath);
         var data=utility.updateLocalInputJson(configPath,utility.taskID);
         utility.overWriteInputJson (stepConcatenationPath,data)
         utility.rebase(stepConcatenationPath)
         


    })
    .catch((error)=>{
        console.log(error);
    })

