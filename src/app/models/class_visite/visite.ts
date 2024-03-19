export class Visite {
    public numappart: number;
    public num_cli: number;
    public numeroprop: number;

    public date_visite: Date;

    public action: string;
    public modificationEnCours: boolean;

    constructor(
        numappart: number = 0,
        num_cli: number = 0,
        numeroprop: number = 0,

        date_visite: Date = new Date(),

        action: string = '',
        modificationEnCours: boolean = false
    ) {
        this.numappart = numappart;
        this.num_cli = num_cli;
        this.numeroprop = numeroprop;

        this.date_visite = date_visite;

        this.action = action;
        this.modificationEnCours = modificationEnCours;
    }
}
