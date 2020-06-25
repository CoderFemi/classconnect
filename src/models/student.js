const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Grade } = require('./subject')

const studentSchema = new mongoose.Schema({
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
        minlength: 3,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    class: {
        type: String,
        required: true,
        trim: true
    },
    guardian: {
        type: String,
        required: true,
        trim: true
    },
    house: {
        type: String,
        trim: true,
        default: 'No house registered'
    },
    club: {
        type: String,
        trim: true,
        default: 'Reader\'s Club'
    },
    address: {
        type: String,
        trim: true,
        default: 'No address on file.'
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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    }
}, {
    timestamps: true
})

studentSchema.virtual('grades', {
    ref: 'Grade',
    localField: '_id',
    foreignField: 'owner'
})

studentSchema.methods.generateAuthToken = async function () {
    const student = this
    const token = jwt.sign({ _id: student._id.toString() }, process.env.JWT_SECRET)

    student.tokens = student.tokens.concat({ token })
    await student.save()

    return token
}

studentSchema.methods.toJSON = function () {
    const student = this
    const studentObject = student.toObject()

    delete studentObject.password
    delete studentObject.tokens
    delete studentObject.avatar

    return studentObject
}

studentSchema.methods.defaultPassword = function () {
    const name = this.name
    let password = this.password
    const splitName = name.split(' ')
    password = splitName[1].toLowerCase() + '123'
    
    return password
}

studentSchema.statics.findByCredentials = async (email, password) => {
    const student = await Student.findOne( {email} ) 
    
    if (!student) {
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, student.password)

    if (!isMatch) {
        throw new Error('Unable to login!')
    }

    return student
}

// Hash the plain text password before saving
studentSchema.pre('save', async function (next) {
    const student = this

    if (student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 8)
    }

    next()
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student