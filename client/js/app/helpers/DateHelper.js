class DateHelper {

  constructor() {
    throw new Error('Esta classe não pode ser instanciada');
  }

  static textoParaData(dataStr) {
    if (!/\d{4}-\d{2}-\d{2}/.test(dataStr)) throw new Error('Deve estar no formato aaaa-mm-dd');

    //para index impar, tira 1. para index par, tira 0.
    return new Date(...dataStr.split('-').map( (item, index) => item - index % 2 ) );
  }

  static dataParaTexto(data) {
    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    //return data.getDate() + '/' + (data.getMonth()+1) + '/' + data.getFullYear();
  }

}