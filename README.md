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
Go to tournament list on ITF website

https://www.itftennis.com/en/tournament/w60-saint-gaudens/fra/2023/w-itf-fra-09a-2023/acceptance-list/
Retrieve request like : 
https://www.itftennis.com/tennis/api/TournamentApi/GetAcceptanceList?tournamentKey=w-itf-fra-09a-2023&circuitCode=WT
Copy json to EntryList.json in assets/js