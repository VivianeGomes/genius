let order = [];
let clickedOrder = [];
let score = 0;

/*  0 - verde
    1 - vermelho
    2 - amarelo
    3 - azul
*/

const azul = document.querySelector('.azul');
const vermelho = document.querySelector('.vermelho');
const verde = document.querySelector('.verde');
const amarelo = document.querySelector('.amarelo');


//cria ordem aleatoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a prox cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number -250);

    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//checa se botoes clicados sao os mesmos da ordem do jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nAcertaste! Avante ao próximo nível!`);
        nextLevel();
    }
}

//funcao para o click do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('.selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('.selected');
        checkOrder();
    }, 250)

    
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return verde;
    } else if (color == 1) {
        return vermelho;
    } else if (color == 2) {
        return amarelo;
    } else if (color == 3) {
        return azul;
    }
}

let nextLevel = () => {
    score++;
    shuffleOrder();
}

let gameOver = () => {
    alert(`Pontuação: ${score}\nVocê perdeu o jogo :(\nClique em OK para recomeçar`);
    order = [];
    clickedOrder = [];

    playGame();
}

let playGame = () => {
    alert('Bem vindo ao Genius. Iniciando...')
    score = 0;

    nextLevel();
}

//eventos de clique nas cores
verde.onclick = () => click(0);
vermelho.onclick = () => click(1);
amarelo.onclick = () => click(2);
azul.onclick = () => click(3);

playGame();

//colocar condição de parada e ou aumentar dificuldade do jogo