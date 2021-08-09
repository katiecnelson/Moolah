import * as helper from "../helper";
import MockDate from "mockdate";

beforeAll(() =>  {
    MockDate.set("2021-7-4");
});

afterAll(() => {
    MockDate.reset();
});

const transactions = [
    {
        "Amount": 1010,
        "CategoryLabel": "NEEDS",
        "CategoryValue": "one",
        "Date": "2021-05-07",
        "Description": "Test1",
        "ID": 1,
        "Tag": "Food",
        "TagID": 5,
    },
    {
        "Amount": 1250,
        "CategoryLabel": "GOALS",
        "CategoryValue": "three",
        "Date": "2021-06-06",
        "Description": "Test2",
        "ID": 2,
        "Tag": "Investing",
        "TagID": 9,
    },
    {
        "Amount": 8721,
        "CategoryLabel": "WANTS",
        "CategoryValue": "two",
        "Date": "2021-07-02",
        "Description": "Test3",
        "ID": 3,
        "Tag": "Donations",
        "TagID": 2,
    },
    {
        "Amount": 5525,
        "CategoryLabel": "WANTS",
        "CategoryValue": "two",
        "Date": "2021-07-09",
        "Description": "Test4",
        "ID": 4,
        "Tag": "Personal",
        "TagID": 11,
    },
    {
        "Amount": 135,
        "CategoryLabel": "NEEDS",
        "CategoryValue": "one",
        "Date": "2021-07-07",
        "Description": "Test5",
        "ID": 5,
        "Tag": "Food",
        "TagID": 5,
    },
    {
        "Amount": 65000,
        "CategoryLabel": "NEEDS",
        "CategoryValue": "one",
        "Date": "2021-07-03",
        "Description": "Test6",
        "ID": 6,
        "Tag": "Mortgage",
        "TagID": 10,
    },
    {
        "Amount": 3741,
        "CategoryLabel": "GOALS",
        "CategoryValue": "three",
        "Date": "2021-07-12",
        "Description": "Test7",
        "ID": 7,
        "Tag": "Credit Payoff",
        "TagID": 1,
    },
];

const tags = [
    {"ID": 9, "Name": "Investing"},
    {"ID": 12, "Name": "Rent"},
    {"ID": 10, "Name": "Mortgage"},
    {"ID": 15, "Name": "Tuition"},
    {"ID": 21, "Name": "Holiday"},
];

const remindersOne = [
    {"Complete": 0, "Date": "2021-07-07", "Description": "Test1", "ID": 1},
    {"Complete": 1, "Date": "2021-07-02", "Description": "Test2", "ID": 2},
    {"Complete": 0, "Date": "2021-08-08", "Description": "Test3", "ID": 3},
    {"Complete": 0, "Date": "2021-07-03", "Description": "Test4", "ID": 4}
];

const remindersTwo = [
    {"Complete": 0, "Date": "2021-07-01", "Description": "Test1", "ID": 1},
    {"Complete": 1, "Date": "2021-07-02", "Description": "Test2", "ID": 2},
    {"Complete": 0, "Date": "2021-07-03", "Description": "Test3", "ID": 3},
    {"Complete": 0, "Date": "2021-07-04", "Description": "Test4", "ID": 4},
];

test("returns a properly formatted currency string", () => {
    expect(helper.formatAmountString(1300)).toBe("£13.00");
    expect(helper.formatAmountString(57223)).toBe("£572.23");
    expect(helper.formatAmountString(15)).toBe("£0.15");
    expect(helper.formatAmountString(130000)).toBe("£1,300.00");
    expect(helper.formatAmountString(170000000)).toBe("£1,700,000.00");
    expect(helper.formatAmountString(170000001)).toBe("£1,700,000.01");
});

test("returns a properly formatted number", () => {
    expect(helper.formatAmountNum(1300)).toBe(13);
    expect(helper.formatAmountNum(15032)).toBe(150.32);
    expect(helper.formatAmountNum(121448)).toBe(1214.48);
});

test("returns dates from SQL in UK format string", () => {
    expect(helper.formatFullDate("2021-07-01")).toBe("01/07/21");
    expect(helper.formatFullDate("2020-12-21")).toBe("21/12/20");
    expect(helper.formatFullDate("2009-03-02")).toBe("02/03/09");
});

