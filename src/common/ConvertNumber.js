import { error, debug, info } from './UtilityLog';

let res, plus, diz, s, un, mil, mil2, ent, deci, centi, pl, pl2, conj;

const t=["","Un","Deux","Trois","Quatre","Cinq","Six","Sept","Huit","Neuf"];
const t2=["Dix","Onze","Douze","Treize","Quatorze","Quinze","Seize","Dix-sept","Dix-huit","Dix-neuf"];
const t3=["","","Vingt","Trente","Quarante","Cinquante","Soixante","Septante","Quatre-vingt","Nonante"];

export class ConvertNumber {
    constructor() {
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // conversion du nombre
    calculeToString(nbr){
        nbr = nbr ? nbr.toString() : '';
        debug('Entering calculeToString with number: ' + nbr);

        // vérification de la valeur saisie
        if(!/^\d+[.,]?\d*$/.test(nbr)){
           return "L'expression entrée n'est pas un nombre."
        }

        // séparation entier + décimales
        nbr=nbr.replace(/(^0+)|(\.0+$)/g,"");
        nbr=nbr.replace(/([.,]\d{2})\d+/,"$1");
        let n1=nbr.replace(/[,.]\d*/,"");
        let n2= n1!=nbr ? nbr.replace(/\d*[,.]/,"") : false;

        // variables de mise en forme
        ent= !n1 ? "" : this.decint(n1);
        deci= !n2 ? "" : this.decint(n2);
        if(!n1 && !n2){
           return  "Entrez une valeur non nulle!"
        }
        conj= !n2 || !n1 ? "" : "  virgule ";
        // let euro= !n1 ? "" : !/[23456789]00$/.test(n1) ? " Euro" : "s Euro";
        let euro= !n1 ? "" : !/[23456789]00$/.test(n1) ? "" : "";
        // if null put centime
        // this.centi= !n2 ? "" : "centime";
        this.centi= !n2 ? "" : "";
        pl=  n1>1 ? "" : "";
        pl2= n2>1 ? "" : "";
        // pl=  n1>1 ? "s" : "";
        // pl2= n2>1 ? "s" : "";

        const numberLetter = (" " + ent + euro + pl + conj + deci + this.centi + pl2).replace(/\s+/g," ").replace("cent s E","cents E");

        debug('number Letter: ' + numberLetter);

        // expression complète en toutes lettres
        return numberLetter ;

    }


    /**
    * traitement des deux parties du nombre;
    */
    decint(n){
       switch(n.length){
           case 1 : return this.dix(n);
           case 2 : return this.dix(n);
           case 3 : return this.cent(n.charAt(0)) + " " + this.decint(n.substring(1));
           default: mil=n.substring(0,n.length-3);
               if(mil.length<4){
                   un= (mil==1) ? "" : this.decint(mil);
                   return un + this.mille(mil)+ " " + this.decint(n.substring(mil.length));
               }
               else{
                   mil2=mil.substring(0,mil.length-3);
                   return this.decint(mil2) + this.million(mil2) + " " + this.decint(n.substring(mil2.length));
               }
       }
    }
    /**
     * traitement des nombres entre 0 et 99, pour chaque tranche de 3 chiffres;
     */
    dix(n){
       if(n<10){
           return t[parseInt(n)]
       }
       else if(n>9 && n<20){
           return t2[n.charAt(1)]
       }
       else {
           plus= n.charAt(1)==0 && n.charAt(0)!=7 && n.charAt(0)!=9 ? "" : (n.charAt(1)==1 && n.charAt(0)<8) ? " et " : "-";
           diz= n.charAt(0)==7 || n.charAt(0)==9 ? t2[n.charAt(1)] : t[n.charAt(1)];
           s= n==80 ? "s" : "";

           return t3[n.charAt(0)] + s + plus + diz;
       }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // traitement des mots "this.cent", "this.mille" et "this.million"
    cent(n){
        return n>1 ? t[n]+ " Cent" : (n==1) ? " Cent" : "";
    }

    mille(n){
        return n>=1 ? " Mille" : "";
    }

    million(n){
        return n>=1 ? " Millions" : " Million";
    }
}
