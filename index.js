
import { input } from '@inquirer/prompts';
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import fs from 'fs-extra';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_PATH=path.join(__dirname,'template','default');

async function createApp() {

const answer = await input({ 
    name: 'name',
    message: 'What is your project name?',
    default: 'my-app',
});

 const targetPath=path.join(process.cwd(),answer);
 await fs.copy(TEMPLATE_PATH,targetPath);
 console.log(`Success! Created ${answer} at ${targetPath}`);
 console.log('Installing dependencies...');
 execSync('npm install', { stdio: 'inherit', cwd: targetPath });
 console.log('All done! You can now start your project with:');
 console.log(`cd ${answer}`);
 console.log('npm start');
}

export default createApp;
