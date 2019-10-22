import { Component, OnInit } from '@angular/core';
//import {AbstractControl, FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    nameRegex = new RegExp('^[a-zA-Z]+$');
    userNameRegex = new RegExp('^[a-zA-Z0-9_-]{8,25}$');
    passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
            lastName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
            userName: ['', [Validators.required, Validators.pattern(this.userNameRegex)]],
            eMail: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required,  Validators.pattern(this.passwordRegex)]],
            confirmPassword: ['', [PasswordValidation.MatchPassword]]
        });
    }
    
    get f() { return this.registerForm.controls; }

    onSubmit(){
        this.submitted = true;
        if(this.registerForm.valid){
        alert('User form is valid!!')
        } else {
        alert('User form is not valid!!')
        }
    }
}

class PasswordValidation {
    static MatchPassword(FC: FormControl) {
        if(FC.parent){
            let password = FC.parent.get('password');
            let confirmPassword = FC.parent.get('confirmPassword');
            if(password.value == confirmPassword.value){
                return null;
            } else {
                confirmPassword.setErrors({valid: false})
            }
        }
    }    
}
