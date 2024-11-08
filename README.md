# User Management API with Image Upload

This project is a RESTful API built with Node.js, Express, and MongoDB to manage user information. The API provides endpoints to create, update, delete, and retrieve users, as well as an endpoint for uploading user images. Data validation, secure password storage with bcrypt, and image format restrictions are implemented.

## Project Structure

- **models/User.js**: Defines the MongoDB schema for the `User` model.
- **controllers/userController.js**: Contains functions for each endpoint to manage user data.
- **routes/userRoutes.js**: Defines API routes and connects them to the respective controller functions.
- **server.js**: Configures Express, connects to MongoDB, and starts the server.
- **package.json**: Lists project dependencies and scripts.

## Requirements

- **Node.js**
- **MongoDB**

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the MongoDB server.
4. Run `npm start` to start the server or `npm run dev` for development mode with Nodemon.

## Endpoints

### User Creation

- **Endpoint**: `POST /user/create`
- **Description**: Creates a new user with `fullName`, `email`, and `password`.
- **Validation**:
  - `email` must be unique and valid.
  - `password` must have at least 8 characters, including uppercase, lowercase, number, and special character.
- **Response**:
  ```json
  {
    "status": "success",
    "message": "User created successfully",
    "data": {
      "fullName": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Update User Details

- **Endpoint**: `PUT /user/edit`
- **Description**: Updates the `fullName` and `password` of a user. `email` cannot be updated.
- **Validation**:
  - Checks if user exists in the database.
  - Validates `fullName` and `password`.
- **Response**:
  ```json
  {
    "status": "success",
    "message": "User updated successfully",
    "data": {
      "fullName": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### Delete User

- **Endpoint**: `DELETE /user/delete`
- **Description**: Deletes a user by their `email`.
- **Response**:
  ```json
  {
    "status": "success",
    "message": "User deleted successfully"
  }
  ```

### Retrieve All Users

- **Endpoint**: `GET /user/getAll`
- **Description**: Retrieves all users' `fullName`, `email`, and hashed `password`.
- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "fullName": "John Doe",
        "email": "john@example.com",
        "password": "$2b$10$..."
      }
    ]
  }
  ```

### Upload Image

- **Endpoint**: `POST /user/uploadImage`
- **Description**: Allows users to upload an image in JPEG, PNG, or GIF format.
- **File Handling**: Uses `multer` for image upload.
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Image uploaded successfully",
    "data": {
      "imagePath": "images/1634936791234-profile.jpg"
    }
  }
  ```

## File Explanations

### `models/User.js`

Defines the `User` schema for MongoDB, including fields for `fullName`, `email`, `password`, and `imagePath`. Example:

```javascript
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, minlength: 2 },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: { type: String, required: true, minlength: 8 },
  imagePath: { type: String, default: null },
});
```

### `controllers/userController.js`

Contains functions for each endpoint. Example `createUser`:

```javascript
exports.createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  res
    .status(201)
    .json({
      status: 'success',
      message: 'User created successfully',
      data: { fullName: user.fullName, email: user.email },
    });
};
```

### `routes/userRoutes.js`

Defines routes and uses `multer` for image handling. Example:

```javascript
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: 'images/',
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  }),
});
router.post('/uploadImage', upload.single('image'), userController.uploadImage);
```

### `server.js`

Configures the server, connects to MongoDB, and includes error-handling middleware. Example:

```javascript
app.use('/user', userRoutes);
mongoose
  .connect('mongodb://localhost:27017/user-api')
  .then(() => app.listen(3000, () => console.log('Server is running')));
```

## Testing with Postman

Use Postman to send requests to each endpoint and verify functionality. For image upload, set `Content-Type` to `multipart/form-data` and include the image file in the request body.