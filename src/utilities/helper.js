export const formatAmountString = (amountInt) => {
    let result = "£"
    result += Number(parseFloat(amountInt / 100).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2
    });
    return result
}

export const formatAmountNum = (amountInt) => {
    return amountInt / 100;
}

export const formatFullDate = (dateString) => {
    let result = ""
    result += dateString.substring(8) + "/"
    result += dateString.substring(5,7) + "/"
    result += dateString.substring(2, 4)
    return result
}

export const getToSpend = (income, percent) => {
    return (percent / 100) * income;
}

export const calculateRemaining = (income, spent) => {
    return income - spent;
}

export const percentSpent = (toSpend, spent) => {
    result = ((spent/toSpend) * 100).toString();
    result += "%";
    return result;
}