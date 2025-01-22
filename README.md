# Car-Management-API

This repository is created to complete the Synrgy-7 challenge, which involves creating and implementing a RESTful API using the Express.js framework.

Documentation : [https://documenter.getpostman.com/view/30534452/2sA3QwcACz](https://documenter.getpostman.com/view/30534452/2sA3QwcACz)

API Domain: [https://marginal-kristel-rat-org-1f2a12bb.koyeb.app/](https://marginal-kristel-rat-org-1f2a12bb.koyeb.app/)

## Features

- **RESTful API**: Implementation of various endpoints for managing car rentals.
- **Authentication**: User authentication and authorization.
- **CRUD Operations**: Create, read, update, and delete operations for car inventory.
- **Admin Features**: Special endpoints for admin operations.

## Tech Stack

- **Web Framework**: Express.js
- **Database**: Postgres
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

Follow these steps to set the project up and running locally.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- yarn or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/car-management-api.git
cd car-management-api
```

2. Install dependencies

```bash
yarn
# or if you use npm
npm install
```

### Environment Variables
Create a .env.dev file in the root of the project folder and add the necessary environment variables. 
```
PORT=8080
CLIENT_URL=http://localhost:5173 #for vite local
API_URL=http://localhost:8080 #for static express image preview

#Database Connection use Postgres db
DB_HOST=#your db host
DB_USERNAME=#your db username
DB_PASS=#your db password
DB_NAME=#your db name
DB_PORT=#your db port

#You can modify these expiration time
ACCESS_TOKEN_EXPIRES_IN=1h 
REFRESH_TOKEN_EXPIRES_IN=1d
```
Change the .env file
```
ENV_FILE=prod
```

### Database Migration
```bash
yarn run migration
```

### Database Seeder
```bash
yarn run seeder
```
### Running the Development Server
```bash
yarn dev
```
