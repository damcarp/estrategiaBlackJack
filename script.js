function calculateStrategy() {
    let playerHandInput = document.getElementById('playerHand').value.trim();
    let dealerCardInput = document.getElementById('dealerCard').value.trim();
    let pair = document.getElementById('pair').value.trim().toLowerCase();
    let result = ''; // Resultado final
    let resultClass = ''; // Color del resultado

    // Convertir los valores de las manos del jugador y del crupier a números
    let playerHand = parseInt(playerHandInput);
    let dealerCard = parseInt(dealerCardInput);

    // Validar las entradas
    if (isNaN(playerHand) || isNaN(dealerCard) || playerHand < 4 || playerHand > 21 || dealerCard < 2 || dealerCard > 11) {
        result = "Por favor, ingresa valores válidos."; // Error si las entradas no son válidas
        resultClass = "error";
    } else if (pair === "si" && playerHand % 2 === 0) {
        // Estrategia para pares
        switch (playerHand) {
            case 16:
                result = "Deberías hacer Split (dividir).";
                resultClass = "split";
                break;
            case 18:
                if (dealerCard === 7 || (dealerCard >= 10 && dealerCard <= 11)) {
                    result = "Deberías Plantarte (Stand).";
                    resultClass = "stand";
                } else {
                    result = "Deberías hacer Split (dividir).";
                    resultClass = "split";
                }
                break;
            case 20:
                result = "Deberías Plantarte (Stand).";
                resultClass = "stand";
                break;
            default:
                result = "Deberías hacer Split (dividir).";
                resultClass = "split";
        }
    } else if (playerHand >= 17) {
        result = "Deberías Plantarte (Stand).";
        resultClass = "stand";
    } else if (playerHand === 11) {
        result = "Deberías Duplicar la apuesta (Double Down).";
        resultClass = "double-down";
    } else {
        result = "Deberías Pedir carta (Hit).";
        resultClass = "hit";
    }

    // Mostrar el resultado en la interfaz de usuario
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
    resultElement.className = `result ${resultClass}`;
}

document.getElementById('playerHand').addEventListener('input', function() {
    const value = this.value;
    if (value < 4 || value > 21 || isNaN(value)) {
        this.classList.add('invalid');
        this.classList.remove('valid');
    } else {
        this.classList.add('valid');
        this.classList.remove('invalid');
    }
});

document.getElementById('dealerCard').addEventListener('input', function() {
    const value = this.value;
    if (value < 2 || value > 11 || isNaN(value)) {
        this.classList.add('invalid');
        this.classList.remove('valid');
    } else {
        this.classList.add('valid');
        this.classList.remove('invalid');
    }
});

window.onload = function() {
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateStrategy);
};
