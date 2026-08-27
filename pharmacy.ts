export class Drug {
  constructor(
    public name: string,
    public expiresIn: number,
    public benefit: number
  ) {}
}

export class Pharmacy {
  constructor(public drugs: Drug[]) {}
  
  updateBenefitValue(): Drug[] {
    const newDrugs: Drug[] = [];
    for (const drug of this.drugs) {
      const drugName: string = drug.name;
      let newDrug: Drug;

      switch (drugName) {
        case "Herbal Tea" :
          newDrug = this.updateHerbalTeaBenefitValue(drug);
          break;
        case "Fervex" :
          newDrug = this.updateFervexBenefitValue(drug);
          break;
        case "Magic Pill" :
          newDrug = this.updateMagicPillBenefitValue(drug);
          break;
        case "Dafalgan" :
          newDrug = this.updateDafalganBenefitValue(drug);
          break;
        default:
          newDrug = this.updateRegularDrugBenefitValue(drug);
          break;
      }

      newDrugs.push(newDrug);
    }

    this.drugs = newDrugs;
    return newDrugs;
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

    if (expiresIn < 1) {
      benefit = 0;
    } else if (expiresIn < 6) {
      benefit += 3;
    } else if (expiresIn < 11) {
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
      benefit: this.checkBenefitAboveZero(expiresIn <= 0 ? (benefit - 4) : (benefit - 2))
    }
  }

  updateRegularDrugBenefitValue(drug: Drug): Drug {
    const expiresIn: number = drug.expiresIn;
    const benefit: number = drug.benefit;

    return {
      name: drug.name,
      expiresIn: this.decreaseExpiredIn(expiresIn),
      benefit: this.checkBenefitAboveZero(expiresIn <= 0 ? (benefit - 2) : (benefit - 1))
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
