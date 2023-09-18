import { isOvernight, isSunday } from "../src/ride_calculator";

test("Deve testar se é overnight", () => {
  const segment = {
    dist: 10, date: new Date("2021-03-01T23:00:00")
  }
  expect(isOvernight(segment)).toBeTruthy();
});

test("Deve testar se é overnight", () => {
  const segment = {
    dist: 10, date: new Date("2021-03-07T23:00:00")
  }
  expect(isSunday(segment)).toBeTruthy();
});
