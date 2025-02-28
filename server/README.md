
# Server - Polling App

This directory contains the backend code for the Polling App. The backend is built using Node.js, Express, and MongoDB.

## Project Structure

```markdown
server/
  .env
  config/
    db.js
  controllers/
    authController.js
    pollController.js
  middleware/
    authMiddleware.js
    uploadMiddleware.js
  models/
    Poll.js
    User.js
  package.json
  routes/
    authRoutes.js
    pollRoutes.js
  server.js
  uploads/
```

## Setup

1. Navigate to the server directory:

    ```sh
    cd server
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a .env file in the server directory and add the following environment variables:

    ```plaintext
    PORT=8000
    MONGO_URI="your_mongo_uri"
    JWT_SECRET="your_jwt_secret"
    ```

4. Start the server:

    ```sh
    npm run dev
    ```

## Available Scripts

In the server directory, you can run:

- `npm run dev`: Starts the development server with nodemon.
- `npm start`: Starts the server in production mode.

## Learn More

To learn more about Node.js, Express, and MongoDB, check out the following resources:

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## License

This project is licensed under the MIT License.