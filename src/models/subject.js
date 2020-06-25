const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
        trim: true
    },
    term: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    score: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Score must be a positive number')
            }
        }
    },
    grade: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    }
}, {
    timestamps: true
})

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    grades: [gradeSchema],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    }
}, {
    timestamps: true
})

gradeSchema.methods.calculateGrade = async function () {

    let grade = this.grade
    const score = this.score

    if (score < 50) {
        grade = 'F'
    } else if (score < 60) {
        grade = 'E'
    } else if (score < 70) {
        grade = 'D'
    } else if (score < 80) {
        grade = 'C'
    } else if (score < 90) {
        grade = 'B'
    } else {
        grade = 'A'
    }

    return grade
}

const Subject = mongoose.model('Subject', subjectSchema)
const Grade = mongoose.model('Grade', gradeSchema)

module.exports = { Subject, Grade }