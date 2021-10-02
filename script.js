// Declaração das cartas
cartas = [
  {
    Nome: "Bulbasaur",
    Atributos: {Ataque: 49, Defesa: 49, Velocidade: 45},
    img: "./imagens/personagens/001bulbasaur.jpg",
    moldura: "./imagens/cartas/grass.png"
  },
  {
    Nome: "Ivysaur",
    Atributos: {Ataque: 62, Defesa: 63, Velocidade: 60},
    img: "./imagens/personagens/002ivysaur.jpg",
    moldura: "./imagens/cartas/grass.png"
  },
  {
    Nome: "Venusaur",
    Atributos: {Ataque: 82, Defesa: 83, Velocidade: 80},
    img: "./imagens/personagens/003venusaur.jpg",
    moldura: "./imagens/cartas/grass.png"
  },
  {
    Nome: "Charmander",
    Atributos: {Ataque: 52, Defesa: 43, Velocidade: 65},
    img: "./imagens/personagens/004charmander.jpg",
    moldura: "./imagens/cartas/fire.png"
  },
  {
    Nome: "Charmeleon",
    Atributos: {Ataque: 64, Defesa: 58, Velocidade: 80},
    img: "./imagens/personagens/005charmeleon.jpg",
    moldura: "./imagens/cartas/fire.png"
  },
  {
    Nome: "Charizard",
    Atributos: {Ataque: 84, Defesa: 78, Velocidade: 100},
    img: "./imagens/personagens/006charizard.jpg",
    moldura: "./imagens/cartas/fire.png"
  },
  {
    Nome: "Squirtle",
    Atributos: {Ataque: 48, Defesa: 65, Velocidade: 43},
    img: "./imagens/personagens/007squirtle.jpg",
    moldura: "./imagens/cartas/water.png"
  },
  {
    Nome: "Wartortle",
    Atributos: {Ataque: 63, Defesa: 80, Velocidade: 58},
    img: "./imagens/personagens/008wartortle.jpg",
    moldura: "./imagens/cartas/water.png"
  },
  {
    Nome: "Blastoise",
    Atributos: {Ataque: 83, Defesa: 100, Velocidade: 78},
    img: "./imagens/personagens/009blastoise.jpg",
    moldura: "./imagens/cartas/water.png"
  },
  
  
];

// Onde serão salvas as cartas sorteadas
var cartaJogador;
var cartaPC;
var cartasJogo;


var placar = [0, 0, 0]; // Placar: índice 0 = jogador ; índice 1 = PC; índice 2 = empates
exibePlacar();

var tagID = ["Jogador", "PC"];
var cartaID = ["carta-jogador", "carta-maquina"]; // ids no HTML da posição do texto
zerarCarta(cartaID[0]);
zerarCarta(cartaID[1]);
// Zera as cartas (na tela) (mostra o verso da carta)

botaoJogar(); // Coloca o botão 'Jogar' na tela

// Coloca o botão 'Jogar' na tela
function botaoJogar() {
  var botao = document.getElementById("botao-jogar");
  var botaoHTML =
    '<button class="button-jogar" type="button" id="btnJogar" onclick="jogar()" disabled="false">Jogar</button>';
  botao.innerHTML = botaoHTML;
}

// Zerar cartas na tela inicial
function zerarCarta(id) {
  var opcoes = document.getElementById(id);
  // Mostra o verso da carta
  var opcoesTexto =
    '<img src="https://guloseimasnerds.files.wordpress.com/2017/02/verso-carta-pkm.jpg" style=" width: inherit; height: inherit; position: absolute;">';
  opcoes.innerHTML = opcoesTexto;
}

// Exibir o placar na tela
function exibePlacar() {
  var exibePlacar0 = document.getElementById("placar0");
  var textoPlacar0 = placar[0];
  exibePlacar0.innerHTML = textoPlacar0;
  var exibePlacar1 = document.getElementById("placar1");
  var textoPlacar1 = placar[1];
  exibePlacar1.innerHTML = textoPlacar1;
}

