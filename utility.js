const fs = require('fs');
var process = require('process');
// var cp = require("child_process");
const cp = require('promisify-child-process');
const np=require('child_process');


//JSON path
var data = {
    taskID: '',
    folderName: '',
    folderPath: '',
    issueID: '',
    fetchInitJSONdata: function (file) {
        
        return new Promise((resolve, reject) => {
            fs.readFile(file, (error, data) => {
                if (error) reject(error);
                else resolve(data);
            });
        });
    },
    inputTaskID: function () {

        this.taskID = process.argv[2];
        if (!this.taskID) {
            throw new Error('Please enter Task ID');
        }
        return this.taskID;
    },
    inputIssueID: function () {

        this.issueID = process.argv[3];
        if (!this.issueID) {
            throw new Error('Please enter Issue ID');
        }
        return this.issueID;
    },
    createFolderPath: function (configPath) {
        //1.fetch task ID and issue ID
        this.taskID = 'GO19.XL.09.9B.03.A1'//this.inputTaskID();
        this.issueID = 'SON-32888'//this.inputIssueID();


        //2. split the string in array
        var splitTaskID = this.splitTaskIDString(this.taskID); //3. now append the folder path

        this.folderPath = `${configPath}\\XMLs\\TaskXmls2019\\${splitTaskID[0]}\\${splitTaskID[1]}\\${splitTaskID[2]}`;
        this.folderName = `${this.folderPath}\\${splitTaskID[3]}.${splitTaskID[4]}.${splitTaskID[5]}`;

        //if task folder already exists
        if (fs.exists(this.folderName)) {
            throw new Error('Task Folder already present.');
        } else {
            console.log(`Task Folder does not exists at ${this.folderName} hence creating folder`)
            this.createTaskFolder(this.folderPath, this.folderName);
        }

        return this;
    },
    splitTaskIDString: function (taskID) {
        var arr = new Array();
        arr = taskID.split(".");
        arr[0] = arr[0].replace(/\d/gi, '').toLowerCase();
        arr[1] = arr[1].toLowerCase();
        return arr;
    },
    createTaskFolder: async function (folderPath, folderName) {
        try {
            if (await fs.statSync(folderPath).isDirectory() === true) { //if directory exists
                fs.mkdir(folderName, (err) => {
                    if (err) {
                        console.log(err);
                        throw new Error('Failiure in creating Task Folder');
                    } else {
                        console.log('Success in creating Task Folder');
                    }
                })
                return folderPath;
            }
    }
    catch (e){
        fs.mkdir(folderPath, (err) => {
            if (err) {
                console.log(err);
                //throw new Error('Failiure in creating Chapter Folder');
            } else {
                console.log("Success in creating Chapter Folder");
            }
        });
        fs.mkdir(folderName, (err) => {
            if (err) {
                console.log(err)
                throw new Error('Failiure in creating Task Folder');
            } else {
                console.log("Success in creating Task Folder")
            }
        });
        return folderPath;
    }
    },
    createInputJSONData: function (taskID) {

        taskID = taskID.replace(/19/, '16');
        var xmls = this.folderName.split('sim5service\\');

        var input = {
            steps: [{
                id: `${taskID}`,
                type: "id"
            }],
            destination: `${xmls[1]}`,
            mode: "1"
        };
        let data = JSON.stringify(input, null, 2);
        return data;
    },
    overWriteInputJson: function (stepConcatenationPath, data) {
        fs.writeFile(`${stepConcatenationPath}\\input.json`, data, function (err) {
            if (err) {
                return console.log("Error writing file to input.json " + err);
            }
        });
    },
    rebase: function (stepConcatenationPath) {
            
        // return new Promise((resolve, reject) => {
        //     cp.exec("node dist/index.js --input=input.json", (error, stdout, stderr) => {
        //         if (error) reject(error);
        //         else resolve(data);
        //     });
        // });
        np.execSync("node dist/index.js --input=input.json", {
                cwd: stepConcatenationPath
            }, function (error, stdout, stderr) {debugger;
                if (error) {
                } 
                else {
                    debugger;
                //     console.log("Rebase done",data);
                //     try {
                //         sanitize();
                //         gitAdd();
                //     }
                //     catch(e) {
                //         console.log(e);
                //     }
                // }


            }});


    },
    sanitize() {
        console.log('in sani')
        fs.unlink(`${this.folderName}\\ConcatenationInfo.log`, function (err) {
            if (err) return console.log(err);
            console.log('Task Sanitized');
        });
    },//
    gitAdd: function () {
        console.log("in add",+this.taskID);
        return cp.exec(`git add -A && git commit -m ${this.issueID}`, {
            cwd: this.folderPath
        });
    }

}
module.exports = data;

