const fs=require('fs');
const util=require('util');
var process=require('process');
const makeDir = require('make-dir');
const path=require('path');
var mkdirp = require('mkdirp');
var cp = require("child_process");

//JSON path
var data={
    taskID:'',
    folderName:'',
    folderPath:'',
    fetchJSONdata : function (file) {
            return new Promise((resolve, reject) => {
                fs.readFile(file, (error,data) => {
                    if (error) reject(error);
                    else resolve(data);
                });
        });
    },
    inputTaskID : function () {    

            this.taskID=process.argv[2];

            if (!this.taskID) {
                throw new Error('Please enter Task ID');
            }
            //else console.log('task ID taken'); +
            return this.taskID;   
    },
    createFolderPath : function (configPath) {
        //1.fetch task ID
        this.taskID=this.inputTaskID();

        //2. split the string in array
        var splitTaskID= this.splitTaskIDString(this.taskID); //3. now append the folder path

        this.folderPath=`${configPath}\\XMLs\\TaskXmls2019\\${splitTaskID[0]}\\${splitTaskID[1]}\\${splitTaskID[2]}`;
        this.folderName=`${this.folderPath}\\${splitTaskID[3]}.${splitTaskID[4]}.${splitTaskID[5]}`;
        //console.log(this.folderName); +
        
        //console.log(`Task to be created at ${this.folderName}`);+
        this.createFolder(this.folderPath,this.folderName);
        return this;
},
    splitTaskIDString : function (taskID) {
        var arr=new Array();        
        arr=taskID.split(".");      
        arr[0]=arr[0].replace(/\d/gi,'').toLowerCase();
        arr[1]=arr[1].toLowerCase();
        // console.log(arr)
        return arr;
    },
    createFolder : function (folderPath,folderName) {
        //console.log(fs.statSync(folderPath).isDirectory());+
        if (fs.statSync(folderPath).isDirectory() === true){     //if directory exists
            fs.mkdir(folderName,(err)=>{
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('Success in creating Task Folder');
                }
            })
            return folderPath;
        }
       else { 
           fs.mkdir(folderPath,(err)=>{
                if(err) {console.log(err)}
                else {console.log("success")}
           });
            fs.mkdir(folderName,(err)=>{
                if(err) {console.log(err)}
                else {console.log("success")}
            });
        }
    },
    updateLocalInputJson : function (configPath,taskID) {

        taskID=taskID.replace(/19/,'16');
       var xmls= this.folderName.split('sim5service\\');

        var input={
            steps:[{
                id : `${taskID}`,
                type: "id"
            }],
            destination : `${xmls[1]}`,
            mode: "1"
        };
        let data = JSON.stringify(input,null,2);  
        //console.log(data);
        fs.writeFileSync('util.json', data);  
        return data;
    },
    overWriteInputJson : function (stepConcatenationPath,data) {
        fs.writeFile(`${stepConcatenationPath}\\input.json`, data, function (err) {
            if (err) {
                return console.log("Error writing file to input.json " + err);
            }
        });
    },
    rebase : function(stepConcatenationPath) {

        cp.exec("node dist/index.js --input=input.json", {cwd: stepConcatenationPath}, function(error,stdout,stderr){
        if (error) {
            console.log("error while rebasing:"+error);
            return 0;
        }
        console.log(stdout);
        console.log(stderr);
        return 1;
        
    });
    },
    gitCommit : function (stepConcatenationPath) {

        var issueID=process.argv[3];
        cp.exec(`git commit -am '${issueID}'`, function(error,stdout,stderr){
            if (error) {
                console.log("Error occured while committing:"+error);
                throw new Error(error);
            }
            console.log(stdout);
            console.log(stderr);
            
        });
        cp.exec('git pull -r', function(error,stdout,stderr){
            if (error) {
                console.log("Error occured while taking pull:"+error);
                throw new Error(error);
            }
            console.log(stdout);
            console.log(stderr);
            
        });
        // cp.exec('git push', {cwd: stepConcatenationPath}, function(error,stdout,stderr){
        //     if (error) {
        //         console.log("Error occured while pushing:"+error);
        //         throw new Error(error);
        //     }
        //     else {console.log(stdout);
        //     console.log(stderr);}
            
        // });
    }

}
module.exports=data;
