import _ from 'lodash';
const blobStream = require('blob-stream');
import fs from 'fs';
import pdfMake from 'pdfmake';
const PdfPrinter = require('pdfmake/src/printer');
import { error, debug, info } from '../common/UtilityLog';
import ConvertNumber from './ConvertNumber';

export class DemandeEnregistrementGenerator {
    constructor() {
    }

    generateDemandeEnregistrement(res) {
        debug("Entering generateDemandeEnregistrement");

        this.createPdfBinary( (binary) => {
            res.contentType('application/pdf');
            res.send(binary);
        })
    }

    createPdfBinary( callback ) {
        debug("Entering createPdfBinary");

        // const docDefinition = {
        var dd = {
            info: {
                title: "Contrat prêt coup de pouce",
                author: 'United-IT',
                subject: "Demande d'enregistrement"
            },
            pageSize: "A4",
            pageMargins: [25,20,25,50],
            content: [
            {
                text:"SOWALFIN SA\nAvenue Maurice Destenay, 13\n\n",
                alignment: 'right'
            },
            {
                text:"B–4000 LIEGE\nBelgique\n\n",
                alignment: 'right'
            },
            {
                text:"Par courrier recommandé avec\naccusé de réception",
                alignment: 'right',
                style: 'header'
            },
            {
                text:"\n\n\n\n\nMadame, Monsieur,\n\n",
                alignment: 'left'
            },
            {
                text:"Objet : Prêt Coup de Pouce (Décret du 28/04/2016) - Demande d'enregistrement\n\n",
                style: 'title'
            },
            {
                text:"Veuillez trouver ci-joint, dûment complétée et signée, la demande d'enregistrement " +
                "de Prêt « Coup de Pouce » établie en vertu de l'article 5, §2 du décret du 28 avril 2016 " +
                "et de l'article 2, §3 de l'arrêté du Gouvernement du 22/09/2016 accompagnée des annexes suivantes :\n\n",
            },
            {
    			ol: [
    				{
    					ol: [
                            {
                                // 1.
                                text :
                                [
                                    "un des trois exemplaires ",
                                    { text:"originaux du contrat de prêt", style: "title"},
                                    " établi selon le modèle prescrit par l'arrêté du " +
                                    "Gouvernement du 22/09/2016, complété et signé par les deux parties ;\n\n"
                                ]
                            },
                            {
                                // 2.
                                text :
                                [
                                    "une copie de l' ",
                                    { text:"extrait de compte bancaire", style: "title"},
                                    " relatif au versement de la somme prêtée et dont le montant est repris dans le contrat de prêt ;\n\n"
                                ]
                            },
                            {
                                // 3.
                                text :
                                [
                                    "une ",
                                    { text:"attestation sur l'honneur établie par le prêteur", style: "title"},
                                    " selon le modèle prescrit par l'arrêté du Gouvernement wallon "+
                                    "du 22/09/2016 confirmant le respect, à la date de conclusion du prêt, de l'ensemble des conditions visées aux" +
                                    "articles 3 et 4, § 1er du décret du 28 avril 2016, ainsi que par son arrêté d'exécution, et par laquelle il s'engage "+
                                    "à informer la SOWALFIN, conformément à l'article 5, §§ 3 et 4, du décret du 28 avril 2016, de toute situation "+
                                    "visée par ces dernières dispositions ;\n\n"
                                ]
                            },
                            {
                                // 4.
                                text :
                                [
                                    "un ",
                                    { text:"extrait de la Banque Carrefour des Entreprises", style: "title"},
                                    " attestant de l'existence de l'emprunteur et mentionnant sa raison sociale, "+
                                    "son siège social, la date de sa constitution, son numéro d'entreprise,  " +
                                    "sa forme juridique, son ou ses lieu(x) d'établissement en Région wallonne et la nature de ses activités ;\n\n"
                                ]
                            },
                            {
                                // 5.
                                text :
                                [
                                    "lorsque l'emprunteur est une personne morale, la copie du ou des documents publiés " +
                                    "aux Annexes du Moniteur Belge, démontrant que le signataire du contrat est effectivement ",
                                    { text:"habilité", style: "title"},
                                    " , le cas échéant au travers de plusieurs structures successives, ",
                                    { text:"à engager celle-ci", style: "title"},
                                    ".\n\n"
                                ]
                            },
    					]
    				},
    			]
    		},
            {
                text:"Toute correspondance afférente à la présente demande est considérée par les parties " +
                "au contrat comme valablement effectuée aux adresses suivantes.\n\n",
                pageBreak: 'after'
            },
            {
                text:"Pour l'emprunteur :\n\n"
            },
            {
    			ol: [
                    {
                        ul: [
            				'adresse postale :\n(prénom, nom, rue, n°, code postal, localité)',
            				'adresse électronique valide :\n\n',
            			]
                    }
                ]
    		},
            {
                text:"Pour le prêteur :\n\n"
            },
            {
    			ol: [
                    {
                        ul: [
            				'adresse postale :\n(prénom, nom, rue, n°, code postal, localité)',
            				'adresse électronique valide :\n\n\n',
            			]
                    }
                ]
    		},
            {
                text:"Je vous souhaite bonne réception de la présente.\n\n\n\n"
            },
            {
                text:"Fait à . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . le . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\n\n\n\n"
            },
            {
                text:"Prénom, Nom, Adresse domicile légal, N° national du prêteur,\n\n\n"
            },
            {
                text:"Signature du prêteur\n\n\n"
            },
            ],
            styles:
            {
                header:
                {
                  bold: true,
                   decoration: 'underline'
                },
                title:
                {
                  decoration: 'underline'
                }
            },
            defaultStyle: {
        	    fontSize:12
            }
        }

         const fontDescriptors = {
        	Roboto: {
        		normal: 'fonts/Roboto-Regular.ttf',
        		bold: 'fonts/Roboto-Medium.ttf',
        		italics: 'fonts/Roboto-Italic.ttf',
        		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        	}
         };
        const printer = new PdfPrinter(fontDescriptors);

        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        let chunks = [];
        let result;
        pdfDoc.on('data', function (chunk) {
            chunks.push(chunk);
        });
        pdfDoc.on('end', function () {
            result = Buffer.concat(chunks);
            callback('data:application/pdf;base64,' + result.toString('base64'));
        });
        pdfDoc.end();
    }

}
