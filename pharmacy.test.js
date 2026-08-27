import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });
});

// TODO
// The Benefit of an item is never more than 50
// Once the expiration date has passed, Benefit degrades twice as fast.
// The Benefit of an item is never negative.
// "Herbal Tea" actually increases in Benefit the older it gets. 
// "Herbal Tea" Benefit increases twice as fast after the expiration date.
// "Magic Pill" never expires nor decreases in Benefit.
// "Fervex" Benefit increases by 2 when there are 10 days or less
// "Fervex" Benefit increases by 3 when there are 5 days or less
// "Fervex" Benefit drops to 0 after the expiration date.
// "Dafalgan" degrades in Benefit twice as fast as normal drugs.
