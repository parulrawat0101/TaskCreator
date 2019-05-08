const fs = require('fs');
var process = require('process');
var cp = require("child_process");
var fetchInputJSONdata= function (file) {
        
            fs.readFile(file, (error, data) => {
                if (error) throw new Error(error);
                else {
                    console.log('Fetched Input.json succesfully');
                    return JSON.parse(data);}
            });

    }

    var inputJSONData=fetchInputJSONdata('./input.json');
    console.log(inputJSONData)
    cp.exec("npm start", {}, function (error, stdout, stderr) {
                if (error) {}
                else {}
            });