test("returns the amount to spend in each category", () => {
    expect(helper.getToSpend(130000, 50)).toBe(65000);
    expect(helper.getToSpend(125300, 33)).toBe(41349);
    expect(helper.getToSpend(160000, 37)).toBe(59200);
    expect(helper.getToSpend(100000, 16)).toBe(16000);
});

test("returns the amount left to spend in each category", () => {
    expect(helper.calculateRemaining(65000, 16250)).toBe(48750);
    expect(helper.calculateRemaining(41349, 1954)).toBe(39395);
    expect(helper.calculateRemaining(59200, 62449)).toBe(-3249);
    expect(helper.calculateRemaining(16000, 16000)).toBe(0);
});

test("returns the percentage number that has been spent", () => {
    expect(helper.percentSpent(65000, 16250)).toBe(25);
    expect(helper.percentSpent(41349, 1954)).toBe(4.73);
    expect(helper.percentSpent(59200, 62449)).toBe(105.49);
    expect(helper.percentSpent(16000, 16000)).toBe(100);
});

test("returns the string representation of the percentSpent", () => {
    expect(helper.percentSpentString(25)).toBe("25%");
    expect(helper.percentSpentString(4.73)).toBe("4.73%");
    expect(helper.percentSpentString(105.49)).toBe("105.49%");
    expect(helper.percentSpentString(100)).toBe("100%");
}) 

test("returns today's date in the format the database uses: YYYY-MM-DD", () => {
    expect(helper.getTodayDateDatabase()).toBe("2021-07-04");
});

test("returns the amount of money spent multiplied by 100", () => {
    expect(helper.amountToDatabase(80.07)).toBe(8007);
    expect(helper.amountToDatabase(0.09)).toBe(9);
    expect(helper.amountToDatabase(0.11)).toBe(11);
    expect(helper.amountToDatabase(100.00)).toBe(10000);
    expect(helper.amountToDatabase(97313.99)).toBe(9731399);
    expect(helper.amountToDatabase(1246.00)).toBe(124600);
    expect(helper.amountToDatabase(0.01)).toBe(1);
    expect(helper.amountToDatabase(0.00)).toBe(0);
    expect(helper.amountToDatabase(100)).toBe(10000);
    expect(helper.amountToDatabase(94)).toBe(9400);
    expect(helper.amountToDatabase(95.99)).toBe(9599);
    expect(helper.amountToDatabase(12.12)).toBe(1212);
});

test("returns the date formatted as a string for the database", () => {
    expect(helper.formatDateForDatabase("20/07/21")).toBe("2021-07-20");
    expect(helper.formatDateForDatabase("01/11/25")).toBe("2025-11-01");
    expect(helper.formatDateForDatabase("13/01/18")).toBe("2018-01-13");
    expect(helper.formatDateForDatabase("19/12/21")).toBe("2021-12-19");
    expect(helper.formatDateForDatabase("02/03/20")).toBe("2020-03-02");
});

test("returns an integer in place of string for 1, 2, 3", () => {
    expect(helper.categoryNameToID("one")).toBe(1);
    expect(helper.categoryNameToID("two")).toBe(2);
    expect(helper.categoryNameToID("three")).toBe(3);
    expect(helper.categoryNameToID("four")).toBe(0);
    expect(helper.categoryNameToID("HELLO")).toBe(0);
});

test("returns a string of today's date formated as YYYY-MM-DD", () => {
    expect(helper.getDateDatabaseFormat()).toBe("2021-07-04");
});

test("returns a string of the current month as numbers", () => {
    expect(helper.getCurrentMonth()).toBe("2021-07");
});

test("returns a string of a date written as the month ex: January 2021", () => {
    expect(helper.getMonthName("2021-01-14")).toBe("JANUARY 2021");
    expect(helper.getMonthName("2001-12-22")).toBe("DECEMBER 2001");
    expect(helper.getMonthName("2017-10-03")).toBe("OCTOBER 2017");
    expect(helper.getMonthName("2018-07-21")).toBe("JULY 2018");
    expect(helper.getMonthName("2020-04-02")).toBe("APRIL 2020");
    expect(helper.getMonthName("2016-08-17")).toBe("AUGUST 2016");
    expect(helper.getMonthName("2010-11-25")).toBe("NOVEMBER 2010");
    expect(helper.getMonthName("2004-05-30")).toBe("MAY 2004");
    expect(helper.getMonthName("2015-02-05")).toBe("FEBRUARY 2015");
    expect(helper.getMonthName("2021-09-12")).toBe("SEPTEMBER 2021");
    expect(helper.getMonthName("2077-06-14")).toBe("JUNE 2077");
    expect(helper.getMonthName("2040-03-11")).toBe("MARCH 2040");
    expect(helper.getMonthName("2021-15-01")).toBe("MONTH 2021");
});

