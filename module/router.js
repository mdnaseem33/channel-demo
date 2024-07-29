exports.routes= async (app)=>{
    app.use('/', require('./User/routes/user'));
}