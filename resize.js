const sharp = require('sharp');
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
//const directoryPath = path.join(__dirname, 'assets');
const directoryPath = '/Users/julien/Downloads/Photos papier copy';
console.log(directoryPath);
//passsing directoryPath and callback function

function resize() {
let inputFile  = "img.jpg";
let outputFile = "output.jpg";

sharp(inputFile).resize({ height: 780 }).toFile(outputFile)
    .then(function(newFileInfo) {
        // newFileInfo holds the output file properties
        console.log("Success")
    })
    .catch(function(err) {
        console.log("Error occured");
    });
}

function list(currentPath) {
    fs.readdir(currentPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            const newPath = path.join(currentPath,file);
            // Do whatever you want to do with the file
            if(fs.statSync(newPath).isDirectory()) {
                list(newPath);
            } else {
            const match = new RegExp(/^(.+)\.(jpg|JPG)$/g).exec(file);
            if(match !== null) {

            }
            }
        });
    });
}

list(directoryPath);
