#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => new Promise((res, rej) => setTimeout(res, 2000));
async function welcome() {
    const rainbow = chalkAnimation.pulse("Lets's start the Game");
    await sleep();
    rainbow.stop();
}
// welcome();
let playerLife = 3;
async function askQuestion() {
    let randomNumber = Math.floor(Math.random() * 10 + 1);
    //   console.log(`Player life left ${playerLife}`)
    do {
        playerLife--;
        console.log(chalk.red(`Player life left ${playerLife}`));
        var que = await inquirer.prompt([
            {
                type: "number",
                name: "user_num",
                message: "Select number between 1-10:",
                //   validate: (answers: number) => {
                //     if (isNaN(answers)) {
                //       return chalk.bgGray("Please enter a valid Number!");
                //     }
                //     return true;
                //   },
            },
        ]);
        if (que.user_num === randomNumber) {
            console.log(chalk.yellow(`Congratulation! You guess the right number`));
        }
        else if (que.user_num < randomNumber) {
            console.log(chalk.yellow(`your number ${que.user_num} is less then guess number`));
        }
        else if (que.user_num > randomNumber) {
            console.log(chalk.yellow(`your number ${que.user_num} is greater then guess number`));
        }
    } while (playerLife > 0 && randomNumber !== que.user_num);
    if (playerLife == 0 && randomNumber !== que.user_num) {
        console.log("GAME OVER!");
    }
}
// askQuestion();
async function startAgain() {
    do {
        await welcome();
        playerLife = 3;
        await askQuestion();
        var restart = await inquirer.prompt([
            {
                type: "input",
                name: "start_again",
                message: "Do you want to restart the game? press Y or N",
            },
        ]);
    } while (restart.start_again === "y" ||
        restart.start_again === "n" ||
        restart.start_again === "Y" ||
        restart.start_again === "N");
}
startAgain();
