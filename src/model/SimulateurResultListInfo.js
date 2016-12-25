export class SimulateurResultListInfo {

    /**
     * constructor - Result of simulator
     *
     * @param  {int} index        ordre
     * @param  {number} year        current year
     * @param  {decimal} taux        taux legal
     * @param  {number} creditImpot interet deductible
     * @param  {Date} calendrier  annee enregistree + 1
     * @param  {number} interetCash description
     * @return {type}             description
     */
    constructor(index, year, taux, creditImpot, calendrier, interetCash) {
        this.index= index;
        this.year= year;
        this.taux= taux;
        this.creditImpot= creditImpot;
        this.calendrier= calendrier;
        this.interetCash= interetCash;
    }
}
