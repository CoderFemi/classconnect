const express = require('express')
const Student = require('../models/student')
const router = new express.Router()
const { teacherAuth, studentAuth } = require('../middleware/auth')

router.post('/students', teacherAuth, async (req, res) => {
    const student = new Student({
        ...req.body,
        owner: req.teacher._id
    })
    try {
        const password = await student.defaultPassword()
        student.password = password
        await student.save()
        //sendWelcomeEmail(student.email, student.name)
        const token = await student.generateAuthToken()
        
        res.status(201).send({student, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/students/login', async (req, res) => {
    try {
        const student = await Student.findByCredentials(req.body.email, req.body.password)
        const token = await student.generateAuthToken()
        res.send({ student, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=false
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc


router.post('/students/logout', studentAuth, async (req, res) => {
    try {
        req.student.tokens = req.student.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.student.save()

        res.send('You have been logged out.')
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/students', teacherAuth, async (req, res) => {
    
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.teacher.populate({ 
            path: 'students',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    name: 1
                }
            }
        }).execPopulate()
        res.send(req.teacher.students)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/students/:id', teacherAuth, async (req, res) => {
    const _id = req.params.id
    try {
        const student = await Student.findOne({ _id, owner: req.teacher._id })
        if (!student) {
            return res.status(404).send()
        }
        res.send(student)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/students/:id', teacherAuth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age', 'class', 'house', 'address', 'guardian']
    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidUpdate) {
        res.status(404).send({ 'error': 'Not a valid update!' })
    }

    try {

        const student = await Student.findOne({ _id: req.params.id, owner: req.teacher._id })

        if (!student) {
            return res.status(404).send()
        }

        updates.forEach((update) => student[update] = req.body[update])
        await student.save()
        res.send(student)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/students/:id', teacherAuth, async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ _id: req.params.id, owner: req.teacher._id })

        if (!student) {
            res.status(404).send()
        }

        res.send('Student deleted successfully!')

    } catch (e) {
        res.status(500).send
    }
})

module.exports = router