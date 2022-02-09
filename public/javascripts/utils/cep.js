'use strict';

const limparFormulario = (endereco) =>{
    document.getElementById('hotelEndereco').value = '';
    document.getElementById('hotelEnderecoBairro').value = '';
    document.getElementById('hotelEnderecoCidade').value = '';
    document.getElementById('hotelEnderecoEstado').value = '';
}


const preencherFormulario = (endereco) =>{
    document.getElementById('hotelEndereco').value = endereco.logradouro;
    document.getElementById('hotelEnderecoBairro').value = endereco.bairro;
    document.getElementById('hotelEnderecoCidade').value = endereco.localidade;
    document.getElementById('hotelEnderecoEstado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('hotelEnderecoCep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('hotelEndereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('hotelEndereco').value = 'CEP incorreto!';
    }
     
}

document.getElementById('hotelEnderecoCep')
        .addEventListener('focusout',pesquisarCep);
        console.log(hotelEnderecoCep)