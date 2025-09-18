# Project: User

## End-point: Update User
# Update User

This Route updates a User with a "newEmail" or "newPassword" provided.

## Route:

[http://localhost:8080/user/](http://localhost:8080/auth/login)

## Request Type:

**PATCH**

## **Content-Type:**

**application/json**

## Request Attributes:

### Body:

| **Name** | **Type** |
| --- | --- |
| "newEmail" | String? |
| "newPassword" | String? |

### Header:

| **Name** | **Type** |
| --- | --- |
| "token" | String! |

## Response:

### Attributes:

| **Name** | **Type** |
| --- | --- |
| \- | \- |

### Status Code:

| **Code** | **Description** | **Reason** |
| --- | --- | --- |
| 200 | OK | Successfully Updated |
| 400 | Bad Request | UserId and newPassword or newEmail not provided |
### Method: PATCH
>```
>http://localhost:8080/user/
>```
### Headers

|Content-Type|Value|
|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2Mjc5MjVjYzE5NDQyNGQ0YTY4YmRmZTUiLCJpYXQiOjE2NTIxMDY3MDYsImV4cCI6MTY1MjE5MzEwNn0.Rx3MiJlVXty609uTzZuuYj9Hys8jSpw-szl60OB0Mzo|


### Body (**raw**)

```json
{
    "email": "mwa@gmail.com"
}
```

### Response: 200
```json
OK
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete User
# Delete User

This Route deletes the currently Logged-in User based on his UserId that is provided trough the Header "token".

## Route:

[http://localhost:8080/user/](http://localhost:8080/auth/login)

## Request Type:

**DELETE**

## **Content-Type:**

**application/json**

## Request Attributes:

### Body:

| **Name** | **Type** |
| --- | --- |
| \- | \- |

### Header:

| **Name** | **Type** |
| --- | --- |
| "token" | String! |

## Response:

### Attributes:

| **Name** | **Type** |
| --- | --- |
| \- | \- |

### Status Code:

| **Code** | **Description** | **Reason** |
| --- | --- | --- |
| 200 | OK | Successfully Deleted. |
| 400 | Bad Request | UserId not provided |
### Method: DELETE
>```
>http://localhost:8080/user/
>```
### Headers

|Content-Type|Value|
|---|---|
|token|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2Mjc5MjVjYzE5NDQyNGQ0YTY4YmRmZTUiLCJpYXQiOjE2NTIxMDgzNjQsImV4cCI6MTY1MjE5NDc2NH0.3EOIehxJhFgrkVUvlzKxqbrcieX3an_j43bAw8qhF_k|


### Body (**raw**)

```json

```

### Response: 200
```json
OK
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
