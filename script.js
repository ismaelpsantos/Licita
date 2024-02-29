document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-assessment');
  const limparBtn = document.getElementById('limpar');
  const linksDiv = document.getElementById('links');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = new FormData(form);

    // Obter as respostas do formulário
    const natureza = data.get('natureza');
    const valorEstimado = Number(data.get('valor_estimado'));
    const urgencia = data.get('urgencia');
    const complexidade = data.get('complexidade');
    const inovacao = data.get('inovacao');
    const criterio = data.get('criterio');
    const conhecimento = data.get('conhecimento');
    const legislacao = data.get('legislacao');
    const orientacao = data.get('orientacao');

    // Validar as respostas
    if (!natureza || !valorEstimado || !criterio) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    // Definir as regras para determinar a modalidade de licitação
    const regras = {
      bens_comuns: {
        valor: {
          menor_que_100_milhoes: 'Pregão',
          maior_que_100_milhoes: 'Concorrência',
        },
      },
      bens_complexos: {
        valor: {
          qualquer: 'Concorrência',
        },
      },
      obras: {
        valor: {
          qualquer: 'Concorrência',
        },
      },
      alienacao: {
        valor: {
          qualquer: 'Leilão',
        },
      },
      projetos: {
        valor: {
          qualquer: 'Concurso',
        },
      },
      inovacao: {
        valor: {
          qualquer: 'Diálogo Competitivo',
        },
      },
    };

    // Determinar a modalidade de licitação
    let modalidade = '';
    if (regras.hasOwnProperty(natureza)) {
      const regraValor = regras[natureza].valor;
      if (regraValor.hasOwnProperty('qualquer')) {
        modalidade = regraValor.qualquer;
      } else if (regraValor.hasOwnProperty('menor_que_100_milhoes') && valorEstimado < 100000000) {
        modalidade = regraValor.menor_que_100_milhoes;
      } else if (regraValor.hasOwnProperty('maior_que_100_milhoes') && valorEstimado >= 100000000) {
        modalidade = regraValor.maior_que_100_milhoes;
      }
    }

    // Exibir a modalidade de licitação
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<strong>A modalidade de licitação mais adequada é: ${modalidade}</strong>`;

    // Exibir links se as condições forem atendidas
    if (conhecimento === 'nao' && legislacao === 'sim') {
      linksDiv.innerHTML = `
        <ul>
          <li><a href="https://www.planalto.gov.br/ccivil_03/_Ato2019-2022/2021/Lei/L14133.htm">Nova Lei de Licitações e Contratos</a></li>
          <li><a href="https://portal.tcu.gov.br/licitacoes-e-contratos-orientacoes-e-jurisprudencia-do-tcu.htm">Cartilha Nova Lei de Licitações e Contratos</a></li>
        </ul>
      `;
    } else {
      linksDiv.innerHTML = '';
    }
  });

  // Adicionar evento de limpar formulário
  limparBtn.addEventListener('click', function() {
    form.reset();
    resultado.innerHTML = '';
    linksDiv.innerHTML = '';
  });
});
