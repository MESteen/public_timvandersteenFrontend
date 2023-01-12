export class ShopProductModel {

  constructor(public productId: number,
              public name: string,
              public beschrijving: string,
              public kleur: string,
              public icon: string,
              public eenheid: string,
              public price: number,){}
}
