
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path'); 
const mongoose = require('mongoose');
const ConnectDB = require('./database/connection');
const cron = require('node-cron');
const Eeg = require('./models/eegs'); 
const sendEmail = require('./services/emailService'); // Importa o serviço de e-mail 
const app = express();
const PORT = process.env.PORT || 4000;
const connectDB = require('./database/connection');

//Criar conexaco a base dados
ConnectDB();

//Usar algunsMiddlewares

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret:'my secret key',
    saveUninitialized:true,
    resave:false,
}))

app.use((req,res,next)=>{

    res.locals.message = req.session.message;
    delete req.session.message;
    next();

})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));

//set template engine

app.set('view engine','ejs');

//router

app.use("",require("./routes/routes"))


app.listen(PORT,()=>{

    console.log(`server started at http://localhost:${PORT}`)
})

cron.schedule('58 22 * * *', async () => {
    try {
        const hoje = new Date().toISOString().split('T')[0]; // Data atual no formato AAAA-MM-DD

        // Buscar EEGs com entrega marcada para hoje e com status "Pendente"
        const eegs = await Eeg.find({ entrega: hoje, status: 'Pendente' });

        if (eegs.length > 0) {
            console.log(`Notificações para ${eegs.length} EEG(s):`);

            /*
            // Construir o conteúdo da mensagem SMS
            const smsContent = `
                Relatório de EEGs Pendentes para Hoje:
                ${eegs
                    .map(
                        (eeg) => `
                        Paciente: ${eeg.paciente}
                        Contato: ${eeg.contacto}
                        Entregar até: ${new Date(eeg.entrega).toLocaleDateString()}
                    `
                    )
                    .join('\n')}
                Por favor, garanta que as entregas sejam confirmadas.
            `;
            */

            // Construir o conteúdo do e-mail
            const emailContent = `
            <h3>Relatório de EEGs Pendentes para Hoje</h3>
            <ul>
                ${eegs
                    .map(
                        (eeg) => `
                        <li>
                            <b>Paciente:</b> ${eeg.paciente}<br>
                            <b>Contato:</b> ${eeg.contacto}<br>
                            <b>Entregar até:</b> ${new Date(eeg.entrega).toLocaleDateString('pt-PT')}
                        </li>`
                    )
                    .join('')}
            </ul>
            <p>Por favor, garantam o follow up deste(s) exame(s).</p>
        `;
        

            // Enviar SMS para o recepcionista chefe
          //  const recepcionistaPhone = '+258849111737'; // Substitua pelo número do recepcionista
           // await sendSms(recepcionistaPhone, smsContent);

            // Enviar e-mail para o recepcionista chefe
            const recepcionistaEmail = 'recepcao@shifaahospital.co.mz'; // Substitua pelo e-mail do recepcionista
            const ccEmails = ['zakirmagide@shifaahospital.co.mz', 'zakirmagide@gmail.com'];
            await sendEmail(recepcionistaEmail, 'EEGs Pendentes para Hoje', emailContent,ccEmails);

            console.log('e-mail enviados para o recepcionista chefe.');
        } else {
            console.log('Nenhuma entrega programada para hoje.');
        }
    } catch (err) {
        console.error('Erro ao verificar entregas:', err);
    }
});

cron.schedule('30 08 * * *', async () => {
    try {
        const hoje = new Date().toISOString().split('T')[0]; // Data atual no formato AAAA-MM-DD

        // Buscar EEGs com entrega marcada para hoje e com status "Pendente"
        const eegs = await Eeg.find({ entrega: hoje, status: 'Pendente' });

        if (eegs.length > 0) {
            console.log(`Notificações para ${eegs.length} EEG(s):`);

            /*
            // Construir o conteúdo da mensagem SMS
            const smsContent = `
                Relatório de EEGs Pendentes para Hoje:
                ${eegs
                    .map(
                        (eeg) => `
                        Paciente: ${eeg.paciente}
                        Contato: ${eeg.contacto}
                        Entregar até: ${new Date(eeg.entrega).toLocaleDateString()}
                    `
                    )
                    .join('\n')}
                Por favor, garanta que as entregas sejam confirmadas.
            `;
            */

            // Construir o conteúdo do e-mail
            const emailContent = `
            <h3>Relatório de EEGs Pendentes para Hoje</h3>
            <ul>
                ${eegs
                    .map(
                        (eeg) => `
                        <li>
                            <b>Paciente:</b> ${eeg.paciente}<br>
                            <b>Contato:</b> ${eeg.contacto}<br>
                            <b>Entregar até:</b> ${new Date(eeg.entrega).toLocaleDateString('pt-PT')}
                        </li>`
                    )
                    .join('')}
            </ul>
            <p>Por favor, garantam o follow up deste(s) exame(s).</p>
        `;
        

            // Enviar SMS para o recepcionista chefe
          //  const recepcionistaPhone = '+258849111737'; // Substitua pelo número do recepcionista
           // await sendSms(recepcionistaPhone, smsContent);

            // Enviar e-mail para o recepcionista chefe
            const recepcionistaEmail = 'recepcao@shifaahospital.co.mz'; // Substitua pelo e-mail do recepcionista
            const ccEmails = ['zakirmagide@shifaahospital.co.mz', 'zakirmagide@gmail.com'];
            await sendEmail(recepcionistaEmail, 'EEGs Pendentes para Hoje', emailContent,ccEmails);

            console.log('e-mail enviados para o recepcionista chefe.');
        } else {
            console.log('Nenhuma entrega programada para hoje.');
        }
    } catch (err) {
        console.error('Erro ao verificar entregas:', err);
    }
});



