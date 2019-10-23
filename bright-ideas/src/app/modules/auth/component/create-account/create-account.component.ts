import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import bcrypt from 'bcryptjs';
import { User } from './../../../../models/user';
import { UserEndpointService } from './../../../../services/user-endpoint/user-endpoint.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    loading = false;
    nameRegex = new RegExp('^[a-zA-Z]+$');
    userNameRegex = new RegExp('^[a-zA-Z0-9_-]{8,25}$');
    passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    
    constructor(private formBuilder: FormBuilder, private userEndPointService: UserEndpointService, private router: Router) { }

    get f() { return this.registerForm.controls; }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
            lastName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
            userName: ['', [Validators.required, Validators.pattern(this.userNameRegex)]],
            eMail: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required,  Validators.pattern(this.passwordRegex)]],
            confirmPassword: ['', [this.matchPassword]]
        });
    }

    onSubmit(){
        this.submitted = true;
        if(this.registerForm.valid){
            console.log(this.registerForm)
            //this.loading = true;
            //this.registerUser();
            alert('User form is valid!!')
        } else {
        alert('User form is not valid!!')
        this.submitted = false;
        }
    }

    newUser(){
        let newUser = new User();
        newUser.emailAddress = this.registerForm.get('eMail').value;
        newUser.password = this.getSaltAndHashPassword();
        newUser.previousPasswords = newUser.password;
        return newUser;
    }

    getSaltAndHashPassword(){
        let password = this.registerForm.get('password').value;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    registerUser(){
        this.userEndPointService.createNewUser(this.newUser())
        .subscribe((data) => {
            this.router.navigate(['login']);
            console.log(data)
        },(error) => {
            this.loading = false;
            console.log(error)
        });
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    matchPassword(FC: FormControl) {
        if(FC.parent){
            let password = FC.parent.get('password').value;
            let confirmPassword = FC.parent.get('confirmPassword').value;
            if(password == confirmPassword){
                console.log('match')
                return null;
            } else {
                console.log(' NOT match')
                
                FC.parent.get('confirmPassword').setErrors({});
                
                console.log(FC.parent.get('confirmPassword'))
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
