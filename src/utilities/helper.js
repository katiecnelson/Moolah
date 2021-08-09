export const formatAmountString = (amountInt) => {
    let result = "£";
    result += parseFloat(amountInt / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return result;
};

export const formatAmountNum = (amountInt) => {
    return amountInt / 100;
};

export const formatFullDate = (dateString) => {
    let result = "";
    result += dateString.substring(8) + "/";
    result += dateString.substring(5,7) + "/";
    result += dateString.substring(2, 4);
    return result;
};

export const getToSpend = (income, percent) => {
    return (percent / 100) * income;
};

export const calculateRemaining = (income, spent) => {
    return income - spent;
};

export const percentSpent = (toSpend, spent) => {
    return parseFloat(((spent/toSpend) * 100).toFixed(2));
};

export const percentSpentString = (percentSpent) => {
    return percentSpent.toString() + "%";
};

export const getTodayDateDatabase = () => {
    let day = new Date().getDate().toString();
    let month = (new Date().getMonth() + 1).toString();
    let year = new Date().getFullYear().toString();

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (year + "-" + month + "-" + day);
};

export const getDateDatabaseFormat = () => {
    let day = new Date().getDate().toString();
    let month = (new Date().getMonth() + 1).toString();
    let year = new Date().getFullYear().toString();

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (year + "-" + month + "-" + day);
};

export const formatDate = (date) => {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString().substring(2);

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (day + "/" + month + "/" + year);
};

//This will allow to format the date from the picker in database-style format
export const formatDateDBStyle = (date) => {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (year + "-" + month + "-" + day);
};

export const formatDateForDatabase = (date) => {
    result = "20";
    result += date.substring(6,8) + "-";
    result += date.substring(3,5) + "-";
    result += date.substring(0,2);
    return result;
};

export const amountToDatabase = (amount) => {
    return Math.round(amount * 100);
};

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
};

export const getCurrentMonth = () => {
    let month = (new Date().getMonth() + 1).toString();
    let year = new Date().getFullYear().toString();

    if (month.length === 1) month = "0" + month;

    return (year + "-" + month);
};

export const getMonthName = (date) => {
    const month = date.substring(5, 7);
    let dateString = "";
    switch (month) {
        case "01":
            dateString = "JANUARY";
          break;
        case "02":
            dateString = "FEBRUARY";
            break;
        case "03":
            dateString = "MARCH";
            break;
        case "04":
            dateString = "APRIL";
            break;
        case "05":
            dateString = "MAY";
            break;
        case "06":
            dateString = "JUNE";
            break;
        case "07":
            dateString = "JULY";
            break;
        case "08":
            dateString = "AUGUST";
            break;
        case "09":
            dateString = "SEPTEMBER";
            break;
        case "10":
            dateString = "OCTOBER";
            break;
        case "11":
            dateString = "NOVEMBER";
            break;
        case "12":
            dateString = "DECEMBER";
            break;
        default:
            dateString = "MONTH"
            break;
      }
      return dateString += " " + date.substring(0, 4);
};

export const processHistoricalData = (data) => {
    const currentMonth = getCurrentMonth();
    const filtered = data.filter(
        transaction => transaction["Date"].substring(0,7) !== currentMonth)
        .sort((a, b) => b["Date"].localeCompare(a["Date"]));
    const result = [];
    filtered.forEach(e => {
        const date = e["Date"].substring(0,7);
        let newObj = result.find(element => element.title === date);
        if (newObj) {
            newObj.total += e["Amount"];
            newObj.data.push(e);
        } else {
            result.push({title: date, data: [e], total: e["Amount"]});
        }
    });
    return result; 
};

// 

export const getBadgeCount = (data) => {
    const today = getTodayDateDatabase();
    let count = 0;
    data.forEach(element => {
        if (element["Date"] <= today && !element["Complete"]) {
            count++;
        } 
    });
    return count;
};

export const filterSortDash = (data) => {
    return data.filter(transaction => transaction["Date"]
    .substring(0,7) === getCurrentMonth())
    .sort((a, b) => b["ID"] - a["ID"])
    .sort((a, b) => b["Date"].localeCompare(a["Date"]));
};

export const filterSortTabs = (data, category) => {
    return data.filter(transaction => transaction["CategoryValue"] === category 
    && transaction["Date"].substring(0,7) === getCurrentMonth())
    .sort((a, b) => b["ID"] - a["ID"])
    .sort((a, b) => b["Date"].localeCompare(a["Date"]));
};

export const sortAscending = (data, sortBy) => {
    return data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
};

export const findTag = (data, name) => {
    return data.find(e => e["Name"].toLowerCase() === name.toLowerCase());
};