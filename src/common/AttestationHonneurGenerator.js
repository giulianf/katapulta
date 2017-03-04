import _ from 'lodash';
const blobStream = require('blob-stream');
import fs from 'fs';
import pdfMake from 'pdfmake';
const PdfPrinter = require('pdfmake/src/printer');
import { error, debug, info } from '../common/UtilityLog';
import ConvertNumber from './ConvertNumber';

export class AttestationHonneurGenerator {
    constructor() {
    }

    generateAttestationHonneur(res) {
        debug("Entering generateAttestationHonneur");

        this.createPdfBinary( (binary) => {
            res.contentType('application/pdf');
            res.send('data:application/pdf;base64,' + binary);
        })
    }

    createPdfBinary( callback ) {
        debug("Entering createPdfBinary AttestationHonneurGenerator");

        // const docDefinition = {
        var docDefinition = {
            info: {
                title: "Attestation sur l'honneur du preteur",
                author: 'United-IT',
                subject: "Annexe III"
            },
            pageSize: "A4",
            pageMargins: [25,20,25,50],
            content: [
                {
                  // optional space between columns
                   color: '#000',
                   table: {
                       widths: ["100%"],
                       body: [
                            [
                                {
                                    text : "\n\nAnnexe III - ATTESTATION SUR L'HONNEUR DU PRÊTEUR\n\nArt. 2, §3, alinéa 2, 3°, de l'Arrêté du Gouvernement Wallon du [date]\n\n",
                                    alignment:"center",
                                    style: "header"
                                }
                            ]
                        ]
                   }
                },
                {
                    text:"\n\n\n\n\n\nJe soussigné, . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "+
                    "(nom, prénom), repris au registre national sous le numéro . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ., " +
                    "domicilié à . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\n\n",
                    alignment: 'left'
                },
                {
                    text :
                    [
                        "\n\n\nCertifie sur l'honneur que je respecte, à la date de la conclusion du contrat de prêt consenti à . . . . . . . "+
                        ". . . . . . . . . . . . . . . . . . . . . "+
                        ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . \n" +
                        " (nom, prénom, domicile et numéro de registre national ",
                        { text:"en cas de personne physique", style: "title"},
                        " ; dénomination sociale, siège social et numéro de B.C.E. ",
                        { text:"en cas de personne morale", style: "title"},
                        "), et auquel la présente attestation est annexée, l'ensemble des conditions posées aux articles 3 et 4, " +
                        "§ 1er du Décret du 28 avril 2016 ainsi que par ses arrêtés d'exécution.\n\n"
                    ]
                },
                {
                    text:"\n\nJe m’engage à informer la SOWALFIN, conformément à l’article 5, §§ 3 et 4 du Décret du 28 avril 2016, de toute situation visée par ces dernières dispositions.\n\n\n\n",
                    alignment: 'left'
                },
                {
                    text:"Fait en date du . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "+
                    "à . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\n\n\n\n",
                    alignment: 'left'
                },
                {
                    text:"Le Prêteur\n",
                    alignment: 'left'
                },
                {
                    text:"Madame/Monsieur . . . . . . . . . . . . . . . . . . . . . . . . . .\n\n",
                    alignment: 'left'
                },
                {
                    text:"(signature)",
                    alignment: 'left'
                },
            ],
            styles:
            {
                header:
                {
                  bold: true,
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
            callback(result.toString('base64'));
        });
        pdfDoc.end();
    }

}
