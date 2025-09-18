# Project: Authentication

## End-point: Register
# Create User

This Route creates a User with a email and password provided.

## Route:

[http://localhost:8080/auth/signup](http://localhost:8080/auth/login)

## Request Type:

**POST**

## **Content-Type:**

**application/json**

## Request Attributes:

### Body:

| **Name** | **Type** |
| --- | --- |
| "email" | String! |
| "password" | String! |

### Header:

| **Name** | **Type** |
| --- | --- |
| \- | \- |

## Response:

### Attributes:

| **Name** | **Type** |
| --- | --- |
| \- | \- |

### Status Code:

| **Code** | **Description** | **Reason** |
| --- | --- | --- |
| 201 | Created | Successfully Created |
| 409 | Conflict | Email already exists |
### Method: POST
>```
>http://localhost:8080/auth/signup
>```
### Body (**raw**)

```json
{
    "email":"mwa@hdm-stuttgart.de",
    "password":"Mwa123456"
}
```

### Response: 201
```json
Created
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login
# Login Route

## Route:

[**http://localhost:8080/auth/login**](http://localhost:8080/auth/login)

## Request Type:

**POST**

## **Content-Type:**

**application/json**

## Request Attributes:

### Body:

"email": String!

"password": String!

## Response Attributes:

"token": String!
### Method: POST
>```
>http://localhost:8080/auth/login
>```
### Body (**raw**)

```json
{
    "email":"mwa@hdm-stuttgart.de",
    "password":"Mwa123456"
}
```

### Response: 200
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mjg2NTdhM2I2NjI3MzY1MjI3ODRkMWIiLCJpYXQiOjE2NTI5NzE1NzUsImV4cCI6MTY1MzA1Nzk3NX0.ynExloWT2GSWXc0iMPW7xaBXU5kNZSpdcr6Vd0jaa0E"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Check Token
### Method: GET
>```
>http://localhost:8080/auth/check
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
