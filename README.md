# ClassConnect REST API Documentation

The task manager API is available at https://femi-classconnect.herokuapp.com


# TEACHER MODEL

The following requests pertain to manipulating the teacher resource.

## Create teacher

### Request

`POST /teachers`

    curl -i -H 'Accept: application/json' -d 'name=SamSmith&email=smith@hello.com&password='sam123&class=year9' https://femi-classconnect.herokuapp.com/teachers

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 348

    {"teacher":{"designation":"Class Teacher","age":0,"_id":"5ee649619e3b4a001720a4b3","name":"Sam Smith","email":"smith@hello.com","class": "Year 5 Rose","createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T15:59:29.863Z","__v":1},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ6"}


## Login teacher

### Request

`POST /teachers/login`

    curl -i -H 'Accept: application/json' -d 'email=smith@hello.com&password='sam123$' https://femi-classconnect.herokuapp.com/teachers/login

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 348

    {"teacher":{"designation":"Class Teacher","age":0,"_id":"5ee649619e3b4a001720a4b3","name":"Sam Smith","email":"smith@hello.com","class": "Year 5 Rose","createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T15:59:29.863Z","__v":1},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ6"}


## Read teacher profile

### Request

`GET /teachers/me`

    curl -i -H 'Accept: application/json' -d https://femi-classconnect.herokuapp.com/teachers/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 348

    {"teacher":{"designation":"Class Teacher","age":0,"_id":"5ee649619e3b4a001720a4b3","name":"Sam Smith","email":"smith@hello.com","class": "Year 5 Rose","createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T15:59:29.863Z","__v":1}}

## Update teacher

### Request

`PATCH /teachers/me`

    curl -i -H 'Accept: application/json' -d 'age=32' https://femi-classconnect.herokuapp.com/teachers/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"age":32,"_id":"5ee649619e3b4a001720a4b3","name":"Sam Smith","email":"smith@hello.com","createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T18:47:51.411Z","__v":3}


## Logout teacher

### Request

`POST /users/teacher`

    curl -i -H 'Accept: application/json' -d https://femi-classconnect.herokuapp.com/teachers/logout

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 0


## Logout all

### Request

`POST /teachers/logoutAll`

    curl -i -H 'Accept: application/json' -d https://femi-classconnect.herokuapp.com/teachers/logoutAll

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 0


## Delete teacher

### Request

`DELETE /teachers/me`

    curl -i -H 'Accept: application/json' -X DELETE https://femi-classconnect.herokuapp.com/teachers/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close



# STUDENT MODEL

The following requests pertain to manipulating the student resource.

## Create student

### Request

`POST /students`

    curl -i -H 'Accept: application/json' -d 'name=JonSnow&email=jon@hello.com&password='jon123&class=year9&guardian="MichaelSnow' https://femi-classconnect.herokuapp.com/students

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 348

    {"student":{"age":0,"_id":"5ee649619e3b4a001720a4b3","name":"Jon Snow","email":"jon@hello.com","class": "Year 9", "guardian": "Michael Snow",createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T15:59:29.863Z","__v":1},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ6"}


## Read student

### Request

`GET /students/:id`

    curl -i -H 'Accept: application/json' -d '_id=524885224fef5a5' https://femi-classconnect.herokuapp.com/students

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 203

    {"student":{"age":0,"_id":"5ee649619e3b4a001720a4b3","name":"Jon Snow","email":"jon@hello.com","class": "Year 9", "guardian": "Michael Snow",createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T15:59:29.863Z","__v":1}}

## Read students

### Request

`GET /students

    curl -i -H 'Accept: application/json' -d https://femi-classconnect.herokuapp.com/students

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 203

    {"student":{"age":0,"_id":"5ee649619e3b4a001720a4b3","name":"Jon Snow","email":"jon@hello.com","class": "Year 9", "guardian": "Michael Snow",createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T15:59:29.863Z","__v":1}}


## Update student

### Request

`PATCH /students/:id`

    curl -i -H 'Accept: application/json' -d 'age=16' https://femi-classconnect.herokuapp.com/students/:id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 203

    {"student":{"age":16,"_id":"5ee649619e3b4a001720a4b3","name":"Jon Snow","email":"jon@hello.com","class": "Year 9", "guardian": "Michael Snow",createdAt":"2020-06-14T15:59:29.750Z","updatedAt":"2020-06-14T15:59:29.863Z","__v":1}}



## Delete student

### Request

`DELETE /students/:id`

    curl -i -H 'Accept: application/json' -X DELETE https://femi-classconnect.herokuapp.com/students/:id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close




# SUBJECT/GRADES MODELS

The following requests pertain to manipulating the subject/grades resource.

## Create subject

### Request

`POST /subjects`

    curl -i -H 'Accept: application/json' -d 'title=Mathematics' https://femi-classconnect.herokuapp.com/subjects

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 348

    {"_id":"5ef4d8046121de001761b9dd","title":"Mathematics","owner":"5ef216dc3b9a9d259c6f157c","grades":[],"createdAt":"2020-06-25T16:59:48.537Z","updatedAt":"2020-06-25T16:59:48.537Z","__v":0}


## Read subject

### Request

`GET /subjects/:id`

    curl -i -H 'Accept: application/json' -d '_id=524885224fef5a5' https://femi-classconnect.herokuapp.com/subjects

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 203

    {"_id":"5ef4d8046121de001761b9dd","title":"Mathematics","owner":"5ef216dc3b9a9d259c6f157c","grades":[],"createdAt":"2020-06-25T16:59:48.537Z","updatedAt":"2020-06-25T16:59:48.537Z","__v":0}

## Read subjects

### Request

`GET /subjects

    curl -i -H 'Accept: application/json' -d https://femi-classconnect.herokuapp.com/subjects

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 203

    {"_id":"5ef4d8046121de001761b9dd","title":"Mathematics","owner":"5ef216dc3b9a9d259c6f157c","grades":[],"createdAt":"2020-06-25T16:59:48.537Z","updatedAt":"2020-06-25T16:59:48.537Z","__v":0}


## Update subject

### Request

`PATCH /subjects/:id`

    curl -i -H 'Accept: application/json' -d 'title=Further Mathematics' https://femi-classconnect.herokuapp.com/subjects/:id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 203

    {"_id":"5ef4d8046121de001761b9dd","title":"Further Mathematics","owner":"5ef216dc3b9a9d259c6f157c","grades":[],"createdAt":"2020-06-25T16:59:48.537Z","updatedAt":"2020-06-25T16:59:48.537Z","__v":0}



## Delete subject

### Request

`DELETE /subjects/:id`

    curl -i -H 'Accept: application/json' -X DELETE https://femi-classconnect.herokuapp.com/subjects/:id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close


## Create subject grade

### Request

`POST /subjects/grades`

    curl -i -H 'Accept: application/json' -d 'year=2020&term=first&score=86&owner=5eee2ffa0b1b7d320cac2940' https://femi-classconnect.herokuapp.com/subjects/grades

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 348

    {"_id":"5ef4da966121de001761b9de","year":"2020","term":"first","score":86,"owner":"5ef217f83b9a9d259c6f157f","grade":"B"}


## Update subject grade

### Request

`PATCH /subjects/grades/:id`

    curl -i -H 'Accept: application/json' -d 'gradeId=5ef4da966121de001761b9de&score=98' https://femi-classconnect.herokuapp.com/subjects/grades/:id

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 203

    {"_id":"5ef4da966121de001761b9de","year":"2020","term":"first","score":98,"owner":"5ef217f83b9a9d259c6f157f","grade":"A","createdAt":"2020-06-25T17:10:46.079Z","updatedAt":"2020-06-25T17:13:54.959Z"}


## Read subject grades

### Request

`GET /subjects/grades/me`

    curl -i -H 'Accept: application/json' -d 'owner=524885224fef5a5&teacher=5ef216dc3b9a9d259c6f157c' https://femi-classconnect.herokuapp.com/subjects/grades/me

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Location:
    Content-Length: 203

    [{"subject":"Further Mathematics","grades":[{"_id":"5ef21a763b9a9d259c6f1585","year":"2020","term":"first","score":98,"owner":"5ef218453b9a9d259c6f1581","grade":"A","createdAt":"2020-06-23T15:06:30.516Z","updatedAt":"2020-06-25T15:36:28.931Z"},{"_id":"5ef21a803b9a9d259c6f1587","year":"2020","term":"second","score":58,"owner":"5ef218453b9a9d259c6f1581","grade":"E","createdAt":"2020-06-23T15:06:40.704Z","updatedAt":"2020-06-25T15:01:53.097Z"},{"_id":"5ef21a873b9a9d259c6f1589","year":"2020","term":"third","score":86,"owner":"5ef218453b9a9d259c6f1581","grade":"B","createdAt":"2020-06-23T15:06:47.624Z","updatedAt":"2020-06-23T15:06:47.624Z"}]}]
