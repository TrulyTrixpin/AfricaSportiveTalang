// server.js
import express from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer"; 
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Required to use --dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5500;

//.Middleware
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); //your HTML files

// Temporary Storage For registered users
let users = [];

//-----------------REGISTER-------------------
app.post("/register", (req, res) => {
    const { name, email } = req.body;

    // check if user exist
    if(users.find(u => u.email === email))
        return res.status(400).json({message:"Email already Registered."});
    
    users.push({ name, email });
    res.cookie("userName", name, {maxAge:900000, httpOnly: true});
    res.json({ message: 'Welcome, ${name}! You are registered.'});
});   

//-----------------ContactForm-----------------
app.post("contact", async (req, res) => {
const { name, email, message } = req.body;

    //Send automatic response using Nodeemailer
    const transporter = nodemailer.createTransport({
        service: "gmail" ,
        auth: {
            user: "yourwebsiteemail@gmail.com", //Replace
            pass: "your-app-password", //Use App password not your Gmail password
        },
    });

    const mailOptions = {
        from: "Yourwebsiteemail@gmail.com",
        to: "email",
        subject: "Thank you for contacting Africa Sportive Talang!",
        text: 'Hi ${name},\n\nWe received your message:\n"${meesgae}"\n\We will get back to you shortly.\n\nBest,/nAfrica Sportive Talang Team',
    };

    try {
        // Some Logic here
        await transporter.sendMail(mailOptions);
        res.json({ message: "Message sent successfully! Auto-reply deliverd."});
    }   catch (err) {
        res.status(500).json({ message: "Failed to send message.", error: err});
    }
});
    
    //----------------------HOMEPAGE---------------------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log('Server running at http://127.0.0.1:5500/');
});

// ---------COOKIE FOR RETURNING USER------------
// document.addEventListener("DOMContentLoaded", () => {
//     const name = getCookie("userName");
//         if(name) {
//             alert('Welcome bcak, ${name}!');
//         }
// });

function getCookie(name) {
    const value = '; ${document.cookie}';
    const parts = value.split('; ${name}=');
    if (parts.length ===2) return parts.pop().split(";").shift();
}