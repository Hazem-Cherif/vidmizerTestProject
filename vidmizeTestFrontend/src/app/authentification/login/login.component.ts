import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: string;
  password: string;
  user: any;
  err: string;
  checkUser: boolean = false;
  logedIn: boolean;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  async login() {



    await this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      this.user = data
      if (this.user == null) {
        this.err = 'hello , you need to register first Or your email and password are wrong  :)';
        
      }

      else {
       
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('userName', this.user.firstName);
        this.router.navigate(['/home']);

      }

    })
  }

}

