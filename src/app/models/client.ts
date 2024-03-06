export class Client {
    public num_cli: number;
    public mdp_cli: string;
    public nom_cli: string;
    public prenom_cli: string;
    public adresse_cli: string;
    public cp_cli: string;
    public tel_cli: string;

    constructor(
        num_cli: number = 0,
        mdp_cli: string = '',
        nom_cli: string = '',
        prenom_cli: string = '',
        adresse_cli: string = '',
        cp_cli: string = '',
        tel_cli: string = ''
    ) {
        this.num_cli = num_cli;
        this.mdp_cli = mdp_cli;
        this.nom_cli = nom_cli;
        this.prenom_cli = prenom_cli;
        this.adresse_cli = adresse_cli;
        this.cp_cli = cp_cli;
        this.tel_cli = tel_cli;
    }
}