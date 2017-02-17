import _ from 'lodash';
import PDFDocument from 'pdfkit';
const blobStream = require('blob-stream');
import fs from 'fs';
import pdfMake from 'pdfMake';

export class ContractGenerator {
    constructor() {
    }

    generateContract(res, user) {
        // create a document the same way as above
        // const doc = new PDFDocument();
        // // Register a font
        // doc.registerFont('Helvetica', 'Helvetica');
        // doc.registerFont('Helvetica-Bold', 'Helvetica-Bold');
        // // pipe the document to a blob
        // // const stream = doc.pipe(blobStream());
        // doc.pipe(fs.createWriteStream('outputTest.pdf'))
        //
        // // add your content to the document here, as usual
        // // doc.addPage()
        // // .font('Arial')
        // doc.moveUp(2);
        // doc.font('Helvetica').fontSize(10)
        // .text('CONTRAT DE PRÊT « COUP DE POUCE »', {
        //     height: 10,
        //     align: 'center'
        // });
        //
        // doc.font('Helvetica').fontSize(10)
        // .text('(Décret wallon du 28/04/2016)',{
        //     height: 0,
        //     align: 'center'
        // })
        // .moveDown();
        //
        // doc.rect(100, 10, 410, doc.y*1.1).stroke();
        //
        // doc.moveDown(3);
        // doc.font('Helvetica').fontSize(10)
        // .text("Le présent contrat constitue le modèle établi en vertu du décret wallon du 28/04/2016 et de l'arrêté du gouvernement wallon du 22/09/2016.", {
        //     height: 40,
        //     align: 'left'
        // })
        // .moveDown();
        //
        // doc.font('Helvetica').fontSize(10)
        // .text("Aux fins de l'octroi de la mesure fiscale visée par ledit décret, les parties ne sont pas autorisées à y apporter de modification, ni à employer un autre modèle.", {
        //     height: 40,
        //     align: 'left'
        // })
        // .moveDown();
        //
        // doc.font('Helvetica-Bold')
        // .fontSize(10)
        // .text("ENTRE, D’UNE PART :", {
        //     height: 0,
        //     align: 'left'
        // })
        // .moveDown();
        //
        // var textP = "Le prêteur: Nicolas BUTACIDE Rue du Tergnia 27 5060 Tamines 850324-101-15 nicolas.butacide@gmail.com " +
        // "[pour un prêteur : nom, prénom, rue et numéro, code postal et commune, numéro du registre national, adresse e-mail] " +
        // "ci-après dénommé « le Prêteur »";
        // doc.font('Helvetica')
        //   .fontSize(10)
        //   .text(textP.slice(0,11), {
        //       height: 40,
        //       width:250,
        //       align: 'left'
        //
        //   })
        //       .text(textP.slice(11), {
        //       height: 40,
        //       width:250,
        //       align: 'left'
        //
        //   })
        // // get a blob when you're done
        // doc.end();
        //
        var docDefinition = {


                  content: [
                    {

                      // optional space between columns
                      columnGap: 10,
                       color: '#000',
                       margin:[50,0,0,0],
                       height:150,
                       table: {

                           widths: [400],
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

                      // optional space between columns
                      columnGap: 10,
                       color: '#000',
                       margin:[50,0,0,0],
                       height:150,
                        layout: 'noBorders',
                       table: {
                        widths: [400],
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

                  ]
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
