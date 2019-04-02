const fs=require('fs');
const util=require('util');
var process=require('process');

//JSON path
var data={
        fetchJSONdata:function(file) {
            return new Promise((resolve, reject) => {
                fs.readFile(file, (error,data) => {
                    if (error) reject(error);
                    else resolve(data);
                });
        });
    },
    inputTaskID:function() {
        return new Promise((resolve,reject)=>{
            var taskID=process.argv[2];
            (!taskID)? reject() : resolve (taskID);
            // if (!taskID) {
            //     reject (error);
            // }
            // else {
            //     resolve (taskID);
            // }
        });
        
    },
    createFolderPath(taskID,configPath) {

    }
}
module.exports=data;