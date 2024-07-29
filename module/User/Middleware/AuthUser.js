
const isLogin= async (req, res, next)=> {
    try {
        if(req.session.isLogin){
            return next();
        }
    } catch (error) {
        
    }
    res.redirect('/')
};

const isAdmin = async (req, res, next)=> {
    try {
        if(req.session.user.user_type === 'admin'){
            return next();
        }
    } catch (error) {

    }
    res.redirect('/')
};

const isEmp = async (req, res, next)=> {
    try {
        if(req.session.user.user_type === 'employee'){
            return next();
        }
    } catch (error) {

    }
    res.redirect('/')
};

exports.isLogin = isLogin;
exports.isAdmin = isAdmin;
exports.isEmp = isEmp;
