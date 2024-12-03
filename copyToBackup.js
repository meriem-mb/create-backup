const fs = require('fs');
const path = require('path');

// Step 1: Create the Backup Directory
function createBackupDirectory() {
    const backupPath = './backup';
    if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath);
        console.log('Backup directory created.');
    } else {
        console.log('Backup directory already exists.');
    }
}

// Step 2: Copy All `.txt` and `.jpg` Files to Backup
function copyInitialFilesToBackup(directory) {
    const backupPath = './backup';

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        files.forEach((file) => {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.txt' || ext === '.jpg') {
                const source = path.join(directory, file);
                const destination = path.join(backupPath, file);

                if (!fs.existsSync(destination)) {
                    fs.copyFileSync(source, destination);
                    console.log(`Copied: ${file} to backup.`);
                }
            }
        });
    });
}

// Step 3: Monitor Directory for Manual Deletions
function backupDeletedFiles(directory) {
    const backupPath = './backup';

    // Get the initial state of the directory
    let initialFiles = fs.readdirSync(directory);

    console.log('Monitoring for manual deletions...');
    fs.watch(directory, (eventType, filename) => {
        const ext = path.extname(filename).toLowerCase();

        if (eventType === 'rename' && !fs.existsSync(path.join(directory, filename)) && (ext === '.txt' || ext === '.jpg')) {
            // File was manually deleted
            console.log(`Detected deletion of: ${filename}`);

            const fileName = path.basename(filename, ext);
            const deletionDate = new Date().toISOString().split('T')[0];
            const originalBackup = path.join(backupPath, filename);
            const renamedBackup = path.join(backupPath, `${fileName}-${deletionDate}${ext}`);

            if (fs.existsSync(originalBackup)) {
                // Rename the existing backup file with the deletion date
                fs.renameSync(originalBackup, renamedBackup);
                console.log(`Renamed backup to include deletion date: ${renamedBackup}`);
            } else {
                console.log(`No original backup found for: ${filename}`);
            }
        }

        // Update the initial state
        initialFiles = fs.readdirSync(directory);
    });
}

// Step 4: Run the Script
const monitoredDirectory = './'; // Set your directory to monitor
createBackupDirectory(); // Ensure backup directory exists
copyInitialFilesToBackup(monitoredDirectory); // Back up existing files
backupDeletedFiles(monitoredDirectory); // Monitor for deletions
