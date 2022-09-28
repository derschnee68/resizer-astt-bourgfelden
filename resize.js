const sharp = require('sharp');
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

/**
 * Resize the image
 * @param inputFile
 * @param outputFile
 * @param width
 */
function resize(inputFile, outputFile, width) {
    sharp(inputFile).resize({width}).withMetadata().toFile(outputFile)
        .then(function (newFileInfo) {
            // newFileInfo holds the output file properties
            console.log("Success", inputFile);
        })
        .catch(function (err) {
            console.log(inputFile, outputFile);
            console.log("Error occured");
        });
}

/**
 * List recursively files and folders and call resize function when it finds a JPG image and copy it to a new folder
 * @param folderPath The folder to look for
 * @param width Resize width
 * @param level On which "folder level" to add the new folder with copied images
 */
function list(folderPath, width, level) {
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
                if(level === 1) {
                    fs.mkdirSync(newPath + '_' + width);
                }
                list(newPath, width, level + 1);
            } else {
                // is file
                const match = new RegExp(/^(.+)\.(jpg|JPG)$/g).exec(file);
                if (match !== null) {
                    resize(path.join(folderPath, file), path.join(folderPath + '_' + width, file), width);
                } else {
                    fs.cp(path.join(folderPath, file), path.join(folderPath + '_' + width, file), () => {});
                }
            }
        });
    });
}

list('/Users/julien/Downloads/experiment/Photos papier copy/Photos Rene 2022.09.22', 1024,0);
