# openst-gaudens
Website of ITF tournament of Saint-Gaudens

# Development
Use only gulp serve to run the website locally. Any modification would recompile the template and re-generate the internationalized pages.

# i18n 
The internationalization is handled by gulp plugin "gulp-static-i18n-html". Json files inside locales folder contains actual text values, gulp task "i18n" will generate html pages in root folder for french, and in "en" folder for english. 

# Deployment
The actual website is handled via github-pages, simply git push to master will deploy the website.

# Result draws 
The draws are loaded via a React component, that loads draw files from assets/json/

# Entry list
TODO document this part