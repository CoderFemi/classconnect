const express = require('express')
require('./db/mongoose')
const Teacher = require('./models/teacher')
const teacherRouter = require('./routers/teacher')
const studentRouter = require('./routers/student')
const subjectRouter = require('./routers/subject')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(teacherRouter)
app.use(studentRouter)
app.use(subjectRouter)

module.exports = app