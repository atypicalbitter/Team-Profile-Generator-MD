const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = []; // Array to store team members

// Inquirer prompts for the manager details
inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Enter the manager's name:",
    },
    {
        type: "input",
        name: "id",
        message: "Enter the manager's employee ID:",
    },
    {
        type: "input",
        name: "email",
        message: "Enter the manager's email:",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number:",
    },
])
    .then((answers) => {

        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        team.push(manager);

        // Call function to prompt for engineer or intern
        promptTeamMembers();
    });

// Function to prompt for engineer or intern
function promptTeamMembers() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberType",
            message: "Select a team member type to add:",
            choices: ["Engineer", "Intern", "Finish Building Team"],
        },
    ])
        .then((answer) => {
            // Check the selected team member type
            switch (answer.memberType) {
                case "Engineer":
                    promptEngineer();
                    break;
                case "Intern":
                    promptIntern();
                    break;
                case "Finish Building Team":
                    generateHTML();
                    break;
            }
        });
}

// Function to prompt for engineer details
function promptEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the engineer's name:",
        },
    {
        type: "input",
        name: "id",
        message: "Enter the engineer's employee ID:",
    },
    {
        type: "input",
        name: "email",
        message: "Enter the engineer's email:",
    },
    {
        type: "input",
        name: "github",
        message: "Enter the engineer's github here:",
    },
    ])
        .then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            team.push(engineer);
            // Continue prompting for more team members
            promptTeamMembers();
        });
}

// Function to prompt for intern details
function promptIntern() {
inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Enter the intern's name:",
    },
    {
        type: "input",
        name: "id",
        message: "Enter the intern's employee ID:",
    },
    {
        type: "input",
        name: "email",
        message: "Enter the intern's email:",
    },
    {
        type: "input",
        name: "school",
        message: "Enter the intern's school:",
    }
])
    .then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        team.push(intern);
        promptTeamMembers();
    });
}

// Function to generate HTML and write to file
function generateHTML() {
    const html = render(team);
    fs.writeFile(outputPath, html, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Team profile successfully generated in team.html");
    });
}
