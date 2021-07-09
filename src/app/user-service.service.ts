import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  username: string = ""

  constructor() { }

  setUsername(username: string): any {
    this.username = username;
    console.log(this.username);
  }

  getUsername(): string {
    return this.username;
  }
}
