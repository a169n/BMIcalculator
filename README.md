# BMI Calculator

## Description

BMI Calculator is a simple web application that allows users to calculate their Body Mass Index (BMI) based on their input of height, weight, age, and gender. The application provides a user-friendly interface and maintains a history of BMI calculations, allowing users to track their health progress over time.

## Features

- **User Input Form:** Users can input their name, height, weight, age, and gender to calculate their BMI.
- **BMI Calculation:** The application calculates BMI based on user input, considering both metric and imperial unit systems.
- **BMI Categories:** Each BMI calculation is categorized into groups such as "Underweight," "Normal weight," "Overweight," or "Obese."
- **User History:** The application maintains a history of BMI calculations, allowing users to view their previous results.
- **Unit System Selection:** Users can choose between metric and imperial unit systems for height and weight.

## Usage

### Web Application

- Access the BMI calculator at [http://localhost:3000/](http://localhost:your_port/)
- Access the user history at [http://localhost:3000/history](http://localhost:your_port/history)

### API Endpoints

- **GET /users:** Get a list of all users.
- **POST /users:** Create a new user and calculate BMI.

## Installation:
To install the required packages, run the following commands:
```
npm init -yes
```
After this install these packages:
```
npm install dotenv express mongoose nodemon
```
To start the server, use:
```
npm run server
```

## Script
Change the script to 
```
"server": "nodemon server.js"
```
At the end your **package.json** should look like this:
```
{
  "name": "bmicalculator",
  "version": "1.0.0",
  "description": "simple BMI calculator",
  "main": "index.js",
  "scripts": {
    "server": "nodemon server.js"
  },
  "author": "Aibyn Talgatov",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.2",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "nodemon": "^3.0.2"
  }
}
```

## Dependencies
* dotenv: Load environment variables from a .env file.
* express: Fast, unopinionated, minimalist web framework for Node.js.
* mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
* nodemon: Monitor for any changes in your Node.js application and automatically restart the server.
### License
This project is licensed under the ISC License.

### Author
[Aibyn Talgatov](https://t.me/a1byn)


