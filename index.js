const fs = require('fs');

// Define the design as a matrix (7x7 example, you can expand as needed)
const design = [
    [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
];

// Starting date (change this to match the start of your design)
const startDate = new Date(2022, 0, 1);

// Function to add days to a date
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// Function to generate a formatted date string for git commit
function formatDate(date) {
    return date.toISOString().replace(/T.*/, '') + ' 00:00:00 GMT';
}

// Generate the bash script
let bashScript = `#!/bin/bash
echo 'GENERATING ART...'
mkdir github_painter
cd github_painter
git init
git remote add origin git@github.com:MikeWickwar/git-graph.git
touch foobar.txt
`;

for (let week = 0; week < design.length; week++) {
    for (let day = 0; day < design[week].length; day++) {
        if (design[week][day] === 1) {
            const commitDate = addDays(startDate, week * 7 + day);
            const formattedDate = formatDate(commitDate);
            for (let i = 0; i < 5; i++) {  // Number of commits for desired intensity
                bashScript += `
echo '${formattedDate} -> (${i})' >> foobar.txt
git add foobar.txt
git commit --date='${formattedDate}' -m '${formattedDate}'
`;
            }
        }
    }
}

bashScript += `
git push origin main
echo 'DONE!'
`;

// Write the bash script to a file
fs.writeFileSync('generate_art.sh', bashScript);

console.log('Bash script generated: generate_art.sh');
