export class SimulateurResultInfo {

    /**
     * constructor - Result of simulator
     *
     * @param  {List} simulateurResultListInfo        Liste des resultats
     * @param  {decimal} rendementGlobal        Rendement globale
     * @param  {decimal} rendementAnnuelMoyenEuro        Rendement Annuel euro
     * @param  {decimal} rendementAnnuelMoyenPercent Rendement Annuel percent
     * @return {type}             description
     */
    constructor(simulateurResultListInfo, rendementGlobal, rendementAnnuelMoyenEuro, rendementAnnuelMoyenPercent , totalCreditImpot, totalInteret) {
        this.simulateurResultListInfo= simulateurResultListInfo;
        this.rendementGlobal= rendementGlobal;
        this.rendementAnnuelMoyenEuro= rendementAnnuelMoyenEuro;
        this.rendementAnnuelMoyenPercent= rendementAnnuelMoyenPercent;
        this.totalCreditImpot= totalCreditImpot;
        this.totalInteret= totalInteret;
    }
}
