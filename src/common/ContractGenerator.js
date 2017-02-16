import _ from 'lodash';
import PDFDocument from 'pdfkit';
const blobStream = require('blob-stream');

export class ContractGenerator {
    constructor() {
    }

    generateContract(user) {
        // create a document the same way as above
        const doc = new PDFDocument();
        // Register a font
        doc.registerFont('Arial', 'Arial');
        doc.registerFont('Arial-Bold', 'Arial', 'Arial Black');
        // pipe the document to a blob
        // const stream = doc.pipe(blobStream());
        doc.pipe(fs.createWriteStream('outputTest.pdf'))

        // add your content to the document here, as usual
        doc.addPage()
        .font('Arial')
        .fontSize(25)
        .text('CONTRAT DE PRÊT « COUP DE POUCE »')
        .align('center')
        .moveDown();

        doc.fontSize(15)
        .text('(Décret wallon du 28/04/2016)')
        .align('center')
        .moveDown();

        doc.rect(doc.x, 0, 410, doc.y).stroke();

        doc.fontSize(15)
        .text("Le présent contrat constitue le modèle établi en vertu du décret wallon du 28/04/2016 et de l'arrêté du gouvernement wallon du 22/09/2016.")
        .align('left')
        .moveDown();

        doc.fontSize(15)
        .text("Aux fins de l'octroi de la mesure fiscale visée par ledit décret, les parties ne sont pas autorisées à y apporter de modification, ni à employer un autre modèle.")
        .align('left')
        .moveDown();

        doc.fontSize(15)
        .font('Arial-Bold')
        .text("ENTRE, D’UNE PART :")
        .align('left')
        .moveDown();

        // get a blob when you're done
        doc.end();
        stream.on('finish', () => {
            // get a blob you can do whatever you like with
            blob = this.toBlob('application/pdf');
        }
    }
}
