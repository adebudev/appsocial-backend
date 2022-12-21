const nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function (req, res) {
    // Definimos el transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'example@gmail.com',
            pass: 'password'
        }
    });
    // Definimos el email
    const mailOptions = {
        from: 'Remitente',
        to: 'destinatario@gmail.com',
        subject: 'Asunto',
        text: 'Contenido del email'
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(400, error.message);
        }
        else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};
export {};
//# sourceMappingURL=email.controller.js.map