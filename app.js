// app.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Render the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { email, query } = req.body;

    // Create transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        // Your SMTP configuration
        service: 'Gmail',  
        auth: {
            user: 'mayanksharmapandat1770@gmail.com', // Your Gmail email address
            pass: 'xtgy wels xkhh jklg' // Your Gmail password
        }
    });

    // Setup email data
    let mailOptions = {
        from: 'mayanksharmapandat1770@gmail.com', // Sender address
        to: 'mayanksharmapandat1770@gmail.com', // Receiver address
        subject: 'Query from Website', // Subject line
        text: `You received a query from: ${email}\n\nQuery Details:\n${query}` // Plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Failed to submit your query. Please try again later.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Your query has been submitted successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
