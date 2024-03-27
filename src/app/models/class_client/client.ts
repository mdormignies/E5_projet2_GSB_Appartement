export class Client {
    public num_cli: number;
    public email_cli: string;
    public mdp_cli: string;
    public nom_cli: string;
    public prenom_cli: string;
    public adresse_cli: string;
    public codeville_cli: string;
    public tel_cli: string;

    public confirmMdp: string;
    public action: string;
    public role: string;

    constructor(
        num_cli: number = 0,
        email_cli: string = '',
        mdp_cli: string = '',
        nom_cli: string = '',
        prenom_cli: string = '',
        adresse_cli: string = '',
        codeville_cli: string = '',
        tel_cli: string = '',

        confirmMdp: string = '',
        action: string = '',
        role: string = 'client'
    ) {
        this.num_cli = num_cli;
        this.email_cli = email_cli;
        this.mdp_cli = mdp_cli;
        this.nom_cli = nom_cli;
        this.prenom_cli = prenom_cli;
        this.adresse_cli = adresse_cli;
        this.codeville_cli = codeville_cli;
        this.tel_cli = tel_cli;

        this.confirmMdp = confirmMdp;
        this.action = action;
        this.role = role;
    }
}