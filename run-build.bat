@echo off
echo Running build
npx postcss ./src/tailwind.css -o ./public/css/main.min.css
npm run tsc