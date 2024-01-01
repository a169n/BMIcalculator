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

- Access the BMI calculator at [http://localhost:your_port/](http://localhost:your_port/)
- Access the user history at [http://localhost:your_port/history](http://localhost:your_port/history)

### API Endpoints

- **GET /users:** Get a list of all users.
- **POST /users:** Create a new user and calculate BMI.

  Example Request:
  ```json
  {
    "name": "John Doe",
    "height": 175,
    "weight": 70,
    "age": 30,
    "gender": "male",
    "unitSystem": "metric"
  }
  Example Responce:
    ```json
    {
    "_id": "unique_id",
    "name": "John Doe",
    "height": 175,
    "weight": 70,
    "age": 30,
    "isMale": true,
    "bmi": 22.86,
    "category": "Normal weight",
    "unitSystem": "metric",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }

## Installation:
To install the required packages, run the following command:
```
  npm install dotenv express mongoose nodemon
```
To start the server, use:
```
  npm run server
```
## Dependencies
* dotenv: Load environment variables from a .env file.
* express: Fast, unopinionated, minimalist web framework for Node.js.
* mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
* nodemon: Monitor for any changes in your Node.js application and automatically restart the server.
### License
This project is licensed under the ISC License.

### Author
Aibyn Talgatov



