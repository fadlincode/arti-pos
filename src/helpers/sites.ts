// numbering table
export function evalHelper(...args: any[]): any {
    args.pop();
    const expression = args.join('');
    return eval(expression);
}

// print logs
export function logHelper(log: any): void {
    console.log(log);
}

// ternary
export function ternary(condition: any, valueIfTrue: any, valueIfFalse: any): any {
    return condition ? valueIfTrue : valueIfFalse;
}

