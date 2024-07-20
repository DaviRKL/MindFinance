const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async(req, res) => {
    const {name, email, password, photo} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const user = await prisma.user.create({
            data: {
                name, email, password: hashedPassword, photo,
            },
        });
        res.status(201).json(user);
    } catch(error) {
        res.status(400).json({error: 'Este email já está em uso'});
    }

};

const login = async (req, res) => {
    const {email, password} = req.body

    const user = await prisma.user.findUnique({where: { email }});

    if (!user) {
        return res.status(401).json({ error: 'Email ou senha invalida' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
        return res.status(401).json({ error: 'Email ou senha invalida' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h'});

    res.json({token});
}

const getProfile = async (req, res) => {
    const user = await prisma.user.findUnique({where: { id: req.userId },});
    res.json(user);
}

module.exports = {register, login, getProfile};