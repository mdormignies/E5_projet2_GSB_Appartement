export class Demande {
    public num_dem: number;
    public statut_dem: string;
    public d_numappart: number;
    public d_num_cli: number;
    public d_numeroprop: number;

    public action: string;

    constructor(
        num_dem: number = 0,
        statut_dem: string = '',
        d_numappart: number = 0,
        d_num_cli: number = 0,
        d_numeroprop: number = 0,

        action: string = ''
    ) {
        this.num_dem = num_dem;
        this.statut_dem = statut_dem;
        this.d_numappart = d_numappart;
        this.d_num_cli = d_num_cli;
        this.d_numeroprop = d_numeroprop;

        this.action = action;
    }
}