test("Returns a string of today's date formated as dd/mm/yy", () => {
    expect(helper.formatDate(new Date())).toBe("04/07/21");
});

test("Returns a string of today's date in the format yyyy-mm-dd", () => {
    expect(helper.formatDateDBStyle(new Date())).toBe("2021-07-04");
});

test("Sorts past transactions into a section list format", () => {
    const dataOne = [
        {
            "Amount": 1000,
            "CategoryLabel": "NEEDS",
            "CategoryValue": "one",
            "Date": "2021-06-06",
            "Description": "Test1",
            "ID": 1,
            "Tag": "Investing",
            "TagID": 9,
        },
        {
            "Amount": 1250,
            "CategoryLabel": "WANTS",
            "CategoryValue": "two",
            "Date": "2021-05-06",
            "Description": "Test2",
            "ID": 2,
            "Tag": "Mortgage",
            "TagID": 10,
        },
        {
            "Amount": 2688,
            "CategoryLabel": "WANTS",
            "CategoryValue": "two",
            "Date": "2021-05-02",
            "Description": "Test3",
            "ID": 3,
            "Tag": "Mortgage",
            "TagID": 10,
        },
    ];

    const dataOneProcessed = [
        {
            title: "2021-06",
            data: [
                {
                    "Amount": 1000,
                    "CategoryLabel": "NEEDS",
                    "CategoryValue": "one",
                    "Date": "2021-06-06",
                    "Description": "Test1",
                    "ID": 1,
                    "Tag": "Investing",
                    "TagID": 9,
                },
            ],
            total: 1000
        },
        {
            title: "2021-05",
            data: [
                {
                    "Amount": 1250,
                    "CategoryLabel": "WANTS",
                    "CategoryValue": "two",
                    "Date": "2021-05-06",
                    "Description": "Test2",
                    "ID": 2,
                    "Tag": "Mortgage",
                    "TagID": 10,
                },
                {
                    "Amount": 2688,
                    "CategoryLabel": "WANTS",
                    "CategoryValue": "two",
                    "Date": "2021-05-02",
                    "Description": "Test3",
                    "ID": 3,
                    "Tag": "Mortgage",
                    "TagID": 10,
                },
            ],
            total: 3938
        }
    ];

    expect(helper.processHistoricalData(dataOne)).toEqual(dataOneProcessed);
});

test("Returns a number that counts the amount of overdue, non-completed reminders", () => {
    
    const remindersThree = [
        {"Complete": 1, "Date": "2021-07-01", "Description": "Test1", "ID": 1},
        {"Complete": 1, "Date": "2021-07-02", "Description": "Test2", "ID": 2},
        {"Complete": 1, "Date": "2021-07-03", "Description": "Test3", "ID": 3},
        {"Complete": 0, "Date": "2021-07-07", "Description": "Test4", "ID": 4},
    ];

    expect(helper.getBadgeCount(remindersOne)).toBe(1);
    expect(helper.getBadgeCount(remindersTwo)).toBe(3);
    expect(helper.getBadgeCount(remindersThree)).toBe(0);
});

test("Returns list of transactions filtered by current month sorted descending", () => {

    const transactionsDash = [
        {
            "Amount": 3741,
            "CategoryLabel": "GOALS",
            "CategoryValue": "three",
            "Date": "2021-07-12",
            "Description": "Test7",
            "ID": 7,
            "Tag": "Credit Payoff",
            "TagID": 1,
        },
        {
            "Amount": 5525,
            "CategoryLabel": "WANTS",
            "CategoryValue": "two",
            "Date": "2021-07-09",
            "Description": "Test4",
            "ID": 4,
            "Tag": "Personal",
            "TagID": 11,
        },
        {
            "Amount": 135,
            "CategoryLabel": "NEEDS",
            "CategoryValue": "one",
            "Date": "2021-07-07",
            "Description": "Test5",
            "ID": 5,
            "Tag": "Food",
            "TagID": 5,
        },
        {
            "Amount": 65000,
            "CategoryLabel": "NEEDS",
            "CategoryValue": "one",
            "Date": "2021-07-03",
            "Description": "Test6",
            "ID": 6,
            "Tag": "Mortgage",
            "TagID": 10,
        },
        {
            "Amount": 8721,
            "CategoryLabel": "WANTS",
            "CategoryValue": "two",
            "Date": "2021-07-02",
            "Description": "Test3",
            "ID": 3,
            "Tag": "Donations",
            "TagID": 2,
        },
    ];
    expect(helper.filterSortDash(transactions)).toEqual(transactionsDash);
});

