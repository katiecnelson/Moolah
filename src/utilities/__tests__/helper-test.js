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
