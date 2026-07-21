# Event Management API

A RESTful API built with Node.js, Express.js, MongoDB, and Mongoose for managing events.

## Features

- Create events
- Get all events
- Get a single event by ID
- Update events
- Delete events
- MongoDB Atlas database integration
- MVC-style layered architecture
- Environment variables for sensitive configuration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Nodemon

## Project Structure

Node_Project/
│
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
│
└── src/
    │
    ├── app.js
    ├── server.js
    │
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   └── event.controller.js
    │
    ├── models/
    │   └── event.model.js
    │
    ├── routes/
    │   └── event.routes.js
    │
    └── services/
        └── event.service.js

## Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Move into the project directory:

cd Node_Project

Install dependencies:

npm install

## Environment Variables

Create a `.env` file in the root directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string

Never commit your `.env` file to GitHub because it contains sensitive information.

## Running the Project

Start the development server:

npm run dev

The server will run at:

http://localhost:3000

## API Endpoints

### Create an Event

POST /api/events

Example request body:

{
    "title": "Node.js Workshop",
    "description": "Learning backend development",
    "date": "2026-08-10",
    "location": "Kathmandu",
    "capacity": 50
}

### Get All Events

GET /api/events

### Get One Event

GET /api/events/:id

### Update an Event

PUT /api/events/:id

Example request body:

{
    "title": "Advanced Node.js Workshop",
    "capacity": 100
}

### Delete an Event

DELETE /api/events/:id

## Architecture

This project follows a layered MVC-style architecture:

Request
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB

### Routes

Routes define the HTTP methods and API endpoints.

### Controllers

Controllers handle incoming requests and send responses to the client.

### Services

Services contain the business logic and perform database operations.

### Models

Models define the structure of the data and communicate with MongoDB using Mongoose.

## Testing

The API can be tested using Thunder Client or Postman.

## Author

Smaran Aryal