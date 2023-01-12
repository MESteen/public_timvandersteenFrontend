import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLoginModel} from "../../../../models/user-login.model";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {UserModel} from "../../../../models/user.model";
import {RoleModel} from "../../../../models/role.model";
import {SnackbarService} from "../../../../shared/snackbar.service";
declare  var jQuery:  any;

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss']
})
export class LoginRegistrationComponent implements OnInit {
  tabSelected: LoginSignup = LoginSignup.LOGIN;
  loginSignupEnum: typeof LoginSignup = LoginSignup;

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: Router, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.createSignupFormGroup();
    this.createLoginFormGroup();
  }
  createSignupFormGroup() {
    this.signupForm = this.formBuilder.group({
      username: new FormControl(null,[Validators.required]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl(null,[Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null,[Validators.required]),
    });
  }

  createLoginFormGroup() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null,[Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  OnClickLoginSingup(chooseTab: LoginSignup){
    this.tabSelected = chooseTab;
  }

  UserLogin(postData: {username: string, password: string}){
    let userLogin = new UserLoginModel(postData.username, postData.password);
    this.userService.LoginWithUserCredentials(userLogin).subscribe(success => {
      if(success === true){ //cant simplify (eerste iteratie obj niet gezien als boolean)
        this.route.navigate(['/']);
        this.snackbarService.show('Je bent ingelogd', 'success' );
      }
    });
  }

  UserSignUp(postData: {username: string, password: string, name: string, phone: string, email: string}){
    let roles: RoleModel[] = [];
    let userRegister = new UserModel(0, postData.username, postData.password, postData.name, postData.phone, postData.email, roles);
    this.userService.RegisterUser(userRegister).subscribe(success => {
      if(success === true){ //cant simplify (eerste iteratie obj niet gezien als boolean)
        this.tabSelected = LoginSignup.LOGIN;
        this.snackbarService.show('Je bent geregistreerd', 'success' );
      }
    });
  }

}

export enum LoginSignup{
  LOGIN = 0,
  SIGNUP = 1,
}