// Sortear cartas
//   Limpa exibição das cartas (mostra o verso), limpa o campo de resultados
//   Coloca o botão 'Jogar' na tela
//   Sorteia números aleatórios p/ Jogador e p/ PC (impede número repetido)
//   Pega cartas correspondentes aos números, desabilita botão 'Sortear'
//   Exibe carta do Jogador com atributos e botões p/ seleção
function sortearCarta() {
  // Criar cópia do array de cartas
  //var copia = cartas;

  // Zera carta do PC
  zerarCarta(cartaID[1]);

  botaoJogar(); // Coloca o botão 'Jogar' na tela

  // Limpa campo de resultados
  var elementoResultado = document.getElementById("resultado");
  elementoResultado.innerHTML = "";

  // Numero aleatório p/ selecionar sua carta
  var numeroJogador = parseInt(Math.random() * cartas.length);
  cartaJogador = cartas[numeroJogador];
  //console.log(cartaJogador);

  // Número aleatório p/ selecionar carta PC
  var numeroPC = parseInt(Math.random() * cartas.length);
  // Fazer verificação p/ que não haja repetido
  while (numeroPC == numeroJogador) {
    var numeroPC = parseInt(Math.random() * cartas.length);
  }
  //(criar cópia do array e ir retirando as cartas? <- ver depois)
  cartaPC = cartas[numeroPC];
  //console.log(cartaPC);

  cartasJogo = [cartaJogador, cartaPC];

  // Desabilitar botão 'sortear cartas' e habilitar o botão 'jogar'
  document.getElementById("btnSortear").disabled = true;

  // (botão de jogar desabilitado até um atributo ser selecionado)
  // document.getElementById("btnJogar").disabled = false;

  exibirCarta(tagID[0], cartaID[0], 0, 0, 0);
  // Mostra carta jogador com botões p/ selecionar
}

// Função geral p/ exibir carta
//  Puxa imagem e moldura correspondente do personagem
//  Lista os atributos da carta (com ou sem botões -> dependente da variável 'jogo')

// tagID   -> tagID[0]="Jogador" (p/ jogador) ou tagID[1]="PC" (p/ PC)
// cartaID -> "carta-jogador" (cartaID[0]) ou "carta-PC" (cartaID[1])
// ID      -> ID=0 (p/ jogador) ou ID=1 (p/ PC)
// jogo    -> jogo=0 (opções c/ botões) ou jogo=1 (opções s/ botões)
// atributoSelect -> atributo selecionado (atributoSelect=0 caso ainda não tenha sido selecionado)
function exibirCarta(tagID, cartaID, ID, jogo, atributoSelect) {
  var divCarta = document.getElementById(cartaID);
  divCarta.style.backgroundImage = `url(${cartasJogo[ID].img})`;
  // Notação tradicional:
  // divCarta.style.backgroundImage = "url(" + cartasJogo[ID].img + ")"

  var moldura = "";
  moldura +=
    '<img src="' +
    cartasJogo[ID].moldura +
    '" style=" width: inherit; height: inherit; position: absolute;">';

  var tagHTML = "<div id='" + tagID + "' class='carta-status'>";

  var opcoesTexto = "";
  for (var atributo in cartasJogo[ID].Atributos) {
    if (jogo == 0) {
      opcoesTexto +=
        "<input type='radio' onclick='habilitarJogar()' name='atributo' id='" +
        atributo +
        "' value='" +
        atributo +
        "'>";
      opcoesTexto += "<label for='" + atributo + "'>";
      opcoesTexto +=
        atributo + ": " + cartasJogo[ID].Atributos[atributo] + "</label><br>";
    } else {
      if (atributo == atributoSelect) {
        opcoesTexto +=
          "<p style='color: red;'><strong>" +
          atributo +
          ": " +
          cartasJogo[ID].Atributos[atributo] +
          "</strong></p>";
      } else {
        opcoesTexto +=
          "<p>" + atributo + ": " + cartasJogo[ID].Atributos[atributo] + "</p>";
      }
    }
  }

  var nome = `<p class="carta-subtitle">${cartasJogo[ID].Nome}</p>`;

  divCarta.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

// Habilita botão 'jogar' ao selecionar um atributo da lista
function habilitarJogar() {
  document.getElementById("btnJogar").disabled = false;
}

// Obter atributo selecionado
function obterAtributo() {
  var radioAtributos = document.getElementsByName("atributo");

  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked == true) {
      return radioAtributos[i].value;
    }
  }
}

