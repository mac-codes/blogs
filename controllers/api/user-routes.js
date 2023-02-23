const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Route to create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        // Save user session and respond with user data
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.save(() => {
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to log in a user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        // Check if user with provided email exists
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Check if provided password is correct
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Save user session and respond with user data
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.email = userData.email;
        req.session.save(() => {
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to log out a user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // Destroy session and respond with 204 status
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
