import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 
  user:Object;
  constructor(
    private auth:AuthService
    ) { }

  ngOnInit() {
    this.auth.getProfile().subscribe((data:any)=>{
      if(data.user){
        this.user = data.user;
      }
    });
  }

  }



