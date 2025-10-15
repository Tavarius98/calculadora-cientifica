document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const helpWindow = document.getElementById("helpWindow");
    let isPoweredOn = false; // Estado da calculadora (ligada/desligada)

    // Mapeamento das teclas do teclado para os valores da calculadora
    const keyMap = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        'Enter': '=',
        '=': '=',
        'Backspace': 'C',
        'Escape': 'C',
        '.': '.',
        's': 'sin',
        'c': 'cos',
        't': 'tan',
        'l': 'log',
        'r': '√',
        '^': '^',
        '(': '(',
        ')': ')'
    };

    // Função para exibir uma mensagem temporária no display
    function showMessage(message) {
        display.classList.add("message"); // Aplica o estilo da mensagem
        display.value = message;
        setTimeout(() => {
            display.value = "";
            display.classList.remove("message"); // Remove o estilo da mensagem
        }, 1000); // A mensagem desaparece após 1 segundo
    }

    // Função para ligar/desligar a calculadora
    function togglePower() {
        isPoweredOn = !isPoweredOn; // Alterna o estado
        if (isPoweredOn) {
            display.classList.remove("power-off"); // Mostra o placeholder
            showMessage("Bem-vindo");
        } else {
            display.classList.add("power-off"); // Esconde o placeholder
            showMessage("Até mais");
        }
    }

    // Função para processar o clique nos botões
    function handleButtonClick(value) {
        if (!isPoweredOn) return; // Ignora cliques se a calculadora estiver desligada

        if (value === "C") {
            display.value = "";
        } else if (value === "=") {
            try {
                display.value = eval(display.value);
            } catch (error) {
                alert("Expressão inválida");
                display.value = "";
            }
        } else if (value === "√") {
            display.value = Math.sqrt(eval(display.value));
        } else if (value === "^") {
            display.value += "**";
        } else if (value === "log") {
            display.value = Math.log10(eval(display.value));
        } else if (value === "sin") {
            display.value = Math.sin(eval(display.value));
        } else if (value === "cos") {
            display.value = Math.cos(eval(display.value));
        } else if (value === "tan") {
            display.value = Math.tan(eval(display.value));
        } else if (value === "arcsin") {
            display.value = Math.asin(eval(display.value));
        } else if (value === "arccos") {
            display.value = Math.acos(eval(display.value));
        } else if (value === "arctan") {
            display.value = Math.atan(eval(display.value));
        } else if (value === "ln") {
            display.value = Math.log(eval(display.value));
        } else if (value === "exp") {
            display.value = Math.exp(eval(display.value));
        } else if (value === "∛") {
            display.value = Math.cbrt(eval(display.value));
        } else if (value === "!") {
            let num = eval(display.value);
            if (num < 0) {
                alert("Fatorial de número negativo não é definido.");
                display.value = "";
            } else {
                let result = 1;
                for (let i = 2; i <= num; i++) {
                    result *= i;
                }
                display.value = result;
            }
        } else if (value === "%") {
            display.value = eval(display.value) / 100;
        } else if (value === "π") {
            display.value += Math.PI;
        } else if (value === "e") {
            display.value += Math.E;
        } else if (value === "sinh") {
            display.value = Math.sinh(eval(display.value));
        } else if (value === "cosh") {
            display.value = Math.cosh(eval(display.value));
        } else if (value === "tanh") {
            display.value = Math.tanh(eval(display.value));
        } else if (value === "deg2rad") {
            display.value = eval(display.value) * (Math.PI / 180);
        } else if (value === "rad2deg") {
            display.value = eval(display.value) * (180 / Math.PI);
        } else if (value === "mod") {
            let [a, b] = display.value.split("%");
            display.value = a % b;
        } else if (value === "10^x") {
            display.value = Math.pow(10, eval(display.value));
        } else if (value === "abs") {
            display.value = Math.abs(eval(display.value));
        } else if (value === "rand") {
            display.value = Math.random();
        } else if (value === "ceil") {
            display.value = Math.ceil(eval(display.value));
        } else if (value === "floor") {
            display.value = Math.floor(eval(display.value));
        } else if (value === "round") {
            display.value = Math.round(eval(display.value));
        } else {
            display.value += value;
        }
    }

    // Função para simular o efeito de pressionar o botão
    function pressButton(value) {
        const button = document.querySelector(`.btn[data-value="${value}"]`);
        if (button) {
            button.classList.add("active");
            setTimeout(() => button.classList.remove("active"), 100);
        }
    }

    // Adiciona listeners para os botões da calculadora
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.getAttribute("data-value");
            if (value === "power") {
                togglePower();
            } else if (value === "help") {
                helpWindow.style.display = helpWindow.style.display === "block" ? "none" : "block"; // Alterna a visibilidade da janela de ajuda
                this.classList.add("active"); // Adiciona a classe active ao botão de ajuda
                setTimeout(() => this.classList.remove("active"), 100); // Remove a classe active após 100ms
            } else {
                handleButtonClick(value);
            }
            pressButton(value);
        });
    });

    // Adiciona listener para o teclado
    document.addEventListener("keydown", function (event) {
        const key = event.key;
        if (keyMap.hasOwnProperty(key)) {
            event.preventDefault(); // Evita o comportamento padrão da tecla
            const value = keyMap[key];
            handleButtonClick(value);
            pressButton(value);
        }

        // Verifica se Shift + Enter foi pressionado
        if (event.shiftKey && event.key === "Enter") {
            event.preventDefault(); // Evita o comportamento padrão do Enter
            togglePower(); // Liga/desliga a calculadora
        }
    });
});