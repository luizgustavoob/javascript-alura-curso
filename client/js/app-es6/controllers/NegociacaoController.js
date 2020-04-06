import {MensagemView} from '../views/MensagemView';
import {NegociacoesView} from '../views/NegociacoesView';
import {NegociacaoService} from '../services/NegociacaoService';
import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {Negociacao} from '../models/Negociacao';
import {Bind} from '../helpers/Bind';
import {DateHelper} from '../helpers/DateHelper';

class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);    
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._ordemAtual = '';
    
    this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
      new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');    
    this._mensagem = new Bind(new Mensagem(), 
      new MensagemView($('#mensagemView')), 'texto');

    this._negociacaoService = new NegociacaoService();

    this._init();
  }

  _init() {
    this._negociacaoService
      .listarTodos()
      .then(negociacoes => negociacoes.forEach(neg => this._listaNegociacoes.adiciona(neg)))
      .catch(err => this._mensagem.texto = err);

    setInterval( () => {
     this.importarNegociacoes();
    }, 5000);
  }
  
  adicionar(event) {
    event.preventDefault();

    this._negociacaoService
      .cadastrar(this._criarNegociacao())
      .then(negociacao => {
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._listaNegociacoes.adiciona(negociacao);
        this._resetarForm();
      })
      .catch(err => this._mensagem.texto = err);
  }

  importarNegociacoes() {
    this._negociacaoService
      .importar(this._listaNegociacoes.negociacoes)
      .then(negociacoes => {
        negociacoes.forEach(neg => this._listaNegociacoes.adiciona(neg));
        this._mensagem.texto = 'Negociações importadas com sucesso!';
      })
      .catch(error => this._mensagem.texto = error);
  }

  apagar() {
    this._negociacaoService.apagar()
      .then(msg => {
        this._mensagem.texto = msg;
        this._listaNegociacoes.esvazia();
      })
      .catch(err => this._mensagem.texto = err);
  }

  _criarNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value), 
      parseInt(this._inputQuantidade.value), 
      parseFloat(this._inputValor.value)
    );
  }

  _resetarForm() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  ordenar(coluna) {
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }    
    this._ordemAtual = coluna;
  }

}

let negociacaoController = new NegociacaoController();

export function currentInstance() {
  return negociacaoController;
}