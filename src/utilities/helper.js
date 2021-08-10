// Formats an integer representing pence as a currency string
export const formatAmountString = (amountInt) => {
    let result = "£";
    result += parseFloat(amountInt / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return result;
};

// Formats an integer representing pence as a currency float
export const formatAmountNum = (amountInt) => {
    return amountInt / 100;
};

// Formats YYYY-MM-DD dates strings as DD/MM/YY
export const formatFullDate = (dateString) => {
    let result = "";
    result += dateString.substring(8) + "/";
    result += dateString.substring(5,7) + "/";
    result += dateString.substring(2, 4);
    return result;
};

// Uses percentages to calculate amount to spend in a category
export const getToSpend = (income, percent) => {
    return (percent / 100) * income;
};

// Calculates the amount left to spend in a category
export const calculateRemaining = (income, spent) => {
    return income - spent;
};

// Calculates the percentage of a category's total already spent
export const percentSpent = (toSpend, spent) => {
    return parseFloat(((spent/toSpend) * 100).toFixed(2));
};

// Casts percent spent in a category to a string with a % at the end
export const percentSpentString = (percentSpent) => {
    return percentSpent.toString() + "%";
};

// Gets today's date in YYYY-MM-DD format for the database
export const getTodayDateDatabase = () => {
    let day = new Date().getDate().toString();
    let month = (new Date().getMonth() + 1).toString();
    let year = new Date().getFullYear().toString();

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (year + "-" + month + "-" + day);
};

// Formats a date object formatted as a UK date string DD/MM/YY
export const formatDate = (date) => {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString().substring(2);

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (day + "/" + month + "/" + year);
};

// Formats a date from the date picker as a YYYY-MM-DD string
export const formatDateDBStyle = (date) => {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();

    if (day.length === 1) day = "0" + day;
    if (month.length === 1) month = "0" + month;

    return (year + "-" + month + "-" + day);
};

// Returns a date object formatted as a string for the db: YYYY-MM-DD
export const formatDateForDatabase = (date) => {
    result = "20";
    result += date.substring(6,8) + "-";
    result += date.substring(3,5) + "-";
    result += date.substring(0,2);
    return result;
};

// Takes an amount in pounds and turns it into pence for the db
export const amountToDatabase = (amount) => {
    return Math.round(amount * 100);
};

// Takes in a number string and returns the corresponding integer
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

// Returns the current month as a string formatted like YYYY-MM
export const getCurrentMonth = () => {
    let month = (new Date().getMonth() + 1).toString();
    let year = new Date().getFullYear().toString();

    if (month.length === 1) month = "0" + month;

    return (year + "-" + month);
};

// Takes a date formatted as YYYY-MM-DD and returns e.g. January 2021
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

// Takes an array of transaction objects and formats it for section list
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

// Takes an array of reminder objects and returns count of overdue/not complete
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

// Takes an array of transaction objects, filters for current month, sorts by date
export const filterSortDash = (data) => {
    return data.filter(transaction => transaction["Date"]
    .substring(0,7) === getCurrentMonth())
    .sort((a, b) => b["ID"] - a["ID"])
    .sort((a, b) => b["Date"].localeCompare(a["Date"]));
};

// Takes an array of transaction objects, filters for current month and category, sorts by date
export const filterSortTabs = (data, category) => {
    return data.filter(transaction => transaction["CategoryValue"] === category 
    && transaction["Date"].substring(0,7) === getCurrentMonth())
    .sort((a, b) => b["ID"] - a["ID"])
    .sort((a, b) => b["Date"].localeCompare(a["Date"]));
};

// Sorts an array of object data by any field in ascending order
export const sortAscending = (data, sortBy) => {
    return data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
};

// Finds a tag in an array of tag objects
export const findTag = (data, name) => {
    return data.find(e => e["Name"].toLowerCase() === name.toLowerCase());
};