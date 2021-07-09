import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  constructor(public userService: UserServiceService) { }

  ngOnInit(): void {
  }

  get getUser(): string {
    return this.userService.username
  }

}
