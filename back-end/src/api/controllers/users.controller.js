const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const { username, completeName, password, role } = req.body;
        if (!username || !completeName || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!['editor', 'writer'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        };
        const newUser = new User({ username, completeName, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '3h' });
        return res.json({ token, data: user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllEditors = async (req, res) => {
    try {
        const editors = await User.find({ role:'editor' });
        if(editors.length === 0){
            return res.status(404).json({ message: 'Editors were not found' });
        }
         return res.status(200).json(editors);
    } catch (error) {
         return res.status(500).json({ message: error.message });
    }
}

module.exports = { register, login, getAllEditors }