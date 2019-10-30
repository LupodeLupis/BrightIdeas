import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEndpointService } from './../../../../services/user-endpoint/user-endpoint.service';
import bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    loading = false;

    constructor(private formBuilder: FormBuilder, private userService: UserEndpointService, private router: Router) { }

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
            this.loading = true;
            this.userService.getUserByEmail(this.loginForm.get('eMail').value)
            .subscribe((user) => {
                if(user[0]){
                    if(bcrypt.compareSync(this.loginForm.get('password').value, user[0].password)){
                        this.router.navigate(['home']);
                    }
                }
                this.loginForm.get('password').setErrors({error: true})
            },(error) => {
                console.log(error)
            });
            this.loading = false;
        };
    }
}
