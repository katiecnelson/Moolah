import * as helper from "../helper";

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
});

test("returns the amount to spend in each category", () => {
    expect(helper.getToSpend(130000, 50)).toBe(65000);
});

test("returns the amount left to spend in each category", () => {
    expect(helper.calculateRemaining(65000, 16250)).toBe(48750);
});

test("returns the amount left to spend in each category", () => {
    expect(helper.percentSpent(65000, 16250)).toBe("25%");
    expect(helper.percentSpent(65000, 16250)).toBe("25%");
    expect(helper.percentSpent(65000, 16250)).toBe("25%");
});

test("returns the date formatted as a string for the display", () => {
    expect(helper.getDateToDisplay()).toBe("21/07/21");
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
});