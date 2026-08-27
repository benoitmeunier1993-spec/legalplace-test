import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });
});

describe("Pharmacy", () => {
  it("should decrease expiresIn but not increase benefit", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 10, 50)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 9, 50)],
    );
  });
});

describe("Pharmacy", () => {
  it("should decrease the benefit by 2 and expiresIn by 1", () => {
    expect(new Pharmacy([new Drug("test", 0, 4)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 2)],
    );
  });
});

describe("Pharmacy", () => {
  it("should decrease expiresIn but not the benefit", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)],
    );
  });
});

// "Herbal Tea"
describe("Pharmacy", () => {
  it("should decrease expiresIn and increase benefit", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 10, 5)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 9, 6)],
    );
  });
});


describe("Pharmacy", () => {
  it("should decrease expiresIn and increase benefit by 2", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 0, 5)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", -1, 7)],
    );
  });
});

// "Magic Pill"
describe("Pharmacy", () => {
  it("should not decrease nor increase the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("Magic Pill", 15, 40)]).updateBenefitValue()).toEqual(
      [new Drug("Magic Pill", 15, 40)],
    );
  });
});

// "Fervex"
describe("Pharmacy", () => {
  it("should increase the benefit and decrease expiresIn", () => {
    expect(new Pharmacy([new Drug("Fervex", 15, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 14, 4)],
    );
  });
});

describe("Pharmacy", () => {
  it("should increase the benefit by 2 and decrease expiresIn by 1", () => {
    expect(new Pharmacy([new Drug("Fervex", 9, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 8, 5)],
    );
  });
});

describe("Pharmacy", () => {
  it("should increase the benefit by 3 and decrease expiresIn by 1", () => {
    expect(new Pharmacy([new Drug("Fervex", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 1, 6)],
    );
  });
});

describe("Pharmacy", () => {
  it("should decrease the benefit to 0", () => {
    expect(new Pharmacy([new Drug("Fervex", 0, 30)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", -1, 0)],
    );
  });
});

// "Dafalgan"
describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("Dafalgan", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Dafalgan", 1, 1)],
    );
  });
});
