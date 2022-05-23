require("dotenv").config();
import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "./middleware/auth";
const app = express();
app.use(express.json());

const users = [
    {
        id: 1,
        username: "Phong",
    },
    {
        id: 2,
        username: "Sol",
    },
];

const notes = [
    {
        userId: 1,
        note: 'note A of Phong'
    },
    {
        userId: 2,
        note: 'note of Sol'
    },
    {
        userId: 1,
        note: 'note B of Phong'
    }
];


app.get("/greeting/", (req, res) => {
    res.send('Hello world from greeting route');
});


app.get("/users", verifyToken, (req, res) => {
    // res.json({ posts: "my posts" });
    console.log(req.body.id);
    res.json(notes.filter(note => note.userId === 1));
    // res.json(notes.filter(note => note.userId === req.id));
});


app.patch("/login", (req, res) => {
    const user = users.find((user) => user.username === req.body.username);
    console.log(user);

    if (!user) {
        // return res.sendStatus(401);
        return res.status(401).send(false);
    }

    const tokenDuration = {
        expiresIn: 1800     // token lives in 1800 seconds
    }

    // Create JWT
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, tokenDuration);
    res.json({ accessToken });
});


const PORT = process.env.PORT_jwtauth || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));