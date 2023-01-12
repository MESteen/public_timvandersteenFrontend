export class UpcomingGameModel{

  constructor(public wedstrijdId: number,
              public courseNaam: string,
              public wedstrijdNaam: string,
              public aantalDagen: number,
              public wedstrijdBaanImage: string,
              public wedstrijdLink: string,
              public baanLogo: string,
              public datum: string,
              public gespeeld: boolean){}
}
