'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
  "use strict";

  var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_HttpService) {
      HttpService = _HttpService.HttpService;
    }, function (_ConnectionFactory) {
      ConnectionFactory = _ConnectionFactory.ConnectionFactory;
    }, function (_daoNegociacaoDao) {
      NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
    }, function (_modelsNegociacao) {
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

      _export('NegociacaoService', NegociacaoService = function () {
        function NegociacaoService() {
          _classCallCheck(this, NegociacaoService);

          this._http = new HttpService();
        }

        _createClass(NegociacaoService, [{
          key: '_obterNegociacoes',
          value: function _obterNegociacoes() {
            return Promise.all([this._obterNegociacoesDaSemana(), this._obterNegociacoesDaSemanaAnterior(), this._obterNegociacoesDaSemanaRetrasada()]).then(function (negociacoes) {
              return negociacoes.reduce(function (finalArray, currentArray) {
                return finalArray.concat(currentArray);
              }, []);
            }).catch(function (err) {
              console.log(err);
              throw new Error(err);
            });
          }
        }, {
          key: '_obterNegociacoesDaSemana',
          value: function _obterNegociacoesDaSemana() {
            return this._http.get('negociacoes/semana').then(function (negociacoes) {
              return negociacoes.map(function (objeto) {
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
              });
            }).catch(function (err) {
              console.log(err);
              throw new Error('Não foi possível obter as negociações da semana.');
            });
          }
        }, {
          key: '_obterNegociacoesDaSemanaAnterior',
          value: function _obterNegociacoesDaSemanaAnterior() {
            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
              return negociacoes.map(function (objeto) {
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
              });
            }).catch(function (err) {
              console.log(err);
              throw new Error('Não foi possível obter as negociações da semana anterior.');
            });
          }
        }, {
          key: '_obterNegociacoesDaSemanaRetrasada',
          value: function _obterNegociacoesDaSemanaRetrasada() {
            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
              return negociacoes.map(function (objeto) {
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
              });
            }).catch(function (err) {
              console.log(err);
              throw new Error('Não foi possível obter as negociações da semana retrasada.');
            });
          }
        }, {
          key: 'cadastrar',
          value: function cadastrar(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.adicionar(negociacao);
            }).catch(function (err) {
              throw new Error(err);
            });
          }
        }, {
          key: 'apagar',
          value: function apagar() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.apagarTodos();
            }).catch(function (err) {
              throw new Error(err);
            });
          }
        }, {
          key: 'listarTodos',
          value: function listarTodos() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.listarTodos();
            }).then(function (negociacoes) {
              console.log(negociacoes);
              return negociacoes;
            }).catch(function (err) {
              throw new Error(err);
            });
          }
        }, {
          key: 'importar',
          value: function importar(listaAtual) {
            return this._obterNegociacoes()
            //filtra só os que ainda não foram inseridos
            .then(function (negociacoes) {
              return negociacoes.filter(function (negociacao) {
                return !listaAtual.some(function (neg) {
                  return negociacao.isEquals(neg);
                });
              });
            }).then(function (negociacoes) {
              ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
              }).then(function (dao) {
                negociacoes.forEach(async function (neg) {
                  return await dao.adicionar(neg);
                });
                return negociacoes;
              });
              return negociacoes;
            }).catch(function (err) {
              throw new Error(err);
            });
          }
        }]);

        return NegociacaoService;
      }());

      _export('NegociacaoService', NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map