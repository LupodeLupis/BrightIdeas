import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEndpointService } from './../../../../services/user-endpoint/user-endpoint.service';
import { saveToken, tokenIsValid, removeToken } from  './../../../../../../indexedDB-manager.js';


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
            this.userService.login(this.loginForm)
            .subscribe((data) => {
                // Server will return a webToken if login was successful. save the token locally to be used later
                if(data.token){
                    saveToken(data.token);
                    this.router.navigate(['home']);
                };
                this.loginForm.get('password').setErrors({error: true})
            },(error) => {
                console.log(error)
            })
            this.loading = false;
        };
    }
}
