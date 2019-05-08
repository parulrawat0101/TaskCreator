const fs = require('fs');
var process = require('process');
var cp = require("child_process");

//JSON path
var data = {
    taskID: '',
    taskPath: '',
    chapterPath: '',
    fetchConfigJSON: function (file) {
        
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
    createFolderPath: function (configPath) {
        //1.fetch task ID and issue ID
        this.taskID = this.inputTaskID();


        //2. split the string in array
        var splitTaskID = this.splitTaskIDString(this.taskID); //3. now append the folder path

        this.chapterPath = `${configPath}\\XMLs\\TaskXmls2019\\${splitTaskID[0]}\\${splitTaskID[1]}\\${splitTaskID[2]}`;
        this.taskPath = `${this.chapterPath}\\${splitTaskID[3]}.${splitTaskID[4]}.${splitTaskID[5]}`;

        //if task folder already exists
        if (fs.existsSync(this.taskPath)) {
            throw new Error('Task Folder already present.');
        } else {
            console.log(`Task Folder does not exists at ${this.taskPath} hence creating folder`)
            this.createTaskFolder(this.chapterPath, this.taskPath);
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
    createTaskFolder: function (chapterPath, taskPath) {

        try {
            if (fs.statSync(chapterPath).isDirectory() === true) { //if directory exists
            fs.mkdir(taskPath, (err) => {
                if (err) {
                    console.log(err);
                    throw new Error('Failiure in creating Task Folder');
                } else {
                    console.log('Success in creating Task Folder');
                }
            })
            return chapterPath;
            }
        } catch (e) {
            fs.mkdir(chapterPath, (err) => {
                if (err) {
                    console.log(err);
                    throw new Error('Failiure in creating Chapter Folder');
                } else {
                    console.log("Success in creating Chapter Folder");
                }
            });
            fs.mkdir(taskPath, (err) => {
                if (err) {
                    console.log(err)
                    throw new Error('Failiure in creating Task Folder');
                } else {
                    console.log("Success in creating Task Folder")
                }
            });
        }
    },
    createInputJSONData: function (taskID) {

        taskID = taskID.replace(/19/, '16');
        var xmls = this.taskPath.split('sim5service\\');

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
        return new Promise((resolve, reject) => {
            cp.exec("node dist/index.js --input=input.json", {
                cwd: stepConcatenationPath
            }, function (error, stdout, stderr) {
                if (error) {
                    reject(error);
                } else resolve(stdout);

            });
        })

    },
    sanitize() {
        fs.unlink(`${this.taskPath}\\ConcatenationInfo.log`, function (err) {
            if (err) return console.log(err);
            console.log('Task Sanitized');
        });
    },
    gitAdd: function () {
        cp.exec(`git add -A && git commit -m ${this.issueID} && git pull -r && git push`, {
            cwd: this.chapterPath
        }, function (error, stdout, stderr) {
            if (error) {
                console.log("Error occured:- " + error);
                throw new Error(error);
            } else {
                console.log(stdout);
                console.log(stderr);
                console.log("Task pushed Suceessfully");
            }

        });
    }

}
module.exports = data;





// ,
//     inputIssueID: function () {

//         this.issueID = process.argv[3];
//         if (!this.issueID) {
//             throw new Error('Please enter Issue ID');
//         }
//         return this.issueID;
//     }