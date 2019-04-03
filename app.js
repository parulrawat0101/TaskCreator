const fs=require('fs');
const util=require('util')
var path=require('path');
var process=require('process');
var configPath;
var utility=require('./utility.js')

//var arr=new Array();
utility.fetchJSONdata('./init.json')
    .then((result) => {
        // enable status true  //and if the directory mentioned exists
        if (JSON.parse(result).enable === 'true' && fs.statSync(JSON.parse(result).path).isDirectory() === true) {
            //config path
            configPath=JSON.parse(result).path;
            return configPath;
        }
    })
    .then((configPath)=>{
        //console.log("2");
        var taskFolderPath=utility.createFolderPath(configPath);
        //createFolder(taskFolderPath);
        //console.log(taskFolderPath);
    })
    .catch((error)=>{
        console.log(error);
    })

