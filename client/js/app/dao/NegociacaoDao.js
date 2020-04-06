'use strict';

System.register(['../models/Negociacao'], function (_export, _context) {
  "use strict";

  var Negociacao, _createClass, NegociacaoDao;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('NegociacaoDao', NegociacaoDao = function () {
        function NegociacaoDao(connection) {
          _classCallCheck(this, NegociacaoDao);

          this._connection = connection;
          this._store = 'negociacoes';
        }

        _createClass(NegociacaoDao, [{
          key: 'adicionar',
          value: function adicionar(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {

              var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

              request.onsuccess = function (event) {
                return resolve(negociacao);
              };

              request.onerror = function (event) {
                console.log('Não foi possível incluir a negociação', event.target.error);
                reject('Não foi possível incluir a negociação.');
              };
            });
          }
        }, {
          key: 'listarTodos',
          value: function listarTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

              var negociacoes = [];
              var cursor = _this2._connection.transaction([_this2._store], 'readonly').objectStore(_this2._store).openCursor();

              cursor.onsuccess = function (event) {
                var current = event.target.result;
                if (!current) {
                  resolve(negociacoes);
                  return;
                }
                var neg = current.value;
                negociacoes.push(new Negociacao(neg._data, neg._quantidade, neg._valor));
                current.continue();
              };

              cursor.onerror = function (event) {
                console.log('Não foi possível obter as negociações', event.target.error);
                reject('Não foi possível obter as negociações');
              };
            });
          }
        }, {
          key: 'apagarTodos',
          value: function apagarTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {

              var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

              request.onsuccess = function (event) {
                return resolve('Negociações removidas com sucesso.');
              };
              request.onerror = function (event) {
                console.log('Não foi possível remover as negociações', event.target.error);
                reject('Não foi possível remover as negociações.');
              };
            });
          }
        }]);

        return NegociacaoDao;
      }());

      _export('NegociacaoDao', NegociacaoDao);
    }
  };
});
//# sourceMappingURL=NegociacaoDao.js.map