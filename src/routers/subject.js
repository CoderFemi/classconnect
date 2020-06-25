const express = require('express')
const mongoose = require('mongoose')
const { Subject, Grade } = require('../models/subject')
const Student = require('../models/student')
const router = new express.Router()
const { studentAuth, teacherAuth } = require('../middleware/auth')

router.post('/subjects', teacherAuth, async (req, res) => {
    const subject = new Subject({
        title: req.body.title,
        owner: req.teacher._id
    })

    try { 
        await subject.save()
        res.status(201).send(subject)
    } catch (e) {
        res.status(400).send(e)
    } 
})


router.get('/subjects', teacherAuth, async (req, res) => {
    
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.teacher.populate({ 
            path: 'subjects',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    title: 1
                }
            }
        }).execPopulate()
        res.send(req.teacher.subjects)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/subjects/:id', teacherAuth, async (req, res) => {
    const _id = req.params.id
    try {
        const subject = await Subject.findOne({ _id, owner: req.teacher._id })
        if (!subject) {
            return res.status(404).send()
        }
        res.send(subject)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/subjects/:id', teacherAuth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['title']
    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidUpdate) {
        res.status(404).send({ 'error': 'Not a valid update!' })
    }

    try {

        const subject = await Subject.findOne({ _id: req.params.id, owner: req.teacher._id })

        if (!subject) {
            return res.status(404).send()
        }

        subject.title = req.body.title
        await subject.save()
        res.send(subject)
    } catch (e) {
        res.status(400).send(e)
    }
})



router.delete('/subjects/:id', teacherAuth, async (req, res) => {
    try {
        const subject = await Subject.findOneAndDelete({ _id: req.params.id, owner: req.teacher._id })

        if (!subject) {
            res.status(404).send()
        }

        res.send('Subject deleted successfully!')

    } catch (e) {
        res.status(500).send()
    }
})



router.post('/subjects/grades/:id', teacherAuth, async (req, res) => {

    try {

        const subject = await Subject.findOne({ _id: req.params.id, owner: req.teacher._id })
        const student = await Student.findOne({ _id: req.body.owner })
        const studentGrade = subject.grades.find((grade) => grade.year === req.body.year && grade.term === req.body.term.toLowerCase() && grade.owner.toString() === req.body.owner)
    
        if (subject.length === 0) {
            return res.status(404).send("Subject not found!")
           
        }

        if (student.owner.toString() !== req.teacher._id.toString()) {
            return res.status(404).send("You cannot post to another teacher\'s student!")
        }
        
        if (studentGrade) {  
            return res.status(404).send(`A ${req.body.term.toLowerCase()} term score exists for this student!`)
    
        } else {
            const newGrade = new Grade({
                year: req.body.year,
                term: req.body.term,
                score: req.body.score,
                owner: mongoose.Types.ObjectId(req.body.owner)
            })
            
            const letterGrade = await newGrade.calculateGrade()
            newGrade.grade = letterGrade
            subject.grades.push(newGrade)
            await subject.save()
            res.send(newGrade)
        }

    } catch (e) {
        res.status(400).send(e)
    }
    
})


router.patch('/subjects/grades/:id', teacherAuth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['gradeId', 'score']
    const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidUpdate) {
        res.status(404).send({ 'error': 'Not a valid update!' })
    }

    try {

        const subject = await Subject.findOne({ _id: req.params.id, owner: req.teacher._id })
        //const students = await Student.find({ owner: req.teacher._id })
        const studentGrade = await subject.grades.find((grade) => grade._id.toString() === req.body.gradeId)
        const student = await Student.findOne({ _id: studentGrade.owner })
        //const student = await Student.findOne({ owner: studentGrade.owner, owner: req.teacher._id })
        
        //const validStudent = students.filter((student) => student._id.toString() === studentGrade.owner.toString())

        if (Object.keys(subject).length === 0) {
            return res.status(404).send("Subject not found!")
        }

        if (student.owner.toString() !== req.teacher._id.toString()) {
            return res.status(404).send("You cannot post to another teacher\'s student!")
        }

        if (Object.keys(studentGrade).length === 0) {    
            return res.status(404).send('Score does not exist!')

        } else {
            studentGrade.score = req.body.score
            const letterGrade = await studentGrade.calculateGrade()
            studentGrade.grade = letterGrade
            await subject.save()
            res.send(studentGrade)
        }

    } catch (e) {

        res.status(400).send(e)
    }
 })


router.get('/subjects/grades/me', studentAuth, async (req, res) => {


    try {
        
        const subjects = await Subject.find({ owner: req.body.teacher })

        const myGrades = subjects.map((subject) => {
             
            const subjectObj = {}
            const myGrade = subject.grades.filter((grade) => grade.owner.toString() === req.body.owner)
            subjectObj.subject = subject.title
            subjectObj.grades = myGrade
            return subjectObj
        })

        res.send(myGrades)
    } catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router