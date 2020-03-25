class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(), 
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ])
    .then(negociacoes => 
      negociacoes.reduce((finalArray, currentArray) => finalArray.concat(currentArray), [])
    )
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }

  obterNegociacoesDaSemana() {
    return this._http
      .get('negociacoes/semana')
      .then(negociacoes => {
        return negociacoes
          .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
      })
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana.');
      });    
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http
      .get('negociacoes/anterior')
      .then(negociacoes => {
        return negociacoes
          .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
      })
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana anterior.')
      });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http
      .get('negociacoes/retrasada')
      .then(negociacoes => {
        return negociacoes
          .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
      })
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana retrasada.')
      });
  }
}