const fs = require('fs');
const path = './backup';

function createBackupDirectory() {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        console.log('Backup directory created.');
    } else {
        console.log('Backup directory already exists.');
    }
}

// Example Usage
createBackupDirectory();
