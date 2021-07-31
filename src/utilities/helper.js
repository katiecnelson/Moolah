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
    return (spent/toSpend) * 100;
}

export const percentSpentString = (percentSpent) => {
    return percentSpent.toString() + "%";
}

//TODO: Am I using the below function anywhere?!

export const getDateToDisplay = () => {
    let day = new Date().getDate().toString();
    let month = (new Date().getMonth() + 1).toString();
    let year = new Date().getFullYear().toString().substring(2);

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (day + "/" + month + "/" + year)
}

export const getDateDatabaseFormat = () => {
    let day = new Date().getDate().toString();
    let month = (new Date().getMonth() + 1).toString();
    let year = new Date().getFullYear().toString();

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (year + "-" + month + "-" + day)
}

export const formatDate = (date) => {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString().substring(2);

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (day + "/" + month + "/" + year)
}

export const formatDateForDatabase = (date) => {
    result = "20";
    result += date.substring(6,8) + "-";
    result += date.substring(3,5) + "-";
    result += date.substring(0,2)
    return result;
}

export const amountToDatabase = (amount) => {
    return Math.round(amount * 100)
}

export const categoryNameToID = (categoryName) => {
    switch(categoryName) {
        case "one":
          return 1
        case "two":
          return 2
        case "three":
            return 3
        default:
          return 0
      }
}

export const getCurrentMonth = () => {
    let month = (new Date().getMonth() + 1).toString();
    let year = new Date().getFullYear().toString();

    if (month.length === 1) month = "0" + month;

    return (year + "-" + month)
}