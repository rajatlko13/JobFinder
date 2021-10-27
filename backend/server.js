const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const recruiterRoutes = require('./routes/recruiterRoutes');
const userRoutes = require('./routes/userRoutes');
const jobsRoutes = require('./routes/jobsRoutes');

// establishing DB connection
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const con = mongoose.connection

con.on('open', () => {
    console.log("DB Connection successful...");
})

con.on('error', () => {
    console.log("DB connection failed...");
})

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT,() => {
    console.log('Listening on Port',process.env.PORT);
});

// listing the routes
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobsRoutes);
