export class Drug {
  constructor(public name: string, public expiresIn: number, public benefit: number) {}
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      if (
        this.drugs[i].name != "Herbal Tea" &&
        this.drugs[i].name != "Fervex"
      ) {
        if (this.drugs[i].benefit > 0) {
          if (this.drugs[i].name != "Magic Pill") {
            this.drugs[i].benefit = this.drugs[i].benefit - 1;
          }
        }
      } else {
        if (this.drugs[i].benefit < 50) {
          this.drugs[i].benefit = this.drugs[i].benefit + 1;
          if (this.drugs[i].name == "Fervex") {
            if (this.drugs[i].expiresIn < 11) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
            if (this.drugs[i].expiresIn < 6) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
          }
        }
      }
      if (this.drugs[i].name != "Magic Pill") {
        this.drugs[i].expiresIn = this.drugs[i].expiresIn - 1;
      }
      if (this.drugs[i].expiresIn < 0) {
        if (this.drugs[i].name != "Herbal Tea") {
          if (this.drugs[i].name != "Fervex") {
            if (this.drugs[i].benefit > 0) {
              if (this.drugs[i].name != "Magic Pill") {
                this.drugs[i].benefit = this.drugs[i].benefit - 1;
              }
            }
          } else {
            this.drugs[i].benefit =
              this.drugs[i].benefit - this.drugs[i].benefit;
          }
        } else {
          if (this.drugs[i].benefit < 50) {
            this.drugs[i].benefit = this.drugs[i].benefit + 1;
          }
        }
      }
    }

    return this.drugs;
  }

  // "Herbal Tea" actually increases in Benefit the older it gets. Benefit increases twice as fast after the expiration date.
   updateHerbalTeaBenefitValue(herbalTea: Drug): Drug {
    return {
      name: herbalTea.name,
      expiresIn: this.decreaseExpiredIn(herbalTea.expiresIn),
      benefit: this.checkBenefitBelowFifty(herbalTea.expiresIn <= 0 ? herbalTea.benefit +2 : herbalTea.benefit +1)
    }
   }

   // "Magic Pill" never expires nor decreases in Benefit.
  updateMagicPillBenefitValue(magicPill: Drug): Drug {
    return magicPill;
  }

  // "Fervex", like Herbal Tea, increases in Benefit as its expiration date approaches.
  // Benefit increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Benefit drops to 0 after the expiration date.
  updateFervexBenefitValue(fervex: Drug): Drug {
    let benefit: number = fervex.benefit;
    const expiresIn: number = fervex.expiresIn;

    if (expiresIn <= 5) {
      benefit += 3;
    } else if (expiresIn <= 10) {
      benefit += 2;
    } else {
      benefit += 1;
    }

    // The Benefit of an item is never more than 50.
    benefit = this.checkBenefitBelowFifty(benefit);
    
    return {
      name: fervex.name,
      expiresIn: this.decreaseExpiredIn(expiresIn),
      benefit
    };
  }

  // "Dafalgan" degrades in Benefit twice as fast as normal drugs.
  updateDafalganBenefitValue(dafalgan: Drug): Drug {
    const expiresIn: number = dafalgan.expiresIn;
    const benefit: number = dafalgan.benefit;

    return {
      name: dafalgan.name,
      expiresIn: this.decreaseExpiredIn(expiresIn),
      benefit: this.checkBenefitAboveZero(expiresIn < 0 ? benefit - 4 : benefit - 2)
    }
  }

  updateRegularDrugs(drug: Drug): Drug {
    const expiresIn: number = drug.expiresIn;
    const benefit: number = drug.benefit;

    return {
      name: drug.name,
      expiresIn: this.decreaseExpiredIn(expiresIn),
      benefit: this.checkBenefitAboveZero(expiresIn < 0 ? benefit - 2 : benefit - 1)
    }
  }

  private checkBenefitBelowFifty(benefit: number): number {
    return benefit > 50 ? 50 : benefit;
  }

  private checkBenefitAboveZero(benefit: number): number {
    return benefit < 0 ? 0 : benefit;
  }

  private decreaseExpiredIn(expiredIn: number): number {
    return expiredIn - 1;
  }
}
