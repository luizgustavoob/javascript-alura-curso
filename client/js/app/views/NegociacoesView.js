class NegociacoesView extends View {

  constructor(element) {
    super(element);
  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
          <thead>
              <tr>
                  <th onclick="negociacaoController.ordena('data')">Data</th>
                  <th onclick="negociacaoController.ordena('quantidade')">Quantidade</th>
                  <th onclick="negociacaoController.ordena('valor')">Valor</th>
                  <th onclick="negociacaoController.ordena('volume')">Volume</th>
              </tr>
          </thead>
          
          <tbody>
            ${model.negociacoes.map(n => `
              <tr>
                <td>${DateHelper.dataParaTexto(n.data)}</td>
                <td>${n.quantidade}</td>
                <td>${n.valor}</td>
                <td>${n.volume}</td>
              </tr>
            `).join('')}
          </tbody>
          
          <tfoot>
            <td colspan="3"></td>
            <td>${model.volumeTotal}</td>
          </tfoot>
      </table>
    `;
  }
}