# Assignment 1

This web application, developed as a part of Assignment 1 for Blink it, offers a seamless image uploading experience. It allows users to easily upload, store, and download images, while also providing robust authentication support. Upon logging in, users can explore their uploaded images presented in an elegant gallery format.

## Features

- Allowes users to upload images
- Cloud storage
- Allows users to download images
- Secure Authentication

## Technologies Used

- Frontend: React.js with vite
- Backend: Node.js with Express
- Database: MongoDB (not included in this repository)
- Authentication: JWT (JSON Web Tokens)
- Image Upload: Multer- for handling file uploads and Cloudinary for cloud storage

## Prerequisites

Before running the application locally, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB (running locally or hosted)
- Cloudinary account for image storage (optional, can be replaced with local storage)

## Getting Started

1. **Clone the repository** to your local machine:

    ```
    git clone <repository-url>
    ```

2. **Navigate** to the project directory:

    ```
    cd Blink-it
    ```

3. **Install dependencies** for both the frontend and backend:

    ```
    cd frontend
    npm install
    cd backend
    npm install
    ```

4. **Set up environment variables**:

    - In the `frontend` directory, create a `.env` file and define the following variable:

        ```
        VITE_BASE_URL = 'http://localhost:5000'
        ```

    - In the `backend` directory, create a `.env` file and define the following variables:

    - create a account in cloudinay and mongodb atlas and get your credentials
      
        ```
        PORT=5000
        MONGODB_URI=<your-mongodb-uri>
        JWT_SECRET=<your-jwt-secret>
        CLOUDINARY_CLOUD_NAME = "<>"
        CLOUDINARY_API_KEY = "<>"
        CLOUDINARY_API_SECRET = "<>"
        CORS_ORIGIN = http://localhost:5173
        ```

5. **Run the backend server**:

    ```
    npm start
    ```

6. **Run the frontend server**:

    ```
    cd ../frontend
    npm start
    ```

7. **Open your browser** and navigate to `http://localhost:5173` to view the application.



## Additional Notes

- Make sure MongoDB is running either locally or on a cloud-hosted service, and update the `MONGODB_URI` variable accordingly.
- For image upload functionality, you can either use Cloudinary or replace it with a local storage solution. Update the backend code accordingly.