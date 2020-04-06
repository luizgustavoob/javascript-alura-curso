import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  _obterNegociacoes() {
    return Promise.all([
      this._obterNegociacoesDaSemana(), 
      this._obterNegociacoesDaSemanaAnterior(),
      this._obterNegociacoesDaSemanaRetrasada()
    ])
    .then(negociacoes => 
      negociacoes.reduce((finalArray, currentArray) => finalArray.concat(currentArray), [])
    )
    .catch(err => {
      console.log(err);
      throw new Error(err);
    });
  }

  _obterNegociacoesDaSemana() {
    return this._http
      .get('negociacoes/semana')
      .then(negociacoes => 
        negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
      )
      .catch(err => {
        console.log(err);
        throw new Error('Não foi possível obter as negociações da semana.');
      });    
  }

  _obterNegociacoesDaSemanaAnterior() {
    return this._http
      .get('negociacoes/anterior')
      .then(negociacoes => 
        negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
      )
      .catch(err => {
        console.log(err);
        throw new Error('Não foi possível obter as negociações da semana anterior.')
      });
  }

  _obterNegociacoesDaSemanaRetrasada() {
    return this._http
      .get('negociacoes/retrasada')
      .then(negociacoes => 
        negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
      )
      .catch(err => {
        console.log(err);
        throw new Error('Não foi possível obter as negociações da semana retrasada.')
      });
  }

  cadastrar(negociacao) {
    return ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.adicionar(negociacao))
        .catch(err => {throw new Error(err)});
  }

  apagar() {
    return ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.apagarTodos())
        .catch(err => {throw new Error(err)});
  }

  listarTodos() {
    return ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.listarTodos())
        .then(negociacoes => {
          console.log(negociacoes);
          return negociacoes;
        })
        .catch(err => {throw new Error(err)});    
  }

  importar(listaAtual) {
    return this._obterNegociacoes()
      //filtra só os que ainda não foram inseridos
      .then(negociacoes => negociacoes.filter(negociacao => 
          !listaAtual.some(neg => negociacao.isEquals(neg))
      ))
      .then(negociacoes => {
        ConnectionFactory.getConnection()
          .then(connection => new NegociacaoDao(connection))
          .then(dao => {
            negociacoes.forEach(async neg => await dao.adicionar(neg));
            return negociacoes;
          });
          return negociacoes;
      })
      .catch(err => {throw new Error(err)});
  }

}