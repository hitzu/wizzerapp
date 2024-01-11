# POC WizzerApp

Technical test for wizzerapp using Node.js

### Requeriments 📋

1. [NodeJs v18.19.0](https://nodejs.org/es/download/)
2. [Docker](https://www.docker.com/products/docker-desktop/)
3. [Docker-compose](https://docs.docker.com/compose/install/)
4. [NPM](https://www.npmjs.com/)

## Start 🚀

Using git on your local machine, you should clone the project.

```
git clone https://github.com/hitzu/wizzerapp.git
```

Using the file manager NPM included with Node.js we will install all project dependencies using the command on the root file system:

```
npm install
```

This will generate the 'node_modules' folder and will install all the necessary packages, will launch Docker, will install the latest version of PostgreSQL with Docker Compose, will run migrations, and it will populate the necessary tables for a quick system setup.

## API 🍻

Now we'll start our server using nodemon to speed up development.

```
npm run start
```

The API routes are divided into three sections: USERS, CONVERSATIONS, MESSAGES.

### USERS

```
POST /users
PATCH /users
DELETE /users
GET /users
GET /users/:id
GET /users/:id/conversations
```

### CONVERSATIONS

```
POST /conversations
POST /conversations/join
DELETE /conversations
```

### MESSAGES

```
POST /messages
UPDATE /messages
DELETE /messages
GET /messages?limit=n&page=n
GET /messages/:id
```

## Documentation 📖

The server will launch a web server where the documentation can be viewed using Swagger and your navigator (Work in Progress)

```
GET /api-docs/
```

You can import the postman_collection attached in this repository for your test

## Testing ⚙️

You can run the unit and the functionality test usign the next command

```
npm run test
```

also when attempting to make a commit the system will automatically run test to ensure the code integrity

## Coding style tests ⌨️

Using the linter package the format code test and fix code formatting (changing ' to ", adding , at the end of a JSON object, adding ; at the end of statements, etc.) and highlights errors that cannot be automatically corrected (unused variables, etc.) using the command:"

```
npm run linter-fix
```

## Built with 🛠️

- [NPM](https://www.npmjs.com/) - Dependency manager
- [DOCKER](https://hub.docker.com/_/postgres) - Sets up a database without the need for installation and is portable
- [Express](https://expressjs.com/) - Framework for setting up a REST server
- [joi](https://www.npmjs.com/package/joi) - Payload and response validator
- [supertest](https://www.npmjs.com/package/supertest) - Used for sending requests and provides tools for automated testing
- [jest](https://www.npmjs.com/package/jest) - Allows running tests via npm commands
- [husky](https://www.npmjs.com/package/husky) - Utilizes git hooks to run npm commands; in this case, pre-commit runs npm run lint-fix to fix code errors, and pre-push runs npm run test for automated testing.

## Authors ✒️

- **Roberto Guillermo Torres Lopez** - _Initial Work_ - [github](https://github.com/hitzu)

## License 📄

This project is licensed under the MIT License.

## Acknowledgments 🎁

Thank you for the opportunity.
