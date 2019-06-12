import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos;
  constructor(private auth: AuthService, private ngFMS: NgFlashMessageService) { }

  ngOnInit() {
     this.todos = this.auth.user.todos;
  }

  refreshList(){
    this.auth.getProfile().subscribe( (data: any) =>{
      this.todos = data.user.todos;
    });
  }
}



