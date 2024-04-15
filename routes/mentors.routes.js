const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor.models');
const Student = require('../models/Students.models');

// Create a mentor
router.post('/', async (req, res) => {
    try {
    const newMentor = new Mentor(req.body);
    const mentor = await newMentor.save();
    res.json(mentor);
    } catch (err) {
    res.status(500).send('Server error');
    }
});

// Assign multiple students to a mentor
router.put('/:mentorId/assign', async (req, res) => {
    try {
    const mentor = await Mentor.findById(req.params.mentorId);
    mentor.students.push(...req.body.studentIds);
    await mentor.save();
    await Student.updateMany({_id: {$in: req.body.studentIds}}, {$set: {mentor: req.params.mentorId}});
    res.json(mentor);
    } catch (err) {
    res.status(500).send('Server error');
    }
});

// Show all students for a mentor
router.get('/:mentorId/students', async (req, res) => {
    try {
    const students = await Student.find({ mentor: req.params.mentorId });
    res.json(students);
    } catch (err) {
    res.status(500).send('Server error');
    }
});

module.exports = router;
