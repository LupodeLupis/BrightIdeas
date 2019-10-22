import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router,) { }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        eMail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.valid){
    alert('User form is valid!!')
    } else {
    alert('User form is not valid!!')
    }
}

createAccount(){
    this.router.navigate(['/createAccount']);
}

resetPassword(){
    this.router.navigate(['/resetPassword']);
}

}
