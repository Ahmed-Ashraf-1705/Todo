import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 
  user:Object;
  constructor(
    private router:Router,
    private auth:AuthService
    ) { }

  ngOnInit() {
    this.user = this.auth.user;
  }

  }



