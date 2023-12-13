# Deployment Guide
### Primary Environment
OS: Linux
Language: JavaScript
Framework: ViteJS | AdonisJS
Database: MySQL


# Installation
The system has 2 core components, a backend based on REST API and a frontend.
## API (Backend) Installation

- Clone repository (https://git.grainbulk.com/Michael.Mwasela/doorAPI.git)
- Install primary Node dependencies ``npm install``

Configure the database by editting `.env` and configuring the folllwing variables: mysql_host, user & password**

## UI (Frontend) Installation
- Clone repository (https://git.grainbulk.com/Michael.Mwasela/door-frontend.git)
- Install primary Node dependencies ``npm install``

Point the application to the backend API by updating `/src/Pages/Home.js`

Update `axios.defaults.baseURL`

Run `npm build` in both the api and the UI to compile Node resources
