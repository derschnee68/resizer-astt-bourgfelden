const sharp = require('sharp');
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

function resize(inputFile, outputFile, width) {

    sharp(inputFile).resize({width}).toFile(outputFile)
        .then(function (newFileInfo) {
            // newFileInfo holds the output file properties
            console.log("Success")
        })
        .catch(function (err) {
            console.log(inputFile, outputFile);
            console.log("Error occured");
        });
}

function list(folderPath) {
    fs.readdir(folderPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            const newPath = path.join(folderPath, file);
            // Do whatever you want to do with the file
            if (fs.statSync(newPath).isDirectory()) {
                fs.mkdirSync(newPath + '_1024');
                list(newPath);
            } else {
                // is file
                const match = new RegExp(/^(.+)\.(jpg|JPG)$/g).exec(file);
                if (match !== null) {
                    resize(path.join(folderPath, file), path.join(folderPath + '_1024', file), 1024);
                } else {
                    fs.cp(path.join(folderPath, file), path.join(folderPath + '_1024', file), () => {});
                }
            }
        });
    });
}

list('/Users/julien/Downloads/experiment/Photos papier copy/Photos Rene 2022.08.30');