test("Returns transactions filtered by current month and individual category, sorted descending", () => {

    const transactionsOne = [
        {
            "Amount": 135,
            "CategoryLabel": "NEEDS",
            "CategoryValue": "one",
            "Date": "2021-07-07",
            "Description": "Test5",
            "ID": 5,
            "Tag": "Food",
            "TagID": 5,
        },
        {
            "Amount": 65000,
            "CategoryLabel": "NEEDS",
            "CategoryValue": "one",
            "Date": "2021-07-03",
            "Description": "Test6",
            "ID": 6,
            "Tag": "Mortgage",
            "TagID": 10,
        },
    ];

    const transactionsTwo = [
        {
            "Amount": 5525,
            "CategoryLabel": "WANTS",
            "CategoryValue": "two",
            "Date": "2021-07-09",
            "Description": "Test4",
            "ID": 4,
            "Tag": "Personal",
            "TagID": 11,
        },
        {
            "Amount": 8721,
            "CategoryLabel": "WANTS",
            "CategoryValue": "two",
            "Date": "2021-07-02",
            "Description": "Test3",
            "ID": 3,
            "Tag": "Donations",
            "TagID": 2,
        },
    ];

    const transactionsThree = [
        {
            "Amount": 3741,
            "CategoryLabel": "GOALS",
            "CategoryValue": "three",
            "Date": "2021-07-12",
            "Description": "Test7",
            "ID": 7,
            "Tag": "Credit Payoff",
            "TagID": 1,
        },
    ];

    expect(helper.filterSortTabs(transactions, "one")).toEqual(transactionsOne);
    expect(helper.filterSortTabs(transactions, "two")).toEqual(transactionsTwo);
    expect(helper.filterSortTabs(transactions, "three")).toEqual(transactionsThree);
});

test("Returns objects in an array in ascending order by 'sortBy' property", () => {
    const tagsSorted = [
        {"ID": 21, "Name": "Holiday"},
        {"ID": 9, "Name": "Investing"},
        {"ID": 10, "Name": "Mortgage"},
        {"ID": 12, "Name": "Rent"},
        {"ID": 15, "Name": "Tuition"},
    ];

    const remindersOneSorted = [
        {"Complete": 1, "Date": "2021-07-02", "Description": "Test2", "ID": 2},
        {"Complete": 0, "Date": "2021-07-03", "Description": "Test4", "ID": 4},
        {"Complete": 0, "Date": "2021-07-07", "Description": "Test1", "ID": 1},
        {"Complete": 0, "Date": "2021-08-08", "Description": "Test3", "ID": 3},
    ];
    
    const remindersTwoSorted = [
        {"Complete": 0, "Date": "2021-07-01", "Description": "Test1", "ID": 1},
        {"Complete": 1, "Date": "2021-07-02", "Description": "Test2", "ID": 2},
        {"Complete": 0, "Date": "2021-07-03", "Description": "Test3", "ID": 3},
        {"Complete": 0, "Date": "2021-07-04", "Description": "Test4", "ID": 4},
    ];
    expect(helper.sortAscending(tags, "Name")).toEqual(tagsSorted);
    expect(helper.sortAscending(remindersOne, "Date")).toEqual(remindersOneSorted);
    expect(helper.sortAscending(remindersTwo, "Date")).toEqual(remindersTwoSorted);
});

test("Returns a tag object if it exists in the tags array", () => {
    expect(helper.findTag(tags, "Rent")).toEqual({"ID": 12, "Name": "Rent"});
    expect(helper.findTag(tags, "Tuition")).toEqual({"ID": 15, "Name": "Tuition"});
    expect(helper.findTag(tags, "Entertainment")).toBe(undefined);
});