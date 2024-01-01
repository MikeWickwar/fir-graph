const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

const repoPath = path.resolve(__dirname, '/Users/mike/WorkSpace/git-graph');
const git = simpleGit(repoPath);

// Starting date (change this to match the start of your design)
const startDate = new Date(2024, 0, 1);

// Define the design as a matrix (7x7 example, you can expand as needed)
const design = [
    [1, 1, 1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 0]
    // Add more rows to complete your design
];

async function createCommits() {
    for (let week = 0; week < design.length; week++) {
        for (let day = 0; day < design[week].length; day++) {
            if (design[week][day] === 1) {
                const commitDate = new Date(startDate.getTime() + (week * 7 + day) * 24 * 60 * 60 * 1000);
                for (let i = 0; i < 5; i++) {  // Number of commits for desired intensity
                    fs.appendFileSync(path.join(repoPath, 'commit_file.txt'), `Commit for ${commitDate}\n`);
                    await git.add('commit_file.txt');
                    await git.commit(`Commit for ${commitDate}`, { '--date': commitDate.toISOString() });
                }
            }
        }
    }
    console.log('Commits created!');
}

createCommits().catch(console.error);
