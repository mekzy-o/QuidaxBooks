# QuidaxBooks

[![npm version](https://badge.fury.io/js/express.svg)](https://badge.fury.io/js/express)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#features-implemented)
- [Working Routes](#working-routes)
- [Assumption made (Thought process)](#assumptions-made(thought-process))
- [Requirement not covered](#requirement-not-covered)
- [License](#license)

# Introduction

This is a RESTful API for a simple ecommerce service. Part of an online assessment for [Quidax](https://www.quidax.com/) Senior Backend Engineer Position.

### **Style guide**

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)

### Project Structure

```bash
├── assets
├── src
├── .env.example
├── .eslintrc
├── .gitignore
├── .mocharcyml
├── .nycrc
├── .sequelizerc
├── package.json
├── prettier.config.js
└── README.md
```

### Project Database Architecture

![Untitled](https://user-images.githubusercontent.com/40548599/131268589-443e0b34-3415-4e29-9c07-135d2ddd5b01.png)

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `201` `New Resource` The request was successful and created a new resource
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred

### Features Implemented

- Users can sign up.
- Users can login.
- Users can logout
- Users can get featured books (paginated)
- Users can get specific book
- Users can search for books (paginated)
- User can get cart items
- User can add or update cart items
- Users can like and unlike a book
- Users can rate a book (average rating is returned)


# Getting Started

### Dependencies

This project uses [Express.js](https://expressjs.com/) v4.16. It has the following dependencies:

- [Node.js `>=` 12.18.3](https://nodejs.org/en/download)
- [PostgreSQL Database](https://www.postgresql.org/download/)
- [Sequelize]((https://www.postgresql.org/download/))
- Mocha & Chai
- ESLint & Prettier
- [Redis](redis.io)

#### _Prerequisites_

- Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed, go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

- Ensure you have **Redis** installed by entering `redis-cli -v` on your terminal
If you don't have **Redis** installed, go to the [Redis Website](http://redis.io), and follow the download instructions

### Getting the Source

You can clone this project directly using this command:

```sh
git clone https://github.com/mekzy-o/QuidaxBooks.git
```

### Installation & Usage

- Create a PostgreSQL database by running the `cmd` below:

```sh
createdb -h localhost -p 5432 -U postgres <database_name>
```

- After cloning the repository, create a `.env` file from `.env.example` and set your local `.env.` variable(s).

```sh
cp .env.example .env
```

- Install the dependencies

```sh
npm install
```

- Run migration

```sh
npm run db:migrate
```

- You can run the server using

```sh
npm run start:dev
```

- You should also run the redis server on your terminal
```sh
   redis-server
```

- Other `npm` scripts are also available for handling database migration and database seeding:
  - `npm run db:migrate` runs script that is responsible for creating tables and their columns in the database,
  - `db:migrate:undo`: undoes the effect of `npm run db:migrate`,
  - `db:reset`: undoes all the migrations, then runs migration on the database,
  - `db:seed`: responsible for seeding records in the database,

# Working Routes

## _API Endpoints_

- Public API documentation of this project is available on [Quidax postman docs](https://documenter.getpostman.com/view/6464518/U16bvUQo)

| Endpoint                                     |                Functionality                | HTTP method |
| -------------------------------------------- | :-----------------------------------------: | ----------: |
| /api/v1/user/signup                          |            Create a user account            |        POST |
| /api/v1/user/signin                          |                Login a user                 |        POST |
| /api/v1/user/logout                          |                Logout a user                |         GET |
| /api/v1/books/featured                       |             Get Featured Books              |         GET |
| /api/v1/books/featured?page=1&&size=10       | Get Featured Book with page number and size |         GET |
| /api/v1/books/:slug                          |      Get a specific book by book slug       |         GET |
| /api/v1/search?query=Michelle&&filter=author |               Search for Book               |         GET |
| /api/v1/cart/:slug                           |              Add book to cart               |        POST |
| /api/v1/cart                                 |             Get All cart Items              |         GET |
| /api/v1/rate/:slug                           |                 Rate a book                 |        POST |
| /api/v1/like/:slug                           |            Like or Unlike a Book            |        POST |

# Assumptions made (Thought process)

- I assumed there would be no admin in this version of the application, so every logged in user can perform all actions
- There was no clear requirement on how books were to be added or how asset data were to be used. I created seed data with each asset image file (hosted on cloudinary) (this can be found in my `src/database/seeders`).
- I used Redis as a database store for cart items instead of using a database (This has an advantage when scaling and also low latency)
- I assumed different books can have the same tag/tags, I saved tags using an array on book table instead of creating a seperate tag table, which would cause redundacy.
- I assumed logged in users are the ones able to access cart, this may not be optimal and can be improved

# Requirement not covered

- Updating like count of books in real time. I'm updating the like count but not in real time.


## License :boom:

This project is under the MIT LICENSE
