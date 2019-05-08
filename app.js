const fs=require('fs');
var configPath;
var stepConcatenationPath;
var utility=require('./utility.js')


utility.fetchConfigJSON('./config.json')
    .then((result) => {
        // enable status true and if the directory mentioned exists
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
        
        utility.createFolderPath(configPath);
        var data=utility.createInputJSONData(utility.taskID);
        utility.overWriteInputJson (stepConcatenationPath,data);
        utility.rebase(stepConcatenationPath)
            .then((data)=>{
                try {
                    utility.sanitize();
                    //utility.gitAdd();
                }
                catch(e) {
                    console.log(e);
                }
            })
    })
    .catch((error)=>{
        console.log(error);
    })

