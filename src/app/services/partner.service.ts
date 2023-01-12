import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpService} from "../shared/http.service";
import {PartnerModel} from "../models/partner.model";
import {SnackbarService} from "../shared/snackbar.service";

@Injectable({providedIn: 'root'})
export class PartnerService {

  private allPartners: BehaviorSubject<PartnerModel[]> = new BehaviorSubject<PartnerModel[]>([] as PartnerModel[]);

  private partnerUrl = '/partner';
  private addPartnerUrl = '/partner/add';
  private deletePartnerUrl = '/partner/delete/{partnerId}';
  private editPartnerUrl = '/partner/edit/{partnerId}';

  constructor(private http: HttpService, private snackbarService: SnackbarService){}

  getAllPartners(): Observable<PartnerModel[]>{
    return this.allPartners.asObservable();
  }

  getPartnerItems(): Observable<PartnerModel[]> {
    this.http.get<PartnerModel[]>(this.partnerUrl + '/all').subscribe(data => {
      let partners = data as never[];
      this.allPartners.next(partners);
    });
    return this.allPartners.asObservable();
  }

  //POST
  AddPartnerItem(partner: PartnerModel) {
    let jsonObj = this.createDtoObject(partner);
    return this.http.postJSON(this.addPartnerUrl, JSON.stringify(jsonObj)).subscribe(data => {
      this.getPartnerItems();
      this.snackbarService.show("Partner toegevoegd", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  //PUT
  EditPartner(partner: PartnerModel) {
    let jsonObj = this.createDtoObject(partner);
    return this.http.putJSON(this.editPartnerUrl.replace('{partnerId}', partner.partnerId.toString()), JSON.stringify(jsonObj)).subscribe(data => {
      this.getPartnerItems();
      this.snackbarService.show("Partner aangepast", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  //DELETE
  DeletePartner(partnerId: number) {
    return this.http.delete(this.deletePartnerUrl.replace('{partnerId}', partnerId.toString())).subscribe( data => {
      this.getPartnerItems();
      this.snackbarService.show("Partner verwijdert", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  private createDtoObject(partner: PartnerModel) {
    let jsonObj = {
      "image": partner.image,
      "brand": partner.brand,
      "href": partner.href,
    }

    return jsonObj;
  }
}
