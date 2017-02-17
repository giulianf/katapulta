import _ from 'lodash';
import PDFDocument from 'pdfkit';
const blobStream = require('blob-stream');
import fs from 'fs';

export class ContractGenerator {
    constructor() {
        //test
    }

    generateContract(res, user) {
        // create a document the same way as above
        const doc = new PDFDocument();
        // Register a font
        doc.registerFont('Helvetica', 'Helvetica');
        doc.registerFont('Helvetica-Bold', 'Helvetica-Bold');
        // pipe the document to a blob
        // const stream = doc.pipe(blobStream());
        doc.pipe(fs.createWriteStream('outputTest.pdf'))

        // add your content to the document here, as usual
        // doc.addPage()
        // .font('Arial')
        doc.moveUp(2);
        doc.font('Helvetica').fontSize(10)
        .text('CONTRAT DE PRÊT « COUP DE POUCE »', {
            height: 10,
            align: 'center'
        });

        doc.font('Helvetica').fontSize(10)
        .text('(Décret wallon du 28/04/2016)',{
            height: 0,
            align: 'center'
        })
        .moveDown();

        doc.rect(100, 10, 410, doc.y*1.1).stroke();

        doc.moveDown(3);
        doc.font('Helvetica').fontSize(10)
        .text("Le présent contrat constitue le modèle établi en vertu du décret wallon du 28/04/2016 et de l'arrêté du gouvernement wallon du 22/09/2016.", {
            height: 40,
            align: 'left'
        })
        .moveDown();

        doc.font('Helvetica').fontSize(10)
        .text("Aux fins de l'octroi de la mesure fiscale visée par ledit décret, les parties ne sont pas autorisées à y apporter de modification, ni à employer un autre modèle.", {
            height: 40,
            align: 'left'
        })
        .moveDown();

        doc.font('Helvetica-Bold')
        .fontSize(10)
        .text("ENTRE, D’UNE PART :", {
            height: 0,
            align: 'left'
        })
        .moveDown();

        doc.font('Helvetica')
        .fontSize(10)
        .text("Le prêteur:", {
            height: 0,
            align: 'left'
        })
        .moveDown();

        // get a blob when you're done
        doc.end();
        // stream.on('finish', () => {
        //     // get a blob you can do whatever you like with
        //     blob = this.toBlob('application/pdf');
        // });
        res.end("ok");
    }
}
