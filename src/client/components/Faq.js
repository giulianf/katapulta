var React = require('react');
import { Grid, Row, Col, PageHeader, Accordion , Panel } from 'react-bootstrap';

export default class Faq extends React.Component {
  constructor (){
    super();
  }

  render () {
      const ulStyle = {margin: '0px 0 0 40px'};
    return (
            <Grid fluid>
              <Row className='section section-padding section-emprunteur'>
                <div className="section-title text-center">
                  <h2>Questions </h2>
                  <div></div>
                </div>
                    <Grid>
                        <Row className="tab-content">
                              <Col md={12} >
                                  <div className="panel-group toggle-carret" id="accordion1">
                                    <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion1" href="#collapseFour"
                                                 aria-expanded="true" className="collapsed">Comment ça marche</a>
                                        </h4>
                                        </div>
                                        <div id="collapseFour" className="panel-collapse collapse" aria-expanded="true">
                                            <div className="panel-body">
                                                <p>Le « Prêt Coup de Pouce » proposé sur KATAPULTA permet aux jeunes entreprises wallonnes
                                                    d'obtenir un accès facile au crédit et ce à un taux d'intérêt raisonnable, tout en incitant le prêteur, au moyen d'un crédit d'impôt, à soutenir
                                                    l'entreprise.</p>
                                                    <p>Schéma</p>
                                                <ol>
                                                    <li> L'emprunteur publie sa demande sur KATAPULTA.be</li>
                                                    <li> Dans les 48 heures, l'annonce est mise en ligne et vient ensuite la période de levée de fonds. Les prêteurs intéressés choisissent le montant
                                                    qu'ils souhaitent investir et émettent une intention de prêt.</li>
                                                    <li> Lorsque l'objectif est atteint, rédaction et envoi du/des contrat(s) aux différents intervenants</li>
                                                    <li> Remise des fonds à l'emprunteur (en direct et uniquement par virement bancaire)</li>
                                                    <li> Demande d'enregistrement envoyée à la SOWALFIN (Société Wallonne de Financement et de Garantie des Petites et Moyennes Entreprises - <a href="www.sowalfin.be" target="_blank" />)</li>
                                                    <li> Notification de l'enregistrement par la SOWALFIN au prêteur ainsi qu'à la DGO de la fiscalité du Service Public des Finances.</li>
                                                    <li> Le prêt suit alors son cours normal (coupon d'intérêt annuel et remboursement du capital à l'échéance).</li>
                                                </ol>
                                                <p>Au moyen de sa plateforme web, KATAPULTA est un intermédiaire entre prêteurs et emprunteurs. KATAPULTA encadre également tout l'aspect
                                                administratif du dossier.</p>
                                                <p>Les prêteurs investissent directement dans les entreprises qu'ils ont, eux-mêmes, sélectionnés. Aucun fonds ne transite par KATAPULTA.</p>
                                                <p>KATAPULTA n'exerce pas les fonctions d'institution bancaire ou d'investisseur professionnel.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion2" href="#collapseFive"
                                            className="" aria-expanded="false" className="collapsed">Combien ça coûte</a>
                                        </h4>
                                        </div>
                                        <div id="collapseFive" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p><u>Vous êtes prêteur :</u></p>
                    							<p>Les services offerts sur KATAPULTA sont totalement gratuits (de l'inscription jusqu'à la clôture d'un prêt).</p>
                                                <p><u>Vous êtes emprunteur :</u></p>
                    							<p>L'inscription sur KATAPULTA est gratuite. Votre éligibilité est alors testée et validée.</p>
                    							<p>Pour pouvoir déposer un projet, une participation de 100 € HTVA vous sera facturée. Ce coût comprend l'assistance à la mise en ligne, les frais
                                                d'administration, la fiche de présentation personnalisée
                                                et la publication sur la plateforme KATAPULTA ainsi que dans tous les médias dans lesquels nous sommes représentés.</p>
                    							<p>En cas de financement total ou partiel de l'opération, une commission se composant d'un succes fees de 250 € et de 1% des fonds levés vous sera facturée.
                                                 Le nombre de prêteurs nécessaire pour atteindre l'objectif n'a pas d'importance.</p>
                    						</div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion3" href="#collapseSix"
                                            className="collapsed" aria-expanded="false">Qui peut emprunter</a>
                                        </h4>
                                        </div>
                                        <div id="collapseSix" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                            <p>Les jeunes sociétés considérées comme PME*, c'est-à-dire les personnes morales à forme commerciale actives depuis moins de 5 ans et
                                            dont le siège d'exploitation est en Wallonie. Les sociétés ne peuvent se trouver dans les conditions d'une procédure collective d'insolvabilité.</p>
                                            <p>*moins de 250 ETP et CA {'<'} 50.000.000 € et total bilan {'<'} 43.000.000 €.</p>
                                            <p>Certaines activités ne sont pas éligibles :</p>
                                            <ul>
                                                <ul style={ulStyle}>
                                                    <li> La prestation de services financiers au profit de tiers ;</li>
                                                    <li> Les placements de trésorerie ;</li>
                                                    <li> Le placement collectif de capitaux ;</li>
                                                    <li> La construction, acquisition, gestion, aménagement, vente, ou location de biens immobiliers pour compte propre,
                                                    ou la détention de participations dans des sociétés ayant un objet similaire ;</li>
                                                    <li> Une société dans laquelle des biens immobiliers ou autres droits réels sur de tels biens sont placés,
                                                    dont des personnes physiques qui exercent un mandat ou des fonctions visés à l'article 32, alinéa 1er, 1°, du Code des impôts sur les revenus,
                                                     leur conjoint ou leurs enfants lorsque ces personnes ou leur conjoint ont la jouissance légale des revenus de ceux-ci, ont l'usage.</li>
                                                </ul>
                                            </ul>
                                            <p>Autres exclusions :</p>
                                            <ul>
                                                <ul style={ulStyle}>
                                                    <li> Ne pas être une société constituée pour conclure des contrats de gestion/d'administration ou qui en obtient la plupart de ses bénéfices ;</li>
                                                    <li> Ne pas être cotée en bourse ;</li>
                                                    <li> Ne pas être constituée à l’occasion d’une fusion ou d’une scission de sociétés ;</li>
                                                    <li> Ne pas avoir encore opéré de diminution de capital ou de distribution de dividendes.</li>
                                                </ul>
                                            </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion4" href="#collapseSeven"
                                            className="collapsed" aria-expanded="false">Qui peut prêter</a>
                                        </h4>
                                        </div>
                                        <div id="collapseSeven" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                            <p>Toute personne physique, agissant en dehors de son activité professionnelle ou entrepreneuriale,
                                             localisée en Région Wallonne (assujetti à l’I.P.P. en R.W.).</p>
                                            <p>Exclusions :</p>
                                            <ul>
                                                <ul style={ulStyle}>
                                                    <li> Les salariés de l’emprunteur;</li>
                                                    <li> Toute personne étant directement ou indirectement, associé ou actionnaire de l’emprunteur,
                                                    nommé ou agissant en tant qu'administrateur, gérant, délégué à la gestion journalière, ou en tant que détenteur d'un mandat similaire au sein de la société,
                                                    ou qui exerce, en tant que représentant permanent d’une autre société, un mandat d’administrateur, de gérant, de liquidateur ou une fonction analogue;</li>
                                                    <li> Le § précédent s’étant au conjoint ou au cohabitant légal.</li>
                                                </ul>
                                            </ul>
                                            <p>Les conditions doivent être respectées durant toute la durée du prêt.</p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion5" href="#collapseEight"
                                            className="collapsed" aria-expanded="false">Est-ce risqué </a>
                                        </h4>
                                        </div>
                                        <div id="collapseEight" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p>Les conditions doivent être respectées durant toute la durée du prêt.</p>
                                                <p>Le risque principal pour le prêteur est le défaut de paiement de l’emprunteur à l’échéance. </p>
                                                <p>En cas de faillite, le prêteur dispose de droits en tant que créancier de l’entreprise au même titre que les autres créanciers non privilégiés.
                                                Il s’agit d’une créance de dernier rang dont le remboursement éventuel n’intervient qu’après celui des créances privilégiées et ordinaires.</p>
                                                <p>Dans cette circonstance malheureuse, le prêteur sera tout de même assuré de recevoir son crédit d’impôt pour la durée restante du prêt.</p>
                                                <p>Le prêteur peut maitriser son risque en diversifiant ses placements et en sélectionnant soigneusement les entreprises en fonction de leur connaissance
                                                de celles-ci ou du projet qu’elles portent.</p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion6" href="#collapseNine"
                                            className="collapsed" aria-expanded="false">A quoi peut servir les fonds récoltés </a>
                                        </h4>
                                        </div>
                                        <div id="collapseNine" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p>Le prêt coup de pouce est, en principe, exclusivement destiné à l’usage prévu dans la description de l’annonce de l’emprunteur.</p>
                                                <p>Toute affectation privée est formellement proscrite.</p>
                                                <p>Dans tous les cas, les fonds empruntés ne pourront servir à :</p>
                                                <ul type='circle'>
                                                    <ul style={ulStyle}>
                                                        <li> Octroyer des prêts</li>
                                                        <li> Acquérir des actions ou parts sociales d’autres sociétés</li>
                                                        <li> Distribuer un dividende</li>
                                                    </ul>
                                                </ul>
                                                <p>En choisissant le « prêt coup de pouce », vous financez l’économie réelle et locale. C’est également le moyen de diversifier
                                                votre portefeuille de placement en le détachant des marchés financiers.</p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion7"
                                            href="#collapseTen" className="collapsed" aria-expanded="false">A qui les fonds sont-ils versés </a>
                                        </h4>
                                        </div>
                                        <div id="collapseTen" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p>Directement à l’entreprise emprunteuse, sur le numéro de compte bancaire IBAN mentionné dans la convention.</p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion8"
                                            href="#collapseEleven" className="collapsed" aria-expanded="false">Quelle est ma responsabilité en tant que prêteur?</a>
                                        </h4>
                                        </div>
                                        <div id="collapseEleven" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p>Le prêteur n’encourt aucune responsabilité, ni envers l’entreprise emprunteuse, ni envers les tiers.</p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion9"
                                            href="#collapseTwelve" className="collapsed" aria-expanded="false">Quels sont critères de sélection?</a>
                                        </h4>
                                        </div>
                                        <div id="collapseTwelve" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p>KATAPULTA sélectionne les dossiers en tenant compte des critères légaux. En principe,
                                                toutes les sociétés éligibles dans le cadre du Décret peuvent s’inscrire et effectuer une demande de financement.
                                                KATAPULTA se réserve néanmoins le droit d’écarter, sans devoir en justifier les motifs, des demandes de prêts « coup de pouce »
                                                qui lui sont soumis. Ces motifs peuvent être d’ordre financiers, économiques ou moraux.</p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion10"
                                            href="#collapseThirteen" className="collapsed" aria-expanded="false">Combien de temps cela prend t-il ?</a>
                                        </h4>
                                        </div>
                                        <div id="collapseThirteen" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p>La période de levé des fonds est de 30 jours à partir de la mise en ligne de la demande. Passé ce délai,
                                                la demande de financement peut être prolongée pour une période identique, modifiée ou supprimée. Il n’est, actuellement,
                                                pas possible de communiquer une durée moyenne de levée de fonds.</p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion11"
                                            href="#collapseFourteen" className="collapsed" aria-expanded="false">Et dans la comptabilité de l’emprunteur</a>
                                        </h4>
                                        </div>
                                        <div id="collapseFourteen" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p>Les fonds récoltés par le biais du prêt coup de pouce apparaitront parmi les dettes au passif du bilan.</p>
                                                <p>Les intérêts payés annuellement sont intégralement déductibles au titre de charges professionnelles.</p>
                                                <p>Une retenue à la source (précompte mobilier) devra être opérée par le débiteur des revenus.
                                                Le taux de précompte est actuellement fixé à 30% et devra être versé directement par l’emprunteur à l’Etat après en avoir fait la déclaration.</p>
                                                <p>A chaque échéance, l’emprunteur recevra une notification par email lui rappelant les montants qui doivent être payés. A tout moment,
                                                il peut consulter les détails des financements en cours dans son espace client.</p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion12"
                                            href="#collapseFifteen" className="collapsed" aria-expanded="false">Comment remplir ma déclaration fiscale</a>
                                        </h4>
                                        </div>
                                        <div id="collapseFifteen" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p>Les montants prêtés, au cours de la période imposable concernée, doivent être indiqués dans le cadre <b>xxx</b> de la partie I de la déclaration à l’impôt des personnes physiques.</p>
                                                <p>Le bénéfice du crédit d’impôt devra être revendiqué chaque année pendant la durée du prêt.</p>
                                                <p>Par ailleurs, les intérêts reçus ont subi une retenue de précompte mobilier à la source. Ce précompte étant libératoire,
                                                il n’est plus nécessaire de mentionner les intérêts perçus dans votre déclaration fiscale.</p>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion13"
                                            href="#collapseSixteen" className="collapsed" aria-expanded="false">
                                            Quels sont les documents à conserver pour la déclaration fiscale</a>
                                        </h4>
                                        </div>
                                        <div id="collapseSixteen" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <ul type='circle'>
                                                    <ul style={ulStyle}>
                                                        <li> La demande et la notification de l’enregistrement ;</li>
                                                        <li> L’extrait de compte bancaire mentionnant le paiement annuel des intérêts ;</li>
                                                        <li> L’attestation sur l’honneur que vous aurez signée.</li>
                                                    </ul>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="panel panel-default panelFaq">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion14"
                                            href="#collapseSevenTeen" className="collapsed" aria-expanded="false">
                                            Et la confidentialité ?
                                            </a>
                                        </h4>
                                        </div>
                                        <div id="collapseSevenTeen" className="panel-collapse collapse" aria-expanded="false">
                                            <div className="panel-body">
                                                <p>Aucune information n’est rendue publique par KATAPULTA sans l’accord explicite de l’entreprise.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </Col>
                        </Row>
                    </Grid>

              </Row>
            </Grid>

    );
  }
}
