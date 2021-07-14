export const formatAmountString = (amountInt) => {
    return "£" + (amountInt / 100).toFixed(2).toString();
}

export const formatAmountNum = (amountInt) => {
    return (amountInt / 100).toFixed(2)
}

export const formatFullDate = (dateString) => {
    let result = ""
    for (let i = dateString.length - 1; i >= 2; i--) {
        if (dateString[i] === "-") {
            result += "/";
        } 
        else result += dateString[i];
    }
    return result
}