// Botão de jogar
//   Pega atributo selecionado e compara com o da carta do PC
//   Imprime resultado na tela e adiciona pontuação no placar
//   Mostra carta do PC, re-exibe carta do Jogador e desabilita/reabilita botões
function jogar() {
  // Obtem o atributo selecionado
  var atributoSelect = obterAtributo();
  //console.log(cartaJogador.Atributos[atributoSelect]);

  var valorCartaJogador = cartaJogador.Atributos[atributoSelect];
  var valorCartaPC = cartaPC.Atributos[atributoSelect];

  // Faz comparação e dá resultado (computar em um placar)
  var divResultado = document.getElementById("resultado");
  var elementoResultado;

  if (valorCartaJogador > valorCartaPC) {
    elementoResultado = "<p class='resultado-final'>Muito bem treinador, seu pokemon é mais forte que o da máquina</p>";
    placar[0]++; // Adiciona um ponto para jogador [índice 0] no placar
  } else if (valorCartaJogador < valorCartaPC) {
    elementoResultado = "<p class='resultado-final'>Você perdeu, seu pokemon é mais fraco que o da máquina</p>";
    placar[1]++; // Adiciona um ponto para o PC [índice 1] no placar
  } else {
    elementoResultado =
      "<p class='resultado-final'>Empatou, você e a máquina tem pokemons com poderes iguais</p>";
    placar[2]++; // Adiciona um no placar de empates
  }

  // Escrevendo o placar
  elementoResultado += "<p class='placar_peq'>| Placar: (Você) " + placar[0];
  elementoResultado += " x ";
  elementoResultado += placar[1] + " (PC) |</p>";

  divResultado.innerHTML = elementoResultado;
  exibePlacar();

  // Mostra a carta do PC
  exibirCarta(tagID[1], cartaID[1], 1, 1, atributoSelect);
  // Mostra a carta do jogador s/ botões p/ selecionar
  exibirCarta(tagID[0], cartaID[0], 0, 1, atributoSelect);

  // Substitui o botão 'Jogar' por um de sortear
  var botao = document.getElementById("botao-jogar");
  var botaoHTML =
    '<button class="button-jogar" type="button" id="btnSortear" onclick="sortearCarta()">Sortear outra carta</button>';
  botao.innerHTML = botaoHTML;

  // Botão sortear cartas reabilitado, botão jogar desabilitado
  document.getElementById("btnSortear").disabled = false;
  // document.getElementById("btnJogar").disabled = true;
  // (depois refazer com um número estabelecido de rodadas, usar botão 'próxima carta')
}

// Função para reiniciar jogo (volta para o início, zera o placar)
//   Reabilita botão 'Sortear', desabilita botão 'Jogar'
//   Limpa campo de resultados e vira as cartas para baixo (zerar cartas)
//   Zera o placar
function zerarJogo() {
  // Botão sortear cartas reabilitado, botão jogar desabilitado
  document.getElementById("btnSortear").disabled = false;
  botaoJogar();

  // Limpa campo de resultados
  var elementoResultado = document.getElementById("resultado");
  elementoResultado.innerHTML = "";

  // Coloca as cartas viradas para baixo
  zerarCarta(cartaID[0]);
  zerarCarta(cartaID[1]);

  // Zera o placar
  placar = [0, 0, 0]; // Placar: índice 0 = jogador ; índice 1 = PC ; índice 2 = empates
  exibePlacar();
}
