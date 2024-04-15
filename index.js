require('dotenv').config();
const express = require('express');

const db = require('./DB/connect');

const app = express();
db();

app.use(express.json());

app.get('/',(req, res)=>{
    res.status(200).send('Welcome to my Mentor-Student Application')
})

// Define routes
app.use('/api/mentors', require('./routes/mentors.routes'));
app.use('/api/students', require('./routes/students.routes'));


const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`App is running on PORT ${PORT}`);
}); 