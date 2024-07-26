
import { input,select} from '@inquirer/prompts';

import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import fs from 'fs-extra';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_PATH=path.join(__dirname,'template','default');

const createSrcFolderStructure = (projectName) => {
  const srcPath = path.join(process.cwd(), projectName, "src");


  const assetsPath = path.join(srcPath, "assets");
  fs.mkdirSync(assetsPath, { recursive: true });


  const componentsPath = path.join(srcPath, "components");
  fs.mkdirSync(componentsPath, { recursive: true });


  const pagesPath = path.join(srcPath, "pages");
  fs.mkdirSync(pagesPath, { recursive: true });

  const stylesPath = path.join(srcPath, "styles");
  fs.mkdirSync(stylesPath, { recursive: true });


  const appCssPath = path.join(stylesPath, "App.css");
  fs.writeFileSync(appCssPath, "");
};

async function createApp() {

const ProjectName = await input(
    { 
        message: 'What is your project name?',
        default: 'my-app',
    },
);

const CssType = await select({
    message: 'Choose the CSS type:',
      choices: [
        { name: 'CSS', value: 'CSS' },
        { name: 'Tailwind', value: 'Tailwind' },
      ],
  });

 const answer={ProjectName,CssType}


 const targetPath=path.join(process.cwd(),answer.ProjectName);
 await fs.copy(TEMPLATE_PATH,targetPath);
 if(answer.CssType==='Tailwind'){
    execSync(
        `cd ${answer.ProjectName} && npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`
      );
      execSync(`cd ${answer.ProjectName} && npx tailwindcss init -p`);
      createSrcFolderStructure(answer.ProjectName);
 }
 console.log(`Success! Created ${answer.ProjectName} at ${targetPath}`);
 console.log('Installing dependencies...');
 execSync('npm install', { stdio: 'inherit', cwd: targetPath });
 console.log('All done! You can now start your project with:');
 console.log(`cd ${answer.ProjectName}`);
 console.log('npm start');
}

export default createApp;
