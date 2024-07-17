#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const TEMPLATE_PATH = path.join(__dirname, 'templates', 'default');

async function createApp() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your project name?',
      default: 'my-app',
    },
  ]);

  const targetPath = path.join(process.cwd(), answers.name);
  await fs.copy(TEMPLATE_PATH, targetPath);

  console.log(`Success! Created ${answers.name} at ${targetPath}`);

  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: targetPath });

  console.log('All done! You can now start your project with:');
  console.log(`  cd ${answers.name}`);
  console.log('  npm start');
}

createApp().catch(err => console.error(err));
