//Máscara para o campo de Telefone
document.addEventListener("DOMContentLoaded", function () {
    const telefoneInput = document.getElementById("telefone");

    telefoneInput.addEventListener("input", function () {
        let value = telefoneInput.value.replace(/\D/g, "");

        if (value.length > 11) value = value.slice(0, 11);

        if (value.length <= 10) {
            // Formato: (XX) XXXX-XXXX
            value = value.replace(/(\d{2})(\d)/, "($1) $2");
            value = value.replace(/(\d{4})(\d)/, "$1-$2");
        } else {
            // Formato: (XX) XXXXX-XXXX
            value = value.replace(/(\d{2})(\d)/, "($1) $2");
            value = value.replace(/(\d{5})(\d)/, "$1-$2");
        }

        telefoneInput.value = value;
    });
});

// Máscara para o campo de CPF
document.addEventListener("DOMContentLoaded", function () {
    const cpfInput = document.getElementById("cpf");

    cpfInput.addEventListener("input", function () {
        let value = cpfInput.value.replace(/\D/g, ""); // Remove tudo que não é número

        if (value.length > 11) value = value.slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        cpfInput.value = value;
    });
});

//Verifica se o CEP é valido //
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;

    if(cepValido(cep.value)){
        const dados = await fetch(url);
        const addres = await dados.json();

        //hasOwnProperty retornará um valor booleano indicando se o objetivo possui a propriedades específicas no parenteses
        if(addres.hasOwnProperty('erro')){
            alert("CEP não encontrado");
        } else{
            preencherFormulario(addres);
        }
    } else {
        alert("CEP Incorreto, tente novamente.");
    }
}

const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;
}

//Limpa Formulário
const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
