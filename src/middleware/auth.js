const jwt = require('jsonwebtoken')
const Teacher = require('../models/teacher')
const Student = require('../models/student')

const teacherAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const teacher = await Teacher.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!teacher) {
            throw new Error()
        }

        req.token = token
        req.teacher = teacher
        next()

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

const studentAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const student = await Student.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!student) {
            throw new Error()
        }

        req.token = token
        req.student = student
        next()

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = { teacherAuth, studentAuth }