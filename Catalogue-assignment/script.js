const BigNumber = require('bignumber.js');
const fs = require('fs');

function fromBaseToDecimal(num, base) {
    if (base <= 10) {
        return new BigNumber(num, base);
    }
    
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
    let decimal = new BigNumber(0);
    let power = new BigNumber(1);
    
    for (let i = num.length - 1; i >= 0; i--) {
        const digit = digits.indexOf(num[i].toLowerCase());
        if (digit === -1 || digit >= base) {
            throw new Error(`Invalid digit for base ${base}`);
        }
        decimal = decimal.plus(new BigNumber(digit).times(power));
        power = power.times(base);
    }
    
    return decimal;
}

function decodePoints(testCase) {
    const points = [];
    const n = testCase.keys.n;
    
    for (let i = 1; i <= n; i++) {
        if (testCase[i]) {
            const x = new BigNumber(i);
            const y = fromBaseToDecimal(testCase[i].value, parseInt(testCase[i].base));
            points.push({ x, y });
        }
    }
    
    return points;
}

function findConstantTerm(points, k) {
    let result = new BigNumber(0);
    points = points.slice(0, k);
    
    for (let i = 0; i < k; i++) {
        let term = points[i].y;
        
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const numerator = points[j].x.negated();
                const denominator = points[i].x.minus(points[j].x);
                term = term.times(numerator).dividedBy(denominator);
            }
        }
        
        result = result.plus(term);
    }
    
    return result;
}

function processTestCase(testCase) {
    const points = decodePoints(testCase);
    const k = testCase.keys.k;
    const secret = findConstantTerm(points, k);
    return secret.toString();
}

function main() {
    const testCase1 = JSON.parse(fs.readFileSync('data1.json', 'utf8'));
    const testCase2 = JSON.parse(fs.readFileSync('data2.json', 'utf8'));

    console.log("Secret for Test Case 1:", processTestCase(testCase1));
    console.log("Secret for Test Case 2:", processTestCase(testCase2));
}

main();