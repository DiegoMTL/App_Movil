import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }
  onLogin(email,password){
    try{
      const user = this.authSvc.login(email.value,password.value);
      if(user){

      }
    }catch(error){
      console.log('Error->',error)
    }
  }

  async onLoginGoogle(){
    try{
      const user = await this.authSvc.loginGoogle();
      if(user){
        //todo: check email
        (console.log('User->',user))
      }

    }catch(error){
      console.log('Error->',error)
    }
  }



}
