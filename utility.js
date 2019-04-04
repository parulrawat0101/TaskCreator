const fs=require('fs');
const util=require('util');
var process=require('process');
const makeDir = require('make-dir');
const path=require('path');
var mkdirp = require('mkdirp');

//JSON path
var data={
    fetchJSONdata : function (file) {
            return new Promise((resolve, reject) => {
                fs.readFile(file, (error,data) => {
                    if (error) reject(error);
                    else resolve(data);
                });
        });
    },
    inputTaskID : function () {    
            var taskID=process.argv[2];
            //console.log(taskID)
            if (!taskID) {
                throw new Error('Please enter Task ID');
            }
            else console.log('task ID taken');
            return taskID;   
    },
    createFolderPath : function (configPath) {
        //1.fetch task ID
        var taskID=this.inputTaskID();
        //2. split the string in array
        var splitTaskID= this.splitTaskIDString(taskID); //3. now append the folder path
        var folderPath=`${configPath}\\XMLs\\TaskXmls2019\\${splitTaskID[0]}\\${splitTaskID[1]}\\${splitTaskID[2]}`;
        var folderName=`${folderPath}\\${splitTaskID[3]}.${splitTaskID[4]}.${splitTaskID[5]}`;
        console.log(folderName);
        this.createFolder(folderPath,folderName);
},
    splitTaskIDString : function (taskID) {
        var arr=new Array();        
        arr=taskID.split(".");      
        arr[0]=arr[0].replace(/\d/gi,'').toLowerCase();
        arr[1]=arr[1].toLowerCase();
        console.log(arr)
        return arr;
    },
    createFolder : function (folderPath,folderName) {
        console.log(fs.statSync(folderPath).isDirectory());
        if (fs.statSync(folderPath).isDirectory() === true){    
            console.log("in if")  //if directory exists
            fs.mkdir(folderName,(err)=>{
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('success');
                }
            })
            return folderPath;
       }
       else { 
           console.log("in else");
           fs.mkdir(folderPath,(err)=>{
                if(err) {console.log(err)}
                else {console.log("success")}
           });
            fs.mkdir(folderName,(err)=>{
                if(err) {console.log(err)}
                else {console.log("success")}
            });
    }
    }
}
module.exports=data;