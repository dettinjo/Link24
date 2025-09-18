# Project: Links

## End-point: Get All Links
# All/Search Link Route

Provides a Array of Links of the Logged-in User. Optional a search string for "url" or "slug" can be provided, this will give back all Links matching the Search (Sub-)String.

## Route:

[http://localhost:8080/links/](http://localhost:8080/auth/login)

## Request Type:

**GET**

## **Content-Type:**

**application/json**

## Request Attributes:

### Parameter:

| **Name** | **Type** |
| --- | --- |
| url | String? |
| slug | String? |

### Header:

| **Name** | **Type** |
| --- | --- |
| "token" | String! |

## Response Attributes:

| **Name** | **Type** |
| --- | --- |
| "links" | \[Link\]? |
### Method: GET
>```
>http://localhost:8080/links
>```
### Response: 200
```json
{
    "links": [
        {
            "_id": "628658fab662736522784d20",
            "user": "627d1a3263fba50211b67d41",
            "original": "https://www.google.de/",
            "slug": "google",
            "clicks": 0,
            "expiresAt": "2022-05-24T14:49:30.386Z",
            "__v": 0
        },
        {
            "_id": "62865918b662736522784d22",
            "user": "627d1a3263fba50211b67d41",
            "original": "https://www.google.de/",
            "slug": "go",
            "clicks": 0,
            "expiresAt": "2022-05-24T14:50:00.748Z",
            "__v": 0
        },
        {
            "_id": "6286591eb662736522784d24",
            "user": "627d1a3263fba50211b67d41",
            "original": "https://www.google.de/",
            "slug": "test",
            "clicks": 0,
            "expiresAt": "2022-05-24T14:50:06.034Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Link (unauthenticated)
# Create Link (Unauthenticated) Route

This Route creates a Link if the user is not Logged-in (No token set). The User need to provide a "url".

## Route:

[http://localhost:8080/links/](http://localhost:8080/auth/login)

## Request Type:

**POST**

## **Content-Type:**

**application/json**

## Request Attributes:

### Body:

| **Name** | **Type** |
| --- | --- |
| "url" | String! |

### Header:

| **Name** | **Type** |
| --- | --- |
| \- | \- |

## Response Attributes:

| **Name** | **Type** |
| --- | --- |
| \- | Link |
### Method: POST
>```
>http://localhost:8080/links/
>```
### Body (**raw**)

```json
{
    "url":"https://www.google.de/"
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 201
```json
{
    "original": "https://www.google.de/",
    "slug": "Gt_WPvWbb",
    "clicks": 0,
    "expiresAt": "2022-06-18T14:49:23.856Z",
    "_id": "628658f3b662736522784d1e",
    "__v": 0
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Link (authenticated)
# Create Link (Authenticated) Route

This Route creates a Link if the user is Logged-in (Token set). The User need to provide a "url". Optional he can set the Days until the Link expires and a custom slug.

## Route:

[http://localhost:8080/links/](http://localhost:8080/auth/login)

## Request Type:

**POST**

## **Content-Type:**

**application/json**

## Request Attributes:

### Body:

| **Name** | **Type** |
| --- | --- |
| "url" | String! |
| "slug" | String! |
| "expireDays" | Int? |

### Header:

| **Name** | **Type** |
| --- | --- |
| "token" | String! |

## Response Attributes:

| **Name** | **Type** |
| --- | --- |
| \- | Link |
### Method: POST
>```
>http://localhost:8080/links/
>```
### Body (**raw**)

```json
{
    "url":"https://www.google.de/",
    "slug": "test",
    "expireDays":5
}
```

### Response: 201
```json
{
    "user": "627d1a3263fba50211b67d41",
    "original": "https://www.google.de/",
    "slug": "google",
    "clicks": 0,
    "expiresAt": "2022-05-24T14:49:30.386Z",
    "_id": "628658fab662736522784d20",
    "__v": 0
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Link
# Update Link Route

This Route updates a Link if the user is Logged-in (Token set). The User can update the "url" or the "expireDays". If he updates the "expireDays" it will take the current Date as Base and adds the new expire Days on top.

## Route:

[http://localhost:8080/links/](http://localhost:8080/auth/login)

## Request Type:

**PUT**

## **Content-Type:**

**application/json**

## Request Attributes:

### Body:

| **Name** | **Type** |
| --- | --- |
| "url" | String? |
| "expireDays" | Int? |

### Header:

| **Name** | **Type** |
| --- | --- |
| "token" | String! |

## Response Attributes:

| **Name** | **Type** |
| --- | --- |
| \- | \- |
### Method: PATCH
>```
>http://localhost:8080/links/
>```
### Body (**raw**)

```json
{
    "id": "628658f3b662736522784d1e",
    "url": "https://www.hdm-stuttgart.de"
}
```

### Response: 200
```json
OK
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Link
# Delete Link Route

This Route deletes a Link if the user is Logged-in (Token set). The User needs to provide the "id" for the Link that needs to be deleted.

## Route:

[http://localhost:8080/links/](http://localhost:8080/auth/login)

## Request Type:

**DELETE**

## **Content-Type:**

**application/json**

## Request Attributes:

### Body:

| **Name** | **Type** |
| --- | --- |
| "id" | String! |

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
| 200 | OK |  |
### Method: DELETE
>```
>http://localhost:8080/links/
>```
### Body (**raw**)

```json
{
    "id" : "628658f3b662736522784d1e"
}
```

### Response: 200
```json
OK
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Lookup Slug
# Lookup Link Route

This Route searches the Links for the Link with the requested "slug" and redirects to the original "url" if available.

## Route:

[http://localhost:8080/links/lookup](http://localhost:8080/auth/login)

## Request Type:

**GET**

## **Content-Type:**

**application/json**

## Request Attributes:

### Parameter:

| **Name** | **Type** |
| --- | --- |
| :slug | String |

## Response:

### Status Code:

| **Code** | **Description** | **Reason** |
| --- | --- | --- |
| 200 | OK |  |
### Method: GET
>```
>http://localhost:8080/link/:slug
>```
### Body (**raw**)

```json

```

### Response: 200
```json
{
    "url": "https://www.google.de/"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
