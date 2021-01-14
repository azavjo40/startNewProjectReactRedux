const {Router} = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()

router.post('/register',
[
check('email', 'Please enter email').isEmail(),
check('password', 'Please enter password min 6 dgits')
.isLength({ min: 6 }),
check('name', 'Please enter name').exists(),
check('phone', 'Please enter phone').isNumeric()
],
async (req, res)=>{
try{
const errors = validationResult(req)
console.log(errors.array())
if (!errors.isEmpty()) {
return res.status(400).json({
errors: errors.array(),
message: 'Incorrect registration data'
})
}
const {name, phone, email, password} = req.body
const candidate = await User.findOne({email})
if(candidate){
return res.status(400).json({message: 'This user already exists'})
}
const hashedPassword = await bcrypt.hash(password, 12)
const user = new User({name, phone, email, password: hashedPassword})
await user.save()
res.status(201).json({ message: 'User created' ,user})
}catch(e){res.status(500).json({message: 'Something went wrong, please try again'})}
})

router.post('/login',
[
check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
check('password', 'Please enter password')
],
async (req, res)=>{
try{
const errors = validationResult(req)
if(!errors.isEmpty){
return res.status(400).json({
errors: errors.array(),
message: 'Incorrect registration data'
})}
const {email, password} = req.body
const user = await User.findOne({email})
const isMatch = await bcrypt.compare(password, user.password)
if(!isMatch){
return res.status(400).json({message: 'Invalid password, please try again'})
}
const token = jwt.sign(
{userId: user.id},
config.get('jwtSecret')
//,{ expiresIn: '1h' }
)
res.status(200).json({token: `Bearer ${token}`, userId: user.id})
}catch(e){res.status(500).json({message: 'Something went wrong, please try again'})}
}
)

module.exports = router