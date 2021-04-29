import { Component, Input } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'instacrops';
  isSignedIn: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('token') !== null) this.isSignedIn = true;
    else this.isSignedIn = false;
  }

  async onSignIn(email: string, password: string) {
    (await this.authService.signin(email, password)).subscribe(
      (a: any) => {
        this.isSignedIn = true;
        localStorage.setItem('token', a.idToken);
      },
      (error) => {
        if (error.status === 401) {
          alert(error.error.message);
        }
      }
    );
  }

  handleLogOut() {
    this.isSignedIn = false;
  }
}
