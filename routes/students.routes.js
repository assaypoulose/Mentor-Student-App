const express = require('express');
const router = express.Router();
const Student = require('../models/Students.models');
const Mentor = require('../models/Mentor.models');

// Create a student
router.post('/', async (req, res) => {
    try {
    const newStudent = new Student(req.body);
    const student = await newStudent.save();
    res.json(student);
    } catch (err) {
    res.status(500).send('Server error');
    }
});

// Assign or change a mentor for a student
router.put('/:studentId/mentor', async (req, res) => {
    try {
    const student = await Student.findById(req.params.studentId);
    student.mentor = req.body.mentorId;
    await student.save();
    res.json(student);
    } catch (err) {
    res.status(500).send('Server error');
    }
});

// Show previously assigned mentor for a student
router.get('/:studentId/mentor', async (req, res) => {
    try {
    const student = await Student.findById(req.params.studentId).populate('mentor');
    res.json(student.mentor);
    } catch (err) {
    res.status(500).send('Server error');
    }
});

module.exports = router;
