import {Injectable} from "@angular/core";
import {UserLoginModel} from "../models/user-login.model";
import {HttpService} from "../shared/http.service";
import {BehaviorSubject, Observable} from "rxjs";
import {TokenModel} from "../models/token.model";
import {UserModel} from "../models/user.model";

@Injectable({providedIn: 'root'})
export class UserService {

  private currentUser: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({} as UserModel);

  private usersPath = '/users';
  private userByIdPath = '/users/{userId}';
  private authenticatePath = '/authenticate';
  private registerPath = '/register';

  constructor(private http: HttpService){}

  getCurrentUser(): Observable<UserModel>{
    return this.currentUser.asObservable();
  }

  clearCurrentUser(){
    this.currentUser.next({} as UserModel);
  }

  LoginWithUserCredentials(user: UserLoginModel){
    let successful: BehaviorSubject<boolean> = new BehaviorSubject<boolean>({} as boolean);
    this.http.postJSON(this.usersPath + this.authenticatePath, JSON.stringify(user)).subscribe((data: any) => {
      const token = data as TokenModel;
      if(token.token){
        localStorage.setItem('user', JSON.stringify({ token: token.token, username: user.username }));
        this.setCurrentUser();
        successful.next(true);
      }
    },(error)=>{
      localStorage.removeItem('user');
      successful.next(false);
    });
    return successful.asObservable();
  }

  setCurrentUser(): Observable<UserModel> {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    let data = new UserLoginModel(user?.username, '');
    this.http.postJSON(this.usersPath + '/username', JSON.stringify(data)).subscribe(data => {
      const user = data as never;
      this.currentUser.next(user);
    });
    return this.currentUser.asObservable();
  }

  RegisterUser(user: UserModel){
    let useObj = this.createDtoObject(user);
    let successful: BehaviorSubject<boolean> = new BehaviorSubject<boolean>({} as boolean);
    this.http.postJSON(this.usersPath + this.registerPath, JSON.stringify(useObj)).subscribe(data => {
      if(user?.username === data?.username){
        successful.next(true);
      }
    },(error)=>{
      successful.next(false);
    });
    return successful.asObservable();
  }

  getUserById(userId: number) {
    return this.http.getWithAuth<UserModel>(this.userByIdPath.replace('{userId}', userId.toString()));
  }

  private createDtoObject(user: UserModel) {
    let jsonObj = {
      "username": user.username,
      "password": user.password,
      "email": user.email,
      "phone": user.phone,
      "name": user.name,
    }

    return jsonObj;
  }

  isCurrentUserAdmin() {
    let isAdmin = false;

    this.currentUser?.getValue()?.roles?.forEach(role => {
      if(role.name === "ADMIN"){
        isAdmin = true;
      }
    })
    return isAdmin;
  }

  isCurrentUserUser() {
    let isAdmin = false;

    this.currentUser?.getValue()?.roles?.forEach(role => {
      if(role.name === "USER"){
        isAdmin = true;
      }
    })
    return isAdmin;
  }

  isCurrentUserAuthenticated() {
    let isAdmin = false;

    this.currentUser?.getValue()?.roles?.forEach(role => {
      if(role.name === "USER" || role.name === "ADMIN"){
        isAdmin = true;
      }
    })
    return isAdmin;
  }
}
