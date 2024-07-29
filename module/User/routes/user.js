const express= require('express');
const router = express.Router();
const userController = require('../Controller/UserController'); 
const UserModel = require('../Model/User');
const bcrypt = require('bcrypt');
const middleware = require('../Middleware/AuthUser');
router.get('/', (req, res)=> {
    if(req.session.isLogin){
        return res.redirect('/dashboard');
    }
    res.render('login', { req:req });
})

router.post('/login', userController.login);
router.get('/admin-user',async (req, res)=>{
    try {
        const user = await UserModel.findOne({ email: 'admin@admin.com' });
        if(!user){
            const user = new UserModel({
                name: 'admin',
                email: 'admin@admin.com',
                password: bcrypt.hashSync('admin', 10),
                user_type: 'admin'
            })
            user.save();
        }else{
            user.password= bcrypt.hashSync('admin', 10);
            user.save();
        }
    } catch (error) {
        console.log(error);
    }

    return res.send({ message: 'success' })
});

router.get('/dashboard', middleware.isLogin, userController.dashboard);
router.post('/user-create', middleware.isAdmin, userController.usercreate);
router.post('/logout', userController.logout);
router.get('/channel', middleware.isAdmin, userController.channel);
router.get('/channel-create', middleware.isAdmin, userController.channelcreate);
router.post('/channel-create', middleware.isAdmin, userController.store);
router.get('/channel/:id', middleware.isAdmin, userController.view);
router.get('/dashboard/:id', middleware.isEmp, userController.userDash);
module.exports= router