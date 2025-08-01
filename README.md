# Rewardstack-server
🏆 RewardStack Server

This is the backend API server for RewardStack — a rewarding platform where users can claim random points, view leaderboards, and track claim history.

Built with Node.js, Express, MongoDB, and Mongoose, this server handles all the core logic and database operations.

Features

Add new users

Claim random reward points

View leaderboard rankings

Track individual claim history

RESTful API with clean routing

Environment-based config with .env

Tech Stack

Node.js

Express.js

MongoDB + Mongoose

Real-time updates via Socket.IO

dotenv

CORS

nodemon (for development)



Installation

cd server

npm install

Running the Server (Dev)

npm run dev

The server will run on: http://localhost:5000

API Endpoints

Method

Endpoint

Description

POST

/api/users

Add a new user

GET

/api/users

Get all users

POST

/api/claim/:id

Claim random points

GET

/api/history/:id

Get claim history for user

GET

/api/leaderboard

Get leaderboard ranking

🧪 Sample Test

To test with Postman or Thunder Client:

Add user:POST http://localhost:5000/api/usersBody: { "name": "Alice" }

Claim points:POST http://localhost:5000/api/claim/<userId>

🛡 Best Practices Followed

Modular route handling

Clean controller logic

Proper error handling

MongoDB Atlas-compatible

Secure with .env usage

License

This project is for educational or demonstration purposes.

Author

Made with love and interest by S Neshraj

# Rewardstack-server
