import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  user: any;
  userList: any
  err = false;
  checkUser: boolean = true;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  //checking if the user exist or not 
  async checkuserState() {
    await this.userService.checkUser(this.registerForm.value.email).subscribe(data => {
      this.user = data;
    })
    if (this.user == null) {
      this.checkUser = false
    } else {
      this.checkUser = true
    }
  }

  async register() {
    this.checkuserState()
    if (this.checkUser == false) {
      await this.userService.registerUser(this.registerForm.value).subscribe(() => this.userList = [this.registerForm.value, ...this.userList]);
      this.router.navigate(['/login']);
    } else {
      this.err = true;
    }
  }
}

