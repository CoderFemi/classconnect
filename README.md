# ClassConnect REST API Documentation

The task manager API is available at https://femi-task-manager.herokuapp.com/


# USER MODEL

The following requests pertain to manipulating the user resource.

## Create user

### Request

`POST /users`

    curl -i -H 'Accept: application/json' -d 'name=SamSmith&email=smith@hello.com&password='sam123$' https://femi-task-manager.herokuapp.com/users

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 348

    {"user":{"age":0,"_id":"5ee649619e3b4a001720a4b3","name":"Sam Smith","email":"smith@hello.com","createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T15:59:29.863Z","__v":1},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ6"}


## Login user

### Request

`POST /users/login`

    curl -i -H 'Accept: application/json' -d 'email=smith@hello.com&password='sam123$' https://femi-task-manager.herokuapp.com/users

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 348

    {"user":{"age":0,"_id":"5ee649619e3b4a001720a4b3","name":"Sam Smith","email":"smith@hello.com","createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T15:59:29.863Z","__v":1},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ6"}


## Read user profile

### Request

`GET /users/me`

    curl -i -H 'Accept: application/json' -d 'email=smith@hello.com&password='sam123$' https://femi-task-manager.herokuapp.com/users/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 348

    {"age":0,"_id":"5ee649619e3b4a001720a4b3","name":"Sam Smith","email":"smith@hello.com","createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T18:47:51.411Z","__v":3}

## Update user

### Request

`PATCH /users/me`

    curl -i -H 'Accept: application/json' -d 'age=32' https://femi-task-manager.herokuapp.com/users/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"age":32,"_id":"5ee649619e3b4a001720a4b3","name":"Sam Smith","email":"smith@hello.com","createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T18:47:51.411Z","__v":3}


## Logout user

### Request

`POST /users/logout`

    curl -i -H 'Accept: application/json' -d https://femi-task-manager.herokuapp.com/users/logout

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 0


## Logout all

### Request

`POST /users/logoutAll`

    curl -i -H 'Accept: application/json' -d https://femi-task-manager.herokuapp.com/users/logoutAll

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 0


## Delete user

### Request

`DELETE /users/me`

    curl -i -H 'Accept: application/json' -X DELETE https://femi-task-manager.herokuapp.com/users/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close



# TASK MODEL

The following requests pertain to manipulating the task resource.

## Create task

### Request

`POST /tasks`

    curl -i -H 'Accept: application/json' -d 'description="Go Shopping' https://femi-task-manager.herokuapp.com/tasks

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 203

    {"completed":false,"_id":"5ee671235f9ccc00173ddb37","description":"Go shopping","owner":"5ee649619e3b4a001720a4b3","createdAt":"2020-06-14T18:49:07.917Z","updatedAt":"2020-06-14T18:49:07.917Z","__v":0}


## Read task

### Request

`GET /task/:id`

    curl -i -H 'Accept: application/json' -d '_id=524885224fef5a5' https://femi-task-manager.herokuapp.com/tasks/:id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 203

    {"completed":false,"_id":"5ee671235f9ccc00173ddb37","description":"Go shopping","owner":"5ee649619e3b4a001720a4b3","createdAt":"2020-06-14T18:49:07.917Z","updatedAt":"2020-06-14T18:49:07.917Z","__v":0}


## Read tasks

### Request

`GET /tasks

    curl -i -H 'Accept: application/json' -d https://femi-task-manager.herokuapp.com/tasks

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 203

    {"completed":false,"_id":"5ee671235f9ccc00173ddb37","description":"Go shopping","owner":"5ee649619e3b4a001720a4b3","createdAt":"2020-06-14T18:49:07.917Z","updatedAt":"2020-06-14T18:49:07.917Z","__v":0}


## Update task

### Request

`PATCH /task/:id`

    curl -i -H 'Accept: application/json' -d 'completed=true' https://femi-task-manager.herokuapp.com/tasks/:id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 203

    {"completed":true,"_id":"5ee671235f9ccc00173ddb37","description":"Go shopping","owner":"5ee649619e3b4a001720a4b3","createdAt":"2020-06-14T18:49:07.917Z","updatedAt":"2020-06-14T18:49:07.917Z","__v":0}



## Delete task

### Request

`DELETE /tasks/:id`

    curl -i -H 'Accept: application/json' -X DELETE https://femi-task-manager.herokuapp.com/tasks/:id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close