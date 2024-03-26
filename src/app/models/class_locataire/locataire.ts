export class Locataire {
    public numeroloc: number;
    public email_loc: string;
    public mdp_loc: string;
    public nom_loc: string;
    public prenom_loc: string;
    public datenaiss: string;
    public tel_loc: string;
    public rib: number;
    public tel_banque: string;
    public numappart: number;

    public confirmMdp: string;
    public action: string;

    constructor(
        numeroloc: number = 0,
        email_loc: string = '',
        mdp_loc: string = '',
        nom_loc: string = '',
        prenom_loc: string = '',
        datenaiss: string = '',
        tel_loc: string = '',
        rib: number = 0,
        tel_banque: string = '',
        numappart: number = 0,

        confirmMdp: string = '',
        action: string = ''
    ) {
        this.numeroloc = numeroloc;
        this.email_loc = email_loc;
        this.mdp_loc = mdp_loc;
        this.nom_loc = nom_loc;
        this.prenom_loc = prenom_loc;
        this.datenaiss = datenaiss;
        this.tel_loc = tel_loc;
        this.rib = rib;
        this.tel_banque = tel_banque;
        this.numappart = numappart;

        this.confirmMdp = confirmMdp;
        this.action = action;
    }
}
