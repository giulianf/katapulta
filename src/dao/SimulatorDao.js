import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { getYear, addYear, getBelgiumDate} from '../common/Utility';
import { SimulateurResultInfo } from '../model/SimulateurResultInfo';
import { SimulateurResultListInfo } from '../model/SimulateurResultListInfo';

export class SimulatorDao {

    constructor() {
    }

    getSimulatorResult(res, simulateData) {
        info('Entering getSimulatorResult() data: ' + JSON.stringify( simulateData ));

         try {
            res.end( JSON.stringify( this.getSimulatorResultInfo(simulateData) ) );
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la simulation.');
        }
    }

    getSimulatorResultInfo(simulateData) {
        try {
            let simulateResultList = [];
            // Registering 8 year
            let year = getYear(simulateData.datePret);
            let taux = _.round(4, 2) ;
            let calendar = addYear(simulateData.datePret, 1);
            const interet = _.round((simulateData.pret * simulateData.taux) / 100, 2) ;

            for(let i = 1 ; i <= simulateData.year ; i++) {
                if (i > 4) {
                    taux = _.round(2.50, 2);
                }
                const creditImpot = _.round((simulateData.pret * taux) / 100 , 2);

                debug('creditImpot: ' + creditImpot);

                let simulateResult = new SimulateurResultListInfo(i, year, taux , creditImpot, getBelgiumDate(calendar), interet );

                simulateResultList.push(simulateResult);

                year += 1;
                calendar = addYear(calendar, 1);
            }

            const totalCreditImpot = _.round( _.reduce(_.map(simulateResultList, (result) => {
                return result.creditImpot;
            }), (total , ci )=> {
                return total += ci;
            }) , 2);
            debug('Total Credit Impot: ' + totalCreditImpot);


            const totalInteret = _.round( _.reduce(_.map(simulateResultList, (result) => {
                return result.interetCash;
            }), (total , interet )=> {
                return total += interet;
            }) , 2);
            debug('Total Interet: ' +totalInteret);


            // total Credit Impot + total Interet
            const rendementGlobal = _.round( totalCreditImpot + totalInteret , 2);

            debug('rendement Global: ' +rendementGlobal);

            const rendementAnnuelMoyenEuro = _.round( rendementGlobal / simulateData.year , 2);

            debug('Rendement Annuel Moyen Euro: ' + rendementAnnuelMoyenEuro);

            const rendementAnnuelMoyenPercent = _.round( (rendementAnnuelMoyenEuro / simulateData.pret) * 100 , 2);

            debug('Rendement Annuel Moyen Pourcent: ' + rendementAnnuelMoyenPercent);

            debug("Leaving data simulateDataResult: ");
            const simulatorResult = new SimulateurResultInfo(simulateResultList, rendementGlobal, rendementAnnuelMoyenEuro,
                rendementAnnuelMoyenPercent, totalCreditImpot, totalInteret);

            return simulatorResult;
        } catch( e ) {
            error('error: ' + e);
            throw Error(e);
        }
    }
}
