const express = require('express');
const router = express.Router();
const Eeg = require('../models/eegs');

const ITEMS_PER_PAGE = 5;

router.get('/', (req, res) => {
    res.render('index', { title: "Home Page" });
});

router.get('/calculadora', (req, res) => {
    res.render('calculadora');
});

router.get('/mediplus', (req, res) => {
    res.render('mediplus');
});

router.get('/eeg', (req, res) => {
    // Página atual, se não for fornecida, assume-se que seja a primeira
    const page = +req.query.page || 1;
    const searchTerm = req.query.search || ''; // Termo de pesquisa

    
    // Número de itens por página
    const ITEMS_PER_PAGE = 5;

    // Calcular o número de documentos a pular
    const skip = (page - 1) * ITEMS_PER_PAGE;

    let searchQuery = {
        $or: [
            { paciente: { $regex: searchTerm, $options: 'i' } },
            { contacto: { $regex: searchTerm, $options: 'i' } },
            { status: { $regex: searchTerm, $options: 'i' } },
            { tecnico: { $regex: searchTerm, $options: 'i' } },
            { neurologista: { $regex: searchTerm, $options: 'i' } }
        ]
    };
    
    // Se o usuário forneceu uma data inicial e final para o filtro
    if (req.query.startDate && req.query.endDate) {
        let startDate = new Date(req.query.startDate); // Data inicial
        let endDate = new Date(req.query.endDate); // Data final
        searchQuery['feitoem'] = { $gte: startDate, $lte: endDate }; // Filtro de intervalo de datas
    }

    // Contagem total de registros
    Eeg.countDocuments(searchQuery).then(totalItems => {
        // Consultar os EEGs para a página atual
        Eeg.find(searchQuery)
            .skip(skip) // Pular os registros anteriores
            .limit(ITEMS_PER_PAGE) // Limitar o número de registros
            .then(mydata => {
                // Calcular o total de páginas
                const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
               
                
                // Renderizar a view, passando os dados da paginação, incluindo ITEMS_PER_PAGE
                res.render('eegstable', {
                    mydata: mydata,
                    currentPage: page,
                    totalPages: totalPages,
                    totalItems: totalItems,
                    ITEMS_PER_PAGE: ITEMS_PER_PAGE,// Passar ITEMS_PER_PAGE para a view
                    searchTerm: searchTerm  
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send("Erro ao buscar dados");
            });
    });
});





router.get('/add', (req, res) => {
    const feitoDate = new Date().toISOString().split('T')[0]; // Define a data de feito como a data atual
    res.render('add_eegs', { feitoDate }); // Passa a data de feito para o frontend
});


router.post('/add',(req,res)=>{

    const addEeg = new Eeg({
        paciente: req.body.paciente,
        contacto: req.body.contacto,
        tecnico: req.body.tecnico,
        neurologista: req.body.neurologista,
        entrega: req.body.entrega,
        status: req.body.status,
    })

    const saveData = addEeg.save();
     if(saveData){
      res.redirect('/eeg')
     }else{
      console.log("eror in code");
     }
})



router.get('/edit/:id', (req, res) => {
    Eeg.findById(req.params.id).then(eeg => {
        if (eeg) {
            const feitoDate = eeg.feitoem.toISOString().split('T')[0]; // Pega a data de feito do EEG existente
            res.render('updateform', {
                updatedata: eeg,
                feitoDate: feitoDate // Passa a data de feito para o frontend
            });
        } else {
            res.status(404).send('EEG não encontrado');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Erro no servidor');
    });
});
router.post('/update/:id', (req, res) => {
    Eeg.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(eeg => {
        if (eeg) {
            res.redirect('/eeg');
        } else {
            res.status(404).send('EEG não encontrado para atualização');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Erro no servidor');
    });
});


router.get('/delete/:id',(req,res)=>{
    Eeg.findByIdAndDelete({_id:req.params.id}).then(eeg=>{
         res.redirect('/eeg')
    })
})

   

module.exports = router;
