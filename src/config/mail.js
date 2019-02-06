import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from path;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: '',
        pass: ''
    }
});

transporter.verify(function(error, success) {
    if(error){
        console.log(error);
        return error;
    }else{
        console.log('Ready to send message');
    }
});

const abso = path.join(path.dirname(module.parent.filename), '../template');

transporter.use('compile', hbs({
    viewPath: abso,
    extName: '.html'
}));

export default transporter;