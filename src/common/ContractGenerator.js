import _ from 'lodash';
import PDFDocument from 'pdfkit';
const blobStream = require('blob-stream');
import fs from 'fs';
import pdfMake from 'pdfmake';

export class ContractGenerator {
    constructor() {
    }

    generateContract(res, user) {
        // create a document the same way as above
        // columns: [
        //                              {
        //                                stack: [
        //             			            {text: 'Title for column 1', bold: true},
        //             				    {text: 'This should be the title in bold\n this a simple text\nblabla in bold, but this again normal.'},
        //             				    {
        //             				        text: [
        //             				            'Normal text ',
        //             				            {text: 'Bold text', bold: true}
        //             				        ]
        //
        //             				    }
        //             				]
        //                              },
        var dd = {
            info: {
                title: 'Prêt coup de pouce',
                author: 'United-IT',
                subject: 'Contrat prêt de coup de pouce'
            },
            pageSize: "A4",
            pageMargins: [25,20,25,50],
            footer: function(currentPage, pageCount) {
                return [
                    {canvas: [{ type: 'line', x1: 10, y1: -10, x2: 595-10, y2: -10, lineWidth: 1.3 }] },
                    {text: "Page " + currentPage.toString() + ' sur ' + pageCount, alignment:"right", margin:[0, 0, 20, 10]},
                ];
            },
            content: [
            {
              // optional space between columns
              columnGap: 10,
               color: '#000',
               margin:[10,0,10,0],
               height:150,
               table: {
                   widths: ["100%"],
                   body: [
                        [
                            {
                                text : '\n\nCONTRAT DE PRÊT « COUP DE POUCE »\n(Décret wallon du 28/04/2016)\n\n',
                                "alignment":"center",
                            }
                        ]
                    ]
               }
            },
            "\nLe présent contrat constitue le modèle établi en vertu du décret wallon du 28/04/2016 et de l'arrêté du gouvernement wallon du 22/09/2016.",
            "\nAux fins de l'octroi de la mesure fiscale visée par ledit décret, les parties ne sont pas autorisées à y apporter de modification, ni à employer un autre modèle.",
            {
                    text:"\nENTRE, D’UNE PART :\n\n",
                    style: 'header'
            },
            {
                columns: [
                {
                    // fixed width
                    width: 100,
                     text :
                     [
                         'Le prêteur',
                         { text:"1", fontSize:9},
                         " :"
                     ],
                     "alignment":"left",
                },
                {
                    // fixed width
                    width: '*',
                    text : 'Nicolas BUTACIDE\nRue du Tergnia 27\n5060 Tamines\n850324-101-15\nnicolas.butacide@gmail.com',
                    "alignment":"justify",
                    style: 'header'
                }
              ],
              // optional space between columns
              columnGap: 10
            },
            {
                text:"\n\nci-après dénommé « le Prêteur »\n\n"
            },
            {
                    text:"\nET, D’AUTRE PART :\n\n",
                    style: 'header'
            },
            {
                columns: [
                {
                    // fixed width
                    width: 100,
                     text :
                     [
                         "L'emprunteur",
                         { text:"2", fontSize:8},
                         " :"
                     ],
                     "alignment":"left",
                },
                {
                    // fixed width
                    width: '*',
                    text :
                    [
                        {text: "BSD SPRL\n", style: 'header'},
                        { text:"Siège d'exploitation :"},
                        { text:"rue du tergnia 27, 5060 SAMBREVILLE\n", style: 'header'},
                        { text:"Siège social :"},
                        { text:"rue du tergnia 27, 5060 SAMBREVILLE\n", style: 'header'},
                        { text:"butagazzz@hotmail.com\n", style: 'header'},
                        { text:"Numéro d'inscription à la Banque Carrefour des Entreprises :"},
                        { text:"BE810.173.494\n", style: 'header'},
                        { text:"NICOLAS BUTACIDE\n", style: 'header'},
                        { text:"GERANT\n", style: 'header'},
                        { text:"RUEDU TERGNIA 27\n", style: 'header'},
                        { text:"5060 SAMBREVILLE\n", style: 'header'},
                        { text:"840112-114-70\n", style: 'header'},
                    ],
                    alignment:"justify"
                }
              ],
              // optional space between columns
              columnGap: 10
            },
            {
                text:"\n\nci-après dénommé « l'Emprunteur »\n"
            },
            {
                text:"\n\nDésignées ensemble, « les Parties » et individuellement « la Partie » ;",
                pageBreak: 'after'
            },
            {
                    text:"IL EST CONCLU UN CONTRAT DE PRÊT ASSORTI DES CONDITIONS SUIVANTES :\n\n",
                    style: 'header'
            },
            {
                    text:"Article 1er – Objet du contrat\n\n",
                    style: 'title'
            },
            {
                    // fixed width
                    width: '*',
                    text :
                    [
                        { text: "Le Prêteur accorde à l'Emprunteur, qui accepte, un prêt, d’un montant en principal de"},
                        { text:" vingt mille euros", style: 'header'},
                        { text:"4", style: 'header', fontSize:8},
                        { text:" (20.000,00 €)", style: 'header'},
                        { text:"5", style: 'header', fontSize:8},
                        { text:" et ce conformément aux modalités définies au présent contrat, sans préjudice des conditions posées par le Décret du 28/04/2016 et par l’Arrêté du Gouvernement wallon du 22/09/2016.\n\n"},
                    ],
                    alignment:"left"
            },
            {
              // optional space between columns
              columnGap: 10,
               color: '#000',
               table: {
                   widths: ["100%"],
                   body: [
                        [
                            {
                                text :
                                [
                                    { text: "\nN.B. : Le montant du prêt « coup de pouce »"},
                                    { text:"6", fontSize:8},
                                    { text:" ainsi que le montant cumulé de plusieurs « prêts coup de pouce »" +
                                        " ne peuvent pas être supérieurs à 50.000 EUR par prêteur." +
                                        " Le montant du « prêt coup de pouce » ainsi que le montant" +
                                        " cumulé de plusieurs « prêts coup de pouce » ne peut pas être supérieur à 100.000 EUR par emprunteur.\n\n"},
                                ],
                                alignment:"left",
                            }
                        ]
                    ]
               }
            },
            {
                    text:"\n\nArticle 2 – Destination du prêt\n\n",
                    style: 'title'
            },
            {
                    text:"Le présent prêt est destiné à :\n\n",
            },
            {
                    text:"FINANCEMENT STOCK\n\n",
                    style: 'header'
            },
            {
              // optional space between columns
              columnGap: 10,
               color: '#000',
               table: {
                   widths: ["100%"],
                   body: [
                        [
                            {
                                text : "\nN.B. : L’article 6 du Décret wallon du 28/04/2016 impose que l’emprunteur affecte exclusivement les fonds prêtés " +
                                "dans le cadre du prêt Coup de Pouce à la réalisation de l’activité de son entreprise, à l’exclusion de toute " +
                                "affectation à des fins privées. " +
                                "L’Emprunteur ne peut pas prêter les fonds empruntés à une personne morale, existante ou à constituer, dont luimême, " +
                                "son conjoint ou son cohabitant légal est associé, actionnaire, administrateur, gérant, délégué à la gestion " +
                                "journalière ou détenteur d’un mandat similaire au sein de cette personne morale. " +
                                "L’emprunteur ne peut pas investir les fonds empruntés dans le capital d’une personne morale, existante ou à " +
                                "constituer, dont lui-même, son conjoint ou son cohabitant légal est associé, actionnaire, administrateur, gérant, " +
                                "délégué à la gestion journalière ou détenteur d’un mandat similaire au sein de cette personne morale. " +
                                "L’Emprunteur ne peut utiliser les fonds empruntés pour une distribution de dividendes ou pour l’acquisition " +
                                "d’actions ou parts, ni pour consentir des prêts.\n\n",
                                alignment:"left",
                            }
                        ]
                    ]
               }
            },
            {
                    text:"\n\nArticle 3 – Libération des fonds prêtés\n\n",
                    style: 'title'
            },
            {
                    text:"Le Prêteur affirme avoir versé à l’Emprunteur, qui le reconnaît, le montant prêté en principal. A cet égard, copie d’un " +
                    "extrait de compte probant est joint à la demande d’enregistrement.\n\n " +
                    "Le défaut de cette pièce probante prive le Prêteur du bénéfice de la mesure fiscale organisée par le Décret wallon.\n\n",
                    pageBreak: 'after'
            },
            {
                    text:"Article 4 – Entrée en vigueur et durée\n\n",
                    style: 'title'
            },
            {
                    // fixed width
                    width: '*',
                    text :
                    [
                        { text: "La date de conclusion du présent prêt est celle du versement par le Prêteur à l’Emprunteur du montant prêté en " +
                        "principal, telle qu’elle ressort de l’extrait de compte bancaire.\n\n" +
                        "La durée du prêt est fixée à "},
                        { text:" 6 (six)", style: 'header'},
                        { text:" ans "},
                        { text:"7", style: 'header', fontSize:8},
                        { text:" à compter de la date de sa conclusion.\n\n"},
                    ],
                    alignment:"left"
            },
            {
                    text:"Article 5 – Intérêts\n\n",
                    style: 'title'
            },
            {
                    // fixed width
                    width: '*',
                    text :
                    [
                        { text: "Le présent prêt est productif d’un intérêt fixe annuel de "},
                        { text:"deux virgule deux cent cinquante", style: 'header'},
                        { text:" pour cent ("},
                        { text:"2.250 ", style: 'header'},
                        { text:"%)\n\n"},
                    ],
                    alignment:"left"
            },
            {
              // optional space between columns
              columnGap: 10,
               color: '#000',
               table: {
                   widths: ["100%"],
                   body: [
                        [
                            {
                                text :
                                [
                                    { text: "\nN.B. Le taux convenu ne peut être supérieur au taux légal en vigueur à la date de conclusion du prêt, ni inférieur " +
                                    "à la moitié de ce taux légal.\n L’emprunteur a l’obligation légale de déduire " +
                                    "du montant des intérêts versés au prêteur le "},
                                    { text:"précompte mobilier", style: 'title'},
                                    { text:" dû sur ceux-ci afin de verser cette somme directement au S.P.F. – FINANCES.\n\n"},
                                ],
                                alignment:"left",
                            }
                        ]
                    ]
               }
            },
            {
                    text:"\nLes intérêts seront versés annuellement par l’Emprunteur au Prêteur, " +
                    "au moyen d’un virement bancaire, à la date anniversaire de la conclusion du prêt.\n\n\n",
            },
            {
                    text:"Article 6 – Remboursement du prêt\n\n",
                    style: 'title'
            },
            {
                    text:"L'Emprunteur s’engage à rembourser le montant prêté en principal, en une fois, à la date de son échéance, telle que " +
                    "stipulée à l’article 4.\n\n" +
                    "Aucun remboursement anticipé, total ou partiel, n’est autorisé, à moins que celui-ci n’intervienne dans le strict cadre " +
                    "des hypothèses visées à l’article 4, § 2 du Décret wallon du 28/04/2016.\n\n " +
                    "Lorsque, dans les hypothèses reprises à l’article 4, § 2 du Décret wallon du 28/04/2016, le Prêteur choisi de rendre le " +
                    "prêt appelable par anticipation, il en informe l’Emprunteur par lettre recommandée à la Poste avec accusé de " +
                    "réception. Le Prêteur en informe ensuite la SOWALFIN dans les trois mois de la survenance de l'événement qui est à " +
                    "l'origine de la dénonciation du prêt.\n\n",
            },
            {
                    text:"Article 7 – Versements\n\n",
                    style: 'title'
            },
            {
                    // fixed width
                    width: '*',
                    text :
                    [
                        { text: "Tout versement devant être effectué au profit du Prêteur en vertu du présent " +
                        "contrat sera réalisé sur le compte bancaire ouvert par celui-ci sous le numéro IBAN "},
                        { text:"BE43 0682 5132 4401", style: 'header'},
                        { text:", auprès de la banque "},
                        { text:"BELFIUS.\n\n", style: 'header'},
                        { text: "Tout versement devant être effectué au profit de l’Emprunteur en vertu du présent " +
                        "contrat sera réalisé sur le compte bancaire ouvert par celui-ci sous le numéro IBAN "},
                        { text:"BE19 3631 0410 7312", style: 'header'},
                        { text:", auprès de la banque "},
                        { text:"ING.\n\n\n", style: 'header'},
                    ],
                    alignment:"left"
            },
            {
                    text:"Article 8 – Subordination\n\n",
                    style: 'title'
            },
            {
                    // fixed width
                    width: '*',
                    text :
                    [
                        { text: "Le présent prêt est subordonné tant aux dettes dont l’Emprunteur est déjà redevable " +
                        "au moment de sa conclusion qu’à ses dettes futures" },
                        { text:"[8]\n\n", fontSize:8},
                    ],
                    alignment:"left",
                    pageBreak: 'after'
            },
            {
                    text:"Article 9 – Déclarations communes – Engagement particulier de l’Emprunteur.\n\n",
                    style: 'title'
            },
            {
                    text:"Les Parties déclarent que les énonciations du présent contrat sont sincères, véritables et complètes.\n\n" +
                    "Le Prêteur et l'Emprunteur déclarent, chacun en ce qui le concerne, qu'ils ont connaissance de l’ensemble des conditions " +
                    "posées par le Décret wallon du 28/04/2016 et l’arrêt du Gouvernement Wallon du 22/09/2016 qu’ils les remplissent, " +
                    "et qu’ils continueront à les remplir durant toute la durée du présent prêt.\n\n" +
                    "Dans ce contexte, l’Emprunteur s’engage à adresser une attestation au Prêteur, au plus tard le 31 janvier "+
                    "de chaque année, confirmant qu’il remplissait, au cours de l’année précédente, l’ensemble des conditions dont question cidessus."+
                    " Ladite attestation émise par l’Emprunteur doit également mentionner le montant des intérêts versés par l’Emprunteur au Prêteur pendant l’année écoulée.\n\n",
            },
            {
                    text:"Article 10 – Compensation\n\n",
                    style: 'title'
            },
            {
                    text:"Les Parties renoncent à se prévaloir du bénéfice d’une quelconque compensation en ce qui concerne la relation juridique née du présent prêt.\n\n"
            },
            {
                    text:"Article 11 – Exhaustivité\n\n",
                    style: 'title'
            },
            {
                    text:"Le présent contrat constitue la totalité des accords conclus entre les Parties, relatifs à l'objet des présentes. " +
                    "Il remplace et annule tout autre accord antérieur, verbal ou écrit, qui serait intervenu entre Parties sur le même objet.\n\n"
            },
            {
                    text:"Article 12 – Incessibilité\n\n",
                    style: 'title'
            },
            {
                    text:"Sans préjudice des hypothèse réservées par le décret du 28/04/2016 relatif au « prêt coup de pouce », "+
                    "et ses arrêtés d'exécution, ni le présent contrat de prêt, ni les droits et obligations qui y sont attachés, "+
                    "ne peuvent être cédés, entièrement ou partiellement, à des tiers.\n\n"
            },
            {
                    text:"Article 13 – Capacité des Parties\n\n",
                    style: 'title'
            },
            {
                    text:"Les Parties déclarent et garantissent qu'elles sont capables et "+
                    "habilitées à conclure le présent contrat et à exécuter l'ensemble des obligations qui en découlent.\n\n"
            },
            {
                    text:"Article 14 – Notifications\n\n",
                    style: 'title'
            },
            {
                    text:"Pour les besoins de la présente convention, chaque Partie fait élection de domicile à "+
                    "son siège social statutaire ou à son domicile légal tel que renseigné en tête des présentes.\n\n"
            },
            {
                    text:"Article 15 – Juridictions compétentes\n\n",
                    style: 'title'
            },
            {
                    text:"L'ensemble des litiges relatifs à l'interprétation, l'exécution et la validité du présent "+
                    "contrat seront soumis à la compétence des juridictions de l’arrondissement du domicile de l’Emprunteur.\n\n"
            },
            {
                    text:"Article 16 – Droit applicable\n\n",
                    style: 'title'
            },
            {
                    text:"Le présent contrat de prêt est soumis au droit belge.\n\n",
                    pageBreak: 'after'
            },
            {
                    text:"\n\n\nFait à . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "+
                    "le . . . . . . . . . . . . . . . . en trois exemplaires originaux, dont un est destiné à chaque "+
                    "partie et un qui doit être transmis à l'instance désignée par arrêté du Gouvernement wallon dans "+
                    "le cadre de la demande d’enregistrement du « prêt coup de pouce ».\n\n",
            },
            {
                    text:"\n\n\n\n\n\n\n\n\nSignatures :\n\n",
            },
            {
                columns: [
                {
                    // fixed width
                    width: 350,
                     canvas: [{ type: 'line', x1: 10, y1: 70, x2: 150, y2: 70, lineWidth: 1.3 }] ,
                     alignment:"left",
                },
                {
                    // fixed width
                    width: 350,
                     canvas: [{ type: 'line', x1: 10, y1: 70, x2: 150, y2: 70, lineWidth: 1.3 }] ,
                    alignment:"right"
                }
              ],
              // optional space between columns
              columnGap: 10
            },
            {
                columns: [
                {
                    // fixed width
                    width: "50%",
                     text: "\nPour le Prêteur" ,
                     alignment:"left",
                },
                {
                    // fixed width
                    width: "50%",
                     text: "\nPour l’Emprunteur" ,
                    alignment:"right"
                }
              ],
              // optional space between columns
              columnGap: 10
            },
            {
                    text:"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n1 Au sens des articles 2 et 3 du décret du 28/04/2016.\n",
                    style: 'note'
            },
            {
                    text:"2 Au sens des articles 2 et 3 du décret du 28/04/2016.\n",
                    style: 'note'
            },
            {
                    text:"3 Une copie de l’extrait de l’inscription à la BCE doit être, "+
                    "sous peine de perte de la mesure fiscale concédée par le décret, annexée à la demande d’enregistrement du prêt.\n",
                    style: 'note'
            },
            {
                    text:"4 Montant du prêt en toutes lettres.\n",
                    style: 'note'
            },
            {
                    text:"5 Montant du prêt en chiffres.\n",
                    style: 'note'
            },
            {
                    text:"6 Au sens du Décret du 28/04/2016.\n",
                    style: 'note'
            },
            {
                    text:"7 Le choix de la durée doit être opéré en biffant les mentions inutiles.\n",
                    style: 'note'
            },
            {
                    text:"8 Ainsi, en cas de concours entre les créanciers de l’emprunteur avant " +
                    "la fin de la durée du prêt, la créance du prêteur ne sera honorée qu’après paiement "+
                    "de celle des autres créanciers. Il ne sera traité sur un pied d’égalité qu’avec les autres "+
                    "créanciers subordonnés, s'il en existe, et notamment sans y être limité, avec tous les autres "+
                    "créanciers qui ont conclu un Prêt Coup de Pousse, que leur prêt soit né avant ou après la "+
                    "conclusion du présent prêt. Le caractère subordonné ne concerne que le montant en principal et non les intérêts.\n",
                    style: 'note'
            },
            ],
            styles:
            {
                header:
                {
                  bold: true
                },
                title:
                {
                  decoration: 'underline'
                },
                note:
                {
                  fontSize: 9
                }
            },
            defaultStyle: {
        	    fontSize:12
            }
        }
         // open the PDF in a new window
          pdfMake.createPdf(docDefinition).open();

          // print the PDF
          pdfMake.createPdf(docDefinition).print();

          // download the PDF
          pdfMake.createPdf(docDefinition).download('optionalName.pdf');

        // stream.on('finish', () => {
        //     // get a blob you can do whatever you like with
        //     blob = this.toBlob('application/pdf');
        // });
        res.end("ok");
    }
}
