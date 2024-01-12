
export function deposite(amount) {
    return { type: "deposite", payload: amount};
}

export function withdraw(amount) {
    return { type: "withdraw", payload: amount}
}