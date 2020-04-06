'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }],
    execute: function () {
      negociacaoController = currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adicionar.bind(negociacaoController);
      document.querySelector('.button-apagar').onclick = negociacaoController.apagar.bind(negociacaoController);
      document.querySelector('.button-importar').onclick = negociacaoController.importarNegociacoes.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map