import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao {

  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  adicionar(negociacao) {
    return new Promise((resolve, reject) => {
      
      let request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).add(negociacao);
      
      request.onsuccess = (event) => resolve(negociacao);
      
      request.onerror = (event) => {
        console.log('Não foi possível incluir a negociação', event.target.error);
        reject('Não foi possível incluir a negociação.');
      };
    });
  }

  listarTodos() {
    return new Promise((resolve, reject) => {
      
      let negociacoes = [];
      let cursor = this._connection.transaction([this._store], 'readonly').objectStore(this._store).openCursor();      

      cursor.onsuccess = (event) => {        
        let current = event.target.result;        
        if (!current) {
          resolve(negociacoes);
          return;
        }        
        let neg = current.value;        
        negociacoes.push(new Negociacao(neg._data, neg._quantidade, neg._valor));        
        current.continue();
      }

      cursor.onerror = (event) => {
        console.log('Não foi possível obter as negociações', event.target.error);
        reject('Não foi possível obter as negociações');
      };
    })
  }

  apagarTodos() {
    return new Promise((resolve, reject) => {

      let request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).clear();
      
        request.onsuccess = (event) => resolve('Negociações removidas com sucesso.');
        request.onerror = (event) => {
          console.log('Não foi possível remover as negociações', event.target.error);
          reject('Não foi possível remover as negociações.')
        };
    });
  }
}