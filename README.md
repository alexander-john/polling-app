# Polling App

Polling App is a full-stack web application that allows users to create, vote, and manage polls. The application is built using Node.js, Express, MongoDB for the backend, and React with Vite for the frontend.

## Project Structure

```markdown
backend/
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
frontend/
 polling-app/
  .gitignore
  eslint.config.js
  index.html
  package.json
  postcss.config.js
  public/
   vite.svg
  README.md
  src/
   App.css
   App.jsx
   assets/
   components/
   context/
   ...
  tailwind.config.js
  vite.config.js
```

## Architecture

This project uses a Monolithic Architecture. Both the backend and frontend are contained within a single repository and are developed and deployed as a single unit.

## Backend

### Setup

1. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a .env file in the root directory and add the following environment variables:

    ```plaintext
    PORT=8000
    MONGO_URI=<your_mongo_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

4. Start the backend server:

    ```sh
    npm run dev
    ```

## Frontend

### Setup

1. Navigate to the `frontend/polling-app` directory:

    ```sh
    cd frontend/polling-app
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run dev
    ```

## License

This project is licensed under the MIT License.
