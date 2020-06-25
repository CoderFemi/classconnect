const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Student = require('./student')
const { Subject } = require('./subject')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('pass')) {
                throw new Error('Password cannot contain "pass"')
            }
        }
    },
    class: {
        type: String,
        required: true,
        trim: true
    },
    house: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true,
        default: 'Class Teacher'
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

teacherSchema.virtual('students', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'owner'
})

teacherSchema.virtual('subjects', {
    ref: 'Subject',
    localField: '_id',
    foreignField: 'owner'
})

teacherSchema.methods.generateAuthToken = async function () {
    const teacher = this
    const token = jwt.sign({ _id: teacher._id.toString() }, process.env.JWT_SECRET)

    teacher.tokens = teacher.tokens.concat({ token })
    await teacher.save()

    return token
}

teacherSchema.methods.toJSON = function () {
    const teacher = this
    const teacherObject = teacher.toObject()

    delete teacherObject.password
    delete teacherObject.tokens
    delete teacherObject.avatar

    return teacherObject
}

teacherSchema.statics.findByCredentials = async (email, password) => {
    const teacher = await Teacher.findOne( {email} ) 
    
    if (!teacher) {
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, teacher.password)

    if (!isMatch) {
        throw new Error('Unable to login!')
    }

    return teacher
}

// Hash the plain text password before saving
teacherSchema.pre('save', async function (next) {
    const teacher = this

    if (teacher.isModified('password')) {
        teacher.password = await bcrypt.hash(teacher.password, 8)
    }

    next()
})

//Delete students when teacher is removed
teacherSchema.pre('remove', async function (next) {
    const teacher = this
    await Student.deleteMany({ owner: user._id })
    next()
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher