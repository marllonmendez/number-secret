function displayText(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2});
}

function displayTextDefault () {
    displayText('h1', 'Jogo do número secreto');
    displayText('p', 'Escolha um número entre 1 e 10');
    displayText('button', 'Chute');
}

displayTextDefault();

let input = document.querySelector('input');
let numberList = [];
let maxNumber = 10;
let numberSecret = numberRamdom();
let attempt = 1;

function numberRamdom() {
    let numberSelected = Math.floor(Math.random() * maxNumber);
    let amountNumbers = numberList.length
    if (amountNumbers === maxNumber) {
        numberList = [];
    }
    if (numberList.includes(numberSelected)) {
        return numberRamdom();
    } else {
        numberList.push(numberSelected)
        return numberSelected;
    }

}

function verificationNumber() {
    let myNumber = parseInt(input.value);
    if (numberSecret !== myNumber) {
        if (isNaN(myNumber) || myNumber === null) {
            displayText('h1', 'Erro!');
            displayText('p', 'O número invalido ou nulo');
            newGameButton(false);
            kickButton(true);
            return
        }
        if (numberSecret > myNumber) {
            displayText('p', `O número secreto é maior que: ${myNumber}`);
        } else {
            displayText('p', `O número secreto é menor que: ${myNumber}`);
        }
        displayText('h1', 'Você errou!');
        clearInput();
        displayText('button', 'Tente Novamente');
    } else {
        let newAttempt = attempt === 1 ? 'tentativa!' : 'tentativas'
        displayText('h1', 'Parabéns!');
        displayText('p', `Você descobriu o número secreto: ${numberSecret} com ${attempt} ${newAttempt}.`);
        newGameButton(false);
        kickButton(true);
    }
    attempt++
}

function newGameButton(status) {
    document.getElementById('reiniciar').disabled = status;
}

function kickButton(status) {
    document.querySelector('button').disabled = status;
}

function clearInput() {
    input.value = '';
}

function newGame() {
    numberSecret = numberRamdom();
    clearInput();
    displayTextDefault();
    newGameButton(true);
    kickButton(false);
}
