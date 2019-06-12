import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title ;
  constructor(
    private auth: AuthService,
    private ngFMS: NgFlashMessageService,
    private router: Router) { }

  ngOnInit() {
  }
  logout(){
    this.auth.logout();
    this.ngFMS.showFlashMessage({
      messages : ['Successfully Logged out!'],
      timeout: 3000,
      type: 'success'
    });
    this.router.navigate(['login']);
    return false;
  }

}
