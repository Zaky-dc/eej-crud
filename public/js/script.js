var calculoRealizado = false; // Adicionado para rastrear se o cálculo foi feito


//alertas

function mostrarAlertas(message, className){

    const div = document.createElement("div");
    
    div.className = `alert alert-${className} mt-5`;
    div.appendChild(document.createTextNode(message));
    const container= document.querySelector(".container");
    const main = document.querySelector(".form-signin");
    container.insertBefore(div,main);
    
    setTimeout(()=>document.querySelector(".alert").remove(),3000);

    
    }
    

function calcularTaxa() {
    event.preventDefault();
    // Obter os valores inseridos pelo usuário
    var valorFatura = parseFloat(document.getElementById('valorFatura').value);
    var valorCliente = parseFloat(document.getElementById('valorCliente').value);

    // Verificar se os valores são válidos
    if (isNaN(valorFatura) || isNaN(valorCliente)) {
       mostrarAlertas("Por favor, preencha todos os campos","warning")
       return;
    }

    // Verificar se os campos estão vazios
    if (valorFatura === 0 || valorCliente === 0) {
        mostrarAlertas("Introduza valores validos","warning")
        return;
    }

    // Calcular a taxa de comparticipação
    var taxaCliente = (valorCliente / valorFatura) * 100;
    var taxaSeguradora = 100 - taxaCliente;

    // Exibir o resultado
    var resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `Taxa Cliente: ${taxaCliente.toFixed(2)}%<br>Taxa Seguradora: ${taxaSeguradora.toFixed(2)}%`;

    // Ativar o botão de reset
    calculoRealizado = true;
    atualizarBotoes();
}

function limparCampos() {
    event.preventDefault();
    // Obter os valores inseridos pelo usuário
    var valorFatura = document.getElementById('valorFatura').value;
    var valorCliente = document.getElementById('valorCliente').value;

    // Verificar se os campos estão vazios
    if (!valorFatura && !valorCliente) {
        alert('Campos já estão vazios.');
        return;
    }

    // Limpar os campos
    document.getElementById('valorFatura').value = '';
    document.getElementById('valorCliente').value = '';
    document.getElementById('resultado').innerHTML = '';

    // Desativar o botão de reset
    calculoRealizado = false;
    atualizarBotoes();
}

function atualizarBotoes() {
    // Selecionar o botão de reset
    var resetButton = document.getElementById('resetButton');

    // Atualizar a visibilidade do botão com base no estado de cálculo realizado
    resetButton.style.display = calculoRealizado ? 'block' : 'none';
}

function calcularTaxaMediplus() {
    event.preventDefault();
    // Obter os valores inseridos pelo usuário
    var valorFatura = parseFloat(document.getElementById('valorFatura').value);
    var valorCliente = parseFloat(document.getElementById('valorCliente').value);
    var valorreal = valorFatura-valorCliente;

    // Verificar se os valores são válidos
    if (isNaN(valorFatura) || isNaN(valorCliente)) {
       mostrarAlertas("Por favor, preencha todos os campos","warning")
       return;
    }

    // Verificar se os campos estão vazios
    if (valorFatura === 0 || valorCliente === 0) {
        mostrarAlertas("Introduza valores validos","warning")
        return;
    }

    // Calcular a taxa de comparticipação
    var taxaCliente = (valorreal / valorFatura) * 100;
    var taxaSeguradora = 100 - taxaCliente;

    // Exibir o resultado
    var resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `Taxa Cliente: ${taxaCliente.toFixed(2)}%<br>Taxa Seguradora: ${taxaSeguradora.toFixed(2)}%`;

    // Ativar o botão de reset
    calculoRealizado = true;
    atualizarBotoes();
}

window.onload = function(){
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search")

    closeBtn.addEventListener("click",function(){
        sidebar.classList.toggle("open")
        menuBtnChange()
    })

    searchBtn.addEventListener("click",function(){
        sidebar.classList.toggle("open")
        menuBtnChange()
    })

    function menuBtnChange(){
        if(sidebar.classList.contains("open")){
            closeBtn.classList.replace("bx-menu","bx-menu-alt-right")
        }else{
            closeBtn.classList.replace("bx-menu-alt-right","bx-menu")
        }
    }
}

window.addEventListener("load", function () {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(function (iframe) {
      iframe.classList.add('loaded'); // Adiciona a classe "loaded" após o carregamento
    });
  });
