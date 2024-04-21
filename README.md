# Guess the Flag!

This web application aims to educate people about the countries of the world through an interactive flag guessing game, a map sandbox, and more.


## Demo

The app is live to try out on [guesstheflag.onrender.com](https://guesstheflag.onrender.com).
- Note: The app is currently hosted using [render.com's free tier](https://docs.render.com/free#free-web-services) and therefore may take up to 30 seconds to initially load.


## Tech Stack

**Client:** [Angular](https://angular.io), [RxJS](https://rxjs.dev)

**Server:** [Node.js](https://nodejs.org/en), [Express](https://expressjs.com), [MongoDB](https://mongodb.com)


## Description
This application was made using Angular for the frontend, Node.js for the backend and MongoDB for the database. The database contains details about each country and is seeded using the [REST Countries API](https://gitlab.com/restcountries/restcountries).


## Run/Develop locally

Clone the project and in 2 separate terminals perform the following commands from inside the root `flag-guess/` directory.

Terminal 1:

```bash
  cd backend && npm install && npm run start
```

Terminal 2:

```bash
  cd frontend && npm install && npm run start
```

The site should then be accessible from [localhost:4200](http://localhost:4200)

### Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file:

[`JWT_KEY`](https://jwt.io) - Can be any string of characters used for generating access tokens.

`MONGO_URI` - URI link to a MongoDB database, which can be the free [shared tier](https://www.mongodb.com/pricing).


## About the project

I made this project to learn how to make a full-stack web application from scratch using unfamiliar technologies and features. I used Angular to learn its extensible project structure as well as its features for example services, interceptors and authGuards. I also used Express to learn how to create a router that served as a robust REST API interface for communication and JSON data transfer between the frontend and backend. I used and populated a MongoDB database using [Mongoose](https://mongoosejs.com) to store collections of user data, scoreboard entries and country data.

I also used this project as a way to learn the best practices in industry for software application development such as structuring a project in a scalable and reliable manner as well as more safety specific app development practices such as bcrypt hashed user authentication and session tokens with JWT. 
