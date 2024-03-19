export class Appartement {
    public numappart: number;
    public rue: string;
    public arrondisse: number;
    public etage: number;
    public typappart: string;
    public prix_loc: number;
    public prix_charg: number;
    public ascenseur: boolean;
    public preavis: boolean;
    public date_libre: string;
    public numeroprop: number;

    public action: string;

    constructor(
        numappart: number = 0,
        rue: string = '',
        arrondisse: number = 0,
        etage: number = 0,
        typappart: string = '',
        prix_loc: number = 0,
        prix_charg: number = 0,
        ascenseur: boolean = false,
        preavis: boolean = false,
        date_libre: string = '',
        numeroprop: number = 0,
        
        action: string = ''
    ) {
        this.numappart = numappart;
        this.rue = rue;
        this.arrondisse = arrondisse;
        this.etage = etage;
        this.typappart = typappart;
        this.prix_loc = prix_loc;
        this.prix_charg = prix_charg;
        this.ascenseur = ascenseur;
        this.preavis = preavis;
        this.date_libre = date_libre;
        this.numeroprop = numeroprop;

        this.action = action;
    }
}