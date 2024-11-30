const fs = require('fs');
const path = require('path');

function copyFileToBackup(filePath) {
    const fileName = path.basename(filePath);
    const destination = path.join('./backup', fileName);

    fs.copyFile(filePath, destination, (err) => {
        if (err) throw err;
        console.log(`${fileName} copied to backup.`);
    });
}

// Example Usage
copyFileToBackup('./example.txt');
