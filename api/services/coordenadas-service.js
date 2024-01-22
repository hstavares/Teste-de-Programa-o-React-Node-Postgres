function calcularMenorDistancia(coords) {
  try {
    coords.unshift({ Nome: "Empresa", CoordX: 0, CoordY: 0 });

    let menorDistancia = Infinity;
    let melhorPermutacao = [];

    function permutacao(array) {
      const result = [];

      function permutar(arr, indice) {
        if (indice === arr.length - 1) {
          result.push(arr.slice());
        } else {
          for (let i = indice; i < arr.length; i++) {
            [arr[indice], arr[i]] = [arr[i], arr[indice]];
            permutar(arr, indice + 1);
            [arr[indice], arr[i]] = [arr[i], arr[indice]];
          }
        }
      }

      permutar(array, 0);
      return result;
    }

    const permutacoes = permutacao(coords);

    for (const permutacaoAtual of permutacoes) {
      let distanciaTotal = 0;

      for (let i = 0; i < permutacaoAtual.length - 1; i++) {
        distanciaTotal += calcularDistancia(
          permutacaoAtual[i],
          permutacaoAtual[i + 1]
        );
      }

      if (distanciaTotal < menorDistancia) {
        menorDistancia = distanciaTotal;
        melhorPermutacao = permutacaoAtual.slice();
      }
    }

    return {
      rota: melhorPermutacao.map((coord) => coord.Nome),
      distancia: menorDistancia,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function calcularDistancia(coord1, coord2) {
  return Math.sqrt(
    Math.pow(coord2.CoordX - coord1.CoordX, 2) +
      Math.pow(coord2.CoordY - coord1.CoordY, 2)
  );
}

module.exports = { calcularMenorDistancia };
