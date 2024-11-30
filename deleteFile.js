const fs = require('fs');
const path = require('path');

function deleteFile(filePath) {
    fs.unlink(filePath, err => {
        if (err) throw err;
        console.log(`${filePath} has been deleted.`);
    });
}

// Example Usage
deleteFile('./example.txt');
