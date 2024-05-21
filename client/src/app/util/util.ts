export function getCookie(key: string){
    const c = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return c ? c.pop() : "";
}

export function currencyFormat(amount: number){
    return '$' + (amount/100).toFixed(2);
}