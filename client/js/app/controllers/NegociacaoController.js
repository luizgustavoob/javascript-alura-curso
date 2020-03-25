class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    
    // evitar percorrer o dom diversas vezes, mantem os inputs como propriedades
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    
    this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
      new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
    
    this._mensagem = new Bind(new Mensagem(), 
      new MensagemView($('#mensagemView')), 'texto');

    this._ordemAtual = '';
  }
  
  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso!';
    this._resetaForm();
  }

  importaNegociacoes() {
    let service = new NegociacaoService();
    service.obterNegociacoes()
      .then(negociacoes => negociacoes.forEach(neg => this._listaNegociacoes.adiciona(neg)))
      .catch(error => this._mensagem.texto = error);    
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso!';
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value), 
      this._inputQuantidade.value, 
      this._inputValor.value
    );
  }

  _resetaForm() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  ordena(coluna) {
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }    
    this._ordemAtual = coluna;
  }

}