export class Proprietaire {
    public numeroprop: number;
    public mdp_prop: string;
    public nom_prop: string;
    public prenom_prop: string;
    public adresse_prop: string;
    public codeville_prop: string;
    public tel_prop: string;

    public confirmMdp: string;
    public action: string;

    constructor(
        numeroprop: number = 0,
        mdp_prop: string = '',
        nom_prop: string = '',
        prenom_prop: string = '',
        adresse_prop: string = '',
        codeville_prop: string = '',
        tel_prop: string = '',

        confirmMdp: string = '',
        action: string = ''
    ) {
        this.numeroprop = numeroprop;
        this.mdp_prop = mdp_prop;
        this.nom_prop = nom_prop;
        this.prenom_prop = prenom_prop;
        this.adresse_prop = adresse_prop;
        this.codeville_prop = codeville_prop;
        this.tel_prop = tel_prop;

        this.confirmMdp = confirmMdp;
        this.action = action;
    }
}
