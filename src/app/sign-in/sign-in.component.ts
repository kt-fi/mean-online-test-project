import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signedIn: boolean = false
  constructor(public userService: UserServiceService) { }

  ngOnInit(): void {
  }

  signIn(userRef: NgForm): void {
    let user = userRef.value.username
    this.userService.setUsername(user)
    this.signedIn = true;
  }

}
