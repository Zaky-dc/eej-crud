const nodemailer = require('nodemailer');

// Configuração do transporte
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou outro provedor de e-mail
    auth: {
        user: 'zakirmagide@gmail.com', // Substitua pelo e-mail do remetente
        pass: 'yayz pahr izco vbzv', // Substitua pela senha do aplicativo
    },
});

const sendEmail = async (recipientEmail, subject, htmlContent,ccEmails) => {
    try {
        const info = await transporter.sendMail({
            from: '"EEG System" <zakirmagide@gmail.com>', // Nome e e-mail do remetente
            to: recipientEmail, // E-mail do destinatário
            cc: ccEmails.join(', '),
            subject, // Assunto do e-mail
            html: htmlContent, // Conteúdo em HTML
        });
        console.log('E-mail enviado com sucesso:', info.messageId);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
};

module.exports = sendEmail;
