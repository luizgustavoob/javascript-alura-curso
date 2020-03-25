class Negociacao {

  constructor(data, quantidade, valor) {
    //"_" convenção para atributos private.
    
    this._data = new Date(data.getTime()); //deixando a variavel imutavel
    this._quantidade = quantidade;
    this._valor = valor;
    
    //impede que o objeto seja alterado (imutável)
    Object.freeze(this);
  }

  //prefixo get garante que a propriedade só deve ser usada para leitura
  get data() {
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  get volume() {
    return this._quantidade * this._valor;
  }

}

