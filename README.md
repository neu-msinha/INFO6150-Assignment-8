# INFO6150-Assignment-8: User Management API

This project is a RESTful API developed with Node.js, Express, and MongoDB to manage user information. The API supports user creation, updating, deletion, and retrieval, as well as image uploading with validation. The API emphasizes security by implementing password hashing with bcrypt and enforcing strong password rules.

## Table of Contents

- [Objectives](#objectives)
- [API Endpoints](#api-endpoints)
  - [User Creation](#user-creation)
  - [Update User Details](#update-user-details)
  - [Delete User](#delete-user)
  - [Retrieve All Users](#retrieve-all-users)
  - [Upload Image](#upload-image)
- [Validation and Security](#validation-and-security)
- [Testing](#testing)
- [Setup Instructions](#setup-instructions)
- [Technologies Used](#technologies-used)

## Objectives

- Implement RESTful API endpoints for user management with Node.js, Express, and MongoDB.
- Securely store passwords using bcrypt.
- Enable image uploads with format validation.
- Test all endpoints via Postman.

## API Endpoints

### User Creation

- **Endpoint:** `POST /user/create`
- **Functionality:** Creates a new user with full name, email, and password.
- **Validations:**
  - Full name and email are required.
  - Password must meet strong password criteria.
- **Response:** Returns a success message or error message with appropriate HTTP status codes.

### Update User Details

- **Endpoint:** `PUT /user/edit`
- **Functionality:** Updates a user's full name and password. Email cannot be changed.
- **Validations:**
  - Validates full name and password.
  - Checks if the user exists before updating.
- **Response:** Confirmation of update or an error message if the user does not exist.

### Delete User

- **Endpoint:** `DELETE /user/delete`
- **Functionality:** Deletes a user by their email.
- **Response:** Confirmation of deletion or an error message if the user does not exist.

### Retrieve All Users

- **Endpoint:** `GET /user/getAll`
- **Functionality:** Retrieves all users’ full names, email addresses, and passwords.
- **Response:** Array of user objects containing full name, email, and hashed password.

### Upload Image

- **Endpoint:** `POST /user/uploadImage`
- **Functionality:** Allows users to upload an image file.
- **Validations:**
  - Only accepts JPEG, PNG, and GIF formats.
- **File Handling:** Uses `multer` for file uploads, saving the file path to MongoDB and the image in an `images` folder.
- **Response:** Confirmation message with the file path.

## Validation and Security

- **Data Validation:** All user-related endpoints validate incoming data to ensure completeness and accuracy.
- **Password Security:** Passwords are hashed with `bcrypt` before storage to enhance security.
- **Image Validation:** Image uploads are restricted to JPEG, PNG, and GIF formats only.

## Testing

- All API endpoints are tested using Postman.