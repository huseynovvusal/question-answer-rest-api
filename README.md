# Enhanced API from Udemy Course

This repository contains an enhanced version of the API developed in a [Udemy course](https://www.udemy.com/course/komple-sifirdan-web-gelistirme-kursu/?couponCode=KEEPLEARNING). Originally built in JavaScript, this project has been refactored and extended using TypeScript for improved type safety and scalability. The API features additional endpoints, improved error handling, and comprehensive documentation, making it a robust solution for real-world applications.

---

# Auth API Collection

This is a Postman collection for the Auth API endpoints.

## Base URL

Replace `{{URL}}` with the actual base URL of your API.

## Endpoints

### 1. Register

- **Method:** `POST`
- **URL:** `{{URL}}/api/auth/register`
- **Body:**
  ```json
  {
    "name": "Nijat Abasov",
    "email": "nijatabasov@gmail.com",
    "password": "nijat123"
  }
  ```

### 2. Profile

- **Method:** `GET`
- **URL:** `{{URL}}/api/auth/profile`

### 3. Login

- **Method:** `POST`
- **URL:** `{{URL}}/api/auth/login`
- **Body:**
  ```json
  {
    "email": "nijatabasov@gmail.com",
    "password": "nijat123"
  }
  ```

### 4. Logout

- **Method:** `GET`
- **URL:** `{{URL}}/api/auth/logout`

### 5. Profile Photo Upload

- **Method:** `POST`
- **URL:** `{{URL}}/api/auth/upload`
- **Body:**
  - `profile_image`: (file) `/path/to/your/profile_photo.jpeg`

### 6. Forgot Password

- **Method:** `POST`
- **URL:** `{{URL}}/api/auth/forgot-password`
- **Body:**
  ```json
  {
    "resetEmail": "nijatabasov@gmail.com"
  }
  ```

### 7. Reset Password

- **Method:** `PUT`
- **URL:** `{{URL}}/api/auth/reset-password?resetPasswordToken=57ea2e317b1218b80be5525b41f577826d1f88dcae60cfb40abb4fe252a4d87a`
- **Body:**
  ```json
  {
    "password": "123456"
  }
  ```

### 8. User Details Edit

- **Method:** `PUT`
- **URL:** `{{URL}}/api/auth/edit`
- **Body:**
  ```json
  {
      "website": "website.com", (optional)
      "title": "Software Developer", (optional)
    "place": "Azerbijan, Baku", (optional)
    "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae enim consectetur ante fringilla venenatis sed ut nulla." (optional)
  }
  ```

## Notes

- Ensure to replace `{{URL}}` with your actual API base URL.
- Update the `resetPasswordToken` in the Reset Password endpoint with the appropriate token.
- For the Profile Photo Upload endpoint, replace the file path with the correct path to your profile photo.
