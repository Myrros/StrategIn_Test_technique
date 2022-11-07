const bcrypt = require("bcrypt");
const User = require('../user_model');
const jwt = require("jsonwebtoken");
const e = require("express");

// This is the logic for our 'register' endpoint.
const register = ((req, res, next) => {
    console.log("An user tries to register:");
    console.log(req.body.email);

    // We hash the password as to not store it in blank.
    bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {

        // We create the user with the data sent by the client.
        const user = new User({
            email: req.body.email,
            password: hashedPassword
        });

        // We save the new user in the database.
        user.save()

        // We return success if everything went well.
        .then((result) => {
            console.log("User created successfully");
            res.status(201).send({
                message: "User Created Successfully",
                result
            });
        })
        // We catch the error if the user couldn't be added to the database.
        .catch((e) => {
            console.log("Error creating user");
            res.status(500).send({
                message: "Error creating user",
                e
            });
        });
    })

    // We catch the error if the password could not be hashed.
    .catch((e) => {
        console.log("Password was not hashed successfully.");
        res.status(500).send({
            message: "Password was not hashed successfully.",
            e,
        });
    });
});

// This is the logic for our 'login' endpoint.
const login = ((req, res, next) => {
    console.log("An user tries to log in:");
    console.log(req.body.email);

    // We fetch the user credentials from the database.
    User.findOne({email: req.body.email})
    .then((user) => {

        // We compare the hash of the password sent by the client with the one stored in the database.
        bcrypt.compare(req.body.password, user.password)
        .then((passwordCheck) => {

            // If they do not match, we return an error message.
            if (!passwordCheck) {
                console.log("Passwords do not match.");
                return res.status(400).send({
                    message: "Passwords do not match.",
                    e
                });
            }
            // If they do match, we create a connexion token.
            // THe function takes a known string and the user ID, as well as time informations, and hash them into the token.
            const token = jwt.sign(
                {
                    userId: user._id,
                    userEmail: user.email,
                },
                "STRATEGIN",
                {expiresIn: "24h"}
            );
            
            // We send the token back to the client.
            console.log("User could log in succesfully.");
            res.status(200).send({
                message: "Login Successful.",
                email: user.email,
                token
            });
        })

        // If the passwords do not match, we return an error message.
        .catch((e) => {
            console.log("Passwords do not match.");
            res.status(400).send({
                message: "Passwords do not match.",
                e
            });
        });
    })

    // If the email does not exist, we return an error message.
    .catch((e) => {
        console.log("Email not found.");
        res.status(404).send({
            message:"Email not found.",
            e
        });
    });
});

// This is the logic for our 'users' endpoint.
// The user is necessarily authentificated when they get here.
const users = ((req, res, next) => {
    console.log("An user tries to get user's information.");
    // We fetch the emails of all the users in the Database.
    User.find().select("email")
    .then((users) => {
        console.log("Information retrieved:");
        console.log(users);
        res.status(200).json(users);
    })

    // If we can't fetch the information, we return an error message.
    .catch((e) => {
        console.log("Error, could not get information.")
        res.status(400).send({
            message: "Could not get the information.",
            e
        });
    });
});

// This is the logic for our 'isLogged' endpoint.
// The user is necessarily authentificated when they get here.
const isLogged = ((req, res, next) => {
    console.log("Is logged.");

    // All we have to do is to send "1" to confirm that the user did go through this logic and was thus authentificated.
    res.json({
        islogged: 1
    });
});

module.exports = {
    register,
    login,
    users,
    isLogged
};