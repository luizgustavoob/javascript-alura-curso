class Conta {

  constructor(saldo) {
    this._saldo = saldo;
    Object.freeze();
  }

  get saldo() {
    return this._saldo;
  }

  atualiza(taxa) {
    throw new Error('Você deve sobreescrever o método!');
  }
}