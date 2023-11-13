let output = document.querySelector('.expr');
let screen = document.querySelector('.answer');
let precision = 0;

const checkPrecision = () => {
    let temp = 0;
    let k = 1;;
    for (let i = 1; i < expression.length; i++) {
        if (expression[i - k] == '.') {
            temp++;
            k++;
        }
        if (['*', '-', '/', '+'].includes(expression[i])) {
            precision = Math.max(precision, temp);
            temp = 0;
            k = 1;
        }
    }

    precision = Math.max(precision, temp);
    console.log(temp);
};


let expression = ""

const out = (text) => {
    let moddedText = text.replaceAll('*', '×');
    moddedText = moddedText.replaceAll('/', '÷');
    output.textContent = moddedText;
}

const num = (x) => {
    if (x == '.') {
        for (let i = expression.length - 1; i >= 0; i--) {
            if (['*', '-', '/', '+'].includes(expression[i])) {
                break;
            }
            else if (expression[i] == '.') {
                return;
            }
        }
    }
    document.querySelector('.answer').classList.remove('screenAnimate');
    expression += x;
    out(expression);
    bigAns();
}

const optr = op => {
    document.querySelector('.answer').classList.remove('screenAnimate');
    if (expression.length > 0 && isNaN(expression[expression.length - 1])) {
        expression = expression.slice(0, -1);
    }

    expression += op;
    out(expression);
    checkPrecision();
}

const answer = () => {
    checkPrecision();
    try {
        out(String(expression));
        expression = String(1 * eval(expression).toFixed(precision));
        output.textContent = undefined;
        document.querySelector('.answer').classList.add('screenAnimate');
    } catch (error) {
        out("Wrong Expression")
        console.error(error)
    }
}

const bigAns = () => {  
    checkPrecision();
    try {
        screen.textContent = 1 * eval(expression).toFixed(precision);
    } catch (error) {
        screen.textContent = '';
    }
}

const clears = () => {
    precision = 0;
    expression = '';
    screen.textContent = '';
    out('');
};

const backspace = () => {
    expression = expression.slice(0, -1);
    checkPrecision();
    out(expression);
    bigAns();
}

//depreciated 
const forceUpdate = () => {
    expression = output.value;
}

//depreciated
const animate = () => {
    if (document.querySelector('.answer').classList.contains('screenAnimate')) {
        document.querySelector('.answer').classList.remove('screenAnimate');
    } else {
        document.querySelector('.answer').classList.add('screenAnimate');
    }
}