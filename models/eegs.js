const mongoose = require('mongoose');

const schema = mongoose.Schema;
let mySchema= new schema

({
    paciente: {
        type: String,
        required: true,
    },
    contacto: {
        type: String,
        required: true,
    },
    feitoem: {
        type: Date,
        default: Date.now,
    },
    tecnico: {
        type: String,
        required: true,
    },
    neurologista: {
        type: String,
        required: true,
    },
    entrega: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
               const feitoemDate = new Date(this.feitoem);
                feitoemDate.setHours(0, 0, 0, 0); // Zera a hora

                return value >= feitoemDate; // Verifica se entrega é maior ou igual a feitoem
            },
            message: "A data de entrega deve ser posterior à data de feito.",
        },
    },
    status: {
        type: String,
        enum: ['Entregue', 'Pendente', 'Cancelado'],
        default: 'Pendente',
    },
});

module.exports = mongoose.model('Eeg', mySchema);
