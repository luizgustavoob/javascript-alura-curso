import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = 
  negociacaoController.adicionar.bind(negociacaoController);

document.querySelector('.button-apagar').onclick = 
  negociacaoController.apagar.bind(negociacaoController);
  
document.querySelector('.button-importar').onclick = 
  negociacaoController.importarNegociacoes.bind(negociacaoController);