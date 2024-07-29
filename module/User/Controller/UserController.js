const user = require('../Model/User');
const bcrypt = require('bcrypt');
const channelModel = require('../Model/channel');
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await user.findOne({ email });
        if (!userExist) {
            return res.json({status:false, message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if (isPasswordMatch) {
            req.session.isLogin= true;
            req.session.user= userExist;
            return res.status(200).json({status:true, message: "Login successful" });
        }
        return res.json({status:false, message: "Invalid credentials" });
    } catch (error) {
        console.error(error);
        return res.json({ status:false, message: "Internal server error" });
    }
};

const dashboard = async (req, res) => {
    if(req.session.user.user_type==='employee'){
        return res.redirect('/dashboard/'+req.session.user.channel_id);
    }
    const channels = await channelModel.find();
    const users = await user.find({ user_type: 'employee' }).populate('channel_id');
    return res.render("dashboard", {
        page: "dash",
        data: { channels, users },
        req: req,
        script: ["module/dash.js"],
      });
};

const logout= async(req, res, next)=>{
    delete req.session.isLogin
    delete req.session.user
    res.redirect('/')
}

const channel = async (req, res) => {
    const channels = await channelModel.find();
    res.render("dashboard", {
        page: "channel",
        data: { channels },
        req: req,
        script: ["module/channel.js"],
      });
};

const channelcreate = async (req, res) => {

    res.render("dashboard", {
        page: "channelcreate",
        data: {  },
        req: req,
        css: ['app-assets/vendors/css/editors/quill/monokai-sublime.min.css',
                'app-assets/vendors/css/editors/quill/quill.snow.css',
                "app-assets/css/plugins/forms/form-quill-editor.min.css", 
                'app-assets/vendors/css/editors/quill/quill.bubble.css',
            'app-assets/vendors/css/editors/quill/katex.min.css'],
        script: ["module/channelcreate.js" ,'app-assets/vendors/js/editors/quill/highlight.min.js', 'app-assets/vendors/js/editors/quill/katex.min.js','app-assets/vendors/js/editors/quill/quill.min.js'],
      });
};  

const store = async (req, res) => {
    try {
        const content = req.body.content;
        const channel_id = req.body.channel_id;
        const check = await channelModel.findOne({name:channel_id});
        if(check) return res.json({status:false, message: "Channel already exist" });
        const channel = new channelModel({name:channel_id, description:content});
        await channel.save();
        return res.json({status:true, message: "Channel created successfully" });
    } catch (error) {
        console.error(error);
        return res.json({ status:false, message: "Internal server error" });
    }
};

const view = async (req, res) => {
    const id = req.params.id;
    const channel = await channelModel.findOne({_id: id});
    res.render("dashboard", {
        page: "channelview",
        data: { channel },
        req: req,
        css: ['app-assets/vendors/css/editors/quill/monokai-sublime.min.css',
                'app-assets/vendors/css/editors/quill/quill.snow.css',
                "app-assets/css/plugins/forms/form-quill-editor.min.css",
                'app-assets/vendors/css/editors/quill/quill.bubble.css',
            'app-assets/vendors/css/editors/quill/katex.min.css'],
        script: ["module/channelview.js"],
      });
};

const userDash = async (req, res) => {
    const id = req.params.id;
    const channel = await channelModel.findOne({_id: id});
    res.render("userdash", {
        page: "channelview",
        data: { channel },
        req: req,
        css: ['app-assets/vendors/css/editors/quill/monokai-sublime.min.css',
                'app-assets/vendors/css/editors/quill/quill.snow.css',
                "app-assets/css/plugins/forms/form-quill-editor.min.css",
                'app-assets/vendors/css/editors/quill/quill.bubble.css',
            'app-assets/vendors/css/editors/quill/katex.min.css'],
        script: ["module/channelview.js"],
      });
};

const usercreate = async (req, res) => {
    try {
        const { name, email, password, channel_id } = req.body;
        const userExist = await user.findOne({ email });
        if(userExist) return res.json({status:false, message: "User already exist" });

        const userModel = new user({name, email, password: bcrypt.hashSync(password, 10), channel_id, 'user_type':'employee'});
        await userModel.save();
        return res.json({status:true, message: "User created successfully" });

    } catch (error) {
        console.error(error);
        return res.json({ status:false, message: "Internal server error" });
    }
};

exports.userDash = userDash;
exports.usercreate = usercreate;
exports.view = view;
exports.store = store;
exports.channelcreate = channelcreate;
exports.channel = channel;
exports.logout = logout;
exports.dashboard = dashboard;
exports.login = login;