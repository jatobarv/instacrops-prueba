import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Output() isLogout = new EventEmitter();
  // public username = JSON.parse(localStorage.getItem('user')!).email.split(
  //   '@'
  // )[0];
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.isLogout.emit;
    window.location.reload();
  }
}
