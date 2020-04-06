'use strict';

System.register(['../views/MensagemView', '../views/NegociacoesView', '../services/NegociacaoService', '../models/ListaNegociacoes', '../models/Mensagem', '../models/Negociacao', '../helpers/Bind', '../helpers/DateHelper'], function (_export, _context) {
  "use strict";

  var MensagemView, NegociacoesView, NegociacaoService, ListaNegociacoes, Mensagem, Negociacao, Bind, DateHelper, _createClass, NegociacaoController, negociacaoController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_viewsMensagemView) {
      MensagemView = _viewsMensagemView.MensagemView;
    }, function (_viewsNegociacoesView) {
      NegociacoesView = _viewsNegociacoesView.NegociacoesView;
    }, function (_servicesNegociacaoService) {
      NegociacaoService = _servicesNegociacaoService.NegociacaoService;
    }, function (_modelsListaNegociacoes) {
      ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
    }, function (_modelsMensagem) {
      Mensagem = _modelsMensagem.Mensagem;
    }, function (_modelsNegociacao) {
      Negociacao = _modelsNegociacao.Negociacao;
    }, function (_helpersBind) {
      Bind = _helpersBind.Bind;
    }, function (_helpersDateHelper) {
      DateHelper = _helpersDateHelper.DateHelper;
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

      NegociacaoController = function () {
        function NegociacaoController() {
          _classCallCheck(this, NegociacaoController);

          var $ = document.querySelector.bind(document);
          this._inputData = $('#data');
          this._inputQuantidade = $('#quantidade');
          this._inputValor = $('#valor');
          this._ordemAtual = '';

          this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
          this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

          this._negociacaoService = new NegociacaoService();

          this._init();
        }

        _createClass(NegociacaoController, [{
          key: '_init',
          value: function _init() {
            var _this = this;

            this._negociacaoService.listarTodos().then(function (negociacoes) {
              return negociacoes.forEach(function (neg) {
                return _this._listaNegociacoes.adiciona(neg);
              });
            }).catch(function (err) {
              return _this._mensagem.texto = err;
            });

            setInterval(function () {
              _this.importarNegociacoes();
            }, 5000);
          }
        }, {
          key: 'adicionar',
          value: function adicionar(event) {
            var _this2 = this;

            event.preventDefault();

            this._negociacaoService.cadastrar(this._criarNegociacao()).then(function (negociacao) {
              _this2._mensagem.texto = 'Negociação adicionada com sucesso!';
              _this2._listaNegociacoes.adiciona(negociacao);
              _this2._resetarForm();
            }).catch(function (err) {
              return _this2._mensagem.texto = err;
            });
          }
        }, {
          key: 'importarNegociacoes',
          value: function importarNegociacoes() {
            var _this3 = this;

            this._negociacaoService.importar(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
              negociacoes.forEach(function (neg) {
                return _this3._listaNegociacoes.adiciona(neg);
              });
              _this3._mensagem.texto = 'Negociações importadas com sucesso!';
            }).catch(function (error) {
              return _this3._mensagem.texto = error;
            });
          }
        }, {
          key: 'apagar',
          value: function apagar() {
            var _this4 = this;

            this._negociacaoService.apagar().then(function (msg) {
              _this4._mensagem.texto = msg;
              _this4._listaNegociacoes.esvazia();
            }).catch(function (err) {
              return _this4._mensagem.texto = err;
            });
          }
        }, {
          key: '_criarNegociacao',
          value: function _criarNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
          }
        }, {
          key: '_resetarForm',
          value: function _resetarForm() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
          }
        }, {
          key: 'ordenar',
          value: function ordenar(coluna) {
            if (this._ordemAtual == coluna) {
              this._listaNegociacoes.inverteOrdem();
            } else {
              this._listaNegociacoes.ordena(function (a, b) {
                return a[coluna] - b[coluna];
              });
            }
            this._ordemAtual = coluna;
          }
        }]);

        return NegociacaoController;
      }();

      negociacaoController = new NegociacaoController();
      function currentInstance() {
        return negociacaoController;
      }

      _export('currentInstance', currentInstance);
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map