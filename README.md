# my-custom-create-app

my custom react npm package

Steps to install:-
1.Run npm i my-custom-create-react-app111 -g
2.my-custom-create-react-app111
3.Good to go.

if your are using tailwind css please add
this @tailwind base; @tailwind components; @tailwind utilities; in .src/index.css
also /** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./src/**/\*.{js,jsx,ts,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}
