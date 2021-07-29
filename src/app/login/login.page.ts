import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onLoginGoogle() {
    this.router.navigate(['tabs']);
    try {
      const user = await this.authSvc.loginGoogle();
      this.router.navigate(['tabs']);
      if (user) {
        
        //const isVerified = this.authSvc.isEmailVerified(user);
        //console.log('verified->',isVerified);
        //this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['tabs']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
