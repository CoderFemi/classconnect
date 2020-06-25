const express = require('express')
const Teacher = require('../models/teacher')
const { teacherAuth } = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendExitEmail } = require('../emails/account')

router.post('/teachers', async (req, res) => {
    const teacher = new Teacher(req.body)

    try {
        await teacher.save()
        sendWelcomeEmail(teacher.email, teacher.name)
        const token = await teacher.generateAuthToken()
        res.status(201).send({teacher, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/teachers/login', async (req, res) => {
    try {
        const teacher = await Teacher.findByCredentials(req.body.email, req.body.password)
        const token = await teacher.generateAuthToken()
        res.send({ teacher, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/teachers/logout', teacherAuth, async (req, res) => {
    try {
        req.teacher.tokens = req.teacher.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.teacher.save()

        res.send('You have been logged out.')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/teachers/logoutAll', teacherAuth, async (req, res) => {
    try {
        req.teacher.tokens = []
        await req.teacher.save()
        res.send('User Logged Out Successfully from All Sessions')
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/teachers/me', teacherAuth, async (req, res) => {
    res.send(req.teacher)
})

router.patch('/teachers/me', teacherAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age', 'class', 'house', 'address']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }

    try {
        const teacher = req.teacher

        updates.forEach((update) => teacher[update] = req.body[update])

        await teacher.save()

        if (!teacher) {
            return res.status(404).send()
        }

        res.send(teacher)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/teachers/me', teacherAuth, async (req, res) => {
    try {
        await req.teacher.remove()
        sendExitEmail(req.teacher.email, req.teacher.name)
        res.send('Teacher deleted successfully!')

    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File format allowed is jpg, jpeg or png.'))
        }

        cb(undefined, true)
    }
})

router.post('/teachers/me/avatar', teacherAuth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.teacher.avatar = buffer
    await req.teacher.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/teachers/me/avatar', teacherAuth, async (req, res) => {
    try {
        req.teacher.avatar = undefined
        await req.teacher.save()
        res.send('Avatar removed successfully!')
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/teachers/:id/avatar', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id)

        if (!teacher || !teacher.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(teacher.avatar)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router