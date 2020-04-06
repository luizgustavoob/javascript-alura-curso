import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegociacaoController';

export class NegociacoesView extends View {

  constructor(element) {
    super(element);
    element.addEventListener('click', function(event) {
      if (event.target.nodeName == 'TH') {
        currentInstance().ordenar(event.target.textContent.toLowerCase());
      }
    });
  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
          <thead>
              <tr>
                  <th>Data</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                  <th>Volume</th>
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