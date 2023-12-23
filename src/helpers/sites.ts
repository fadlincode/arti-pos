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

// numbering
export function numbering(currentPage: number, perPage: number, index: number): number {
    return ((currentPage - 1) * perPage) + (index + 1) ;
}

export function showingPagination(currentPage: number, perPage: number, itemCount: number, totalItems: number): string {
    return (((currentPage - 1) * perPage) + (1)) + ' - '+ (((currentPage - 1) * perPage) + itemCount) + ' of ' + totalItems ;
}

