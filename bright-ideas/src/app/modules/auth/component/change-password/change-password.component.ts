import { Component, OnInit } from '@angular/core';
import { getDB } from '../../../../../../db-connection.js'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEndpointService } from './../../../../services/user-endpoint/user-endpoint.service';
import bcrypt from 'bcryptjs';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
    editPasswordForm: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    changePassword: boolean = true;
    eMail: string;

    constructor(private formBuilder: FormBuilder, private userService: UserEndpointService, private router: Router) { }

    get f() { return this.editPasswordForm.controls; }

    ngOnInit() {
        this.editPasswordForm = this.formBuilder.group({
            currentPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required,  Validators.pattern(this.userService.passwordRegex)]],
            confirmPassword: ['', [this.matchPassword]]
        });
    }

    onSubmit(){
        this.submitted = true;
        if(this.editPasswordForm.valid){
            this.loading = true;
            this.userService.getUserByEmail(this.eMail)
            .subscribe((user) => {
                if(user[0]){
                    if(
                        this.changePassword
                        &&
                        bcrypt.compareSync(this.editPasswordForm.get('newPassword').value, user[0].password)
                        &&
                        !bcrypt.compareSync(this.editPasswordForm.get('newPassword').value, user[0].previousPasswords)
                        ){
                        this.router.navigate(['home']);
                    }
                }
                this.editPasswordForm.get('password').setErrors({error: true})
            },(error) => {
                console.log(error)
            });
            this.loading = false;
        };
    }

    matchPassword(FC: FormControl) {
        if(FC.parent){
            let password = FC.parent.get('newPassword').value;
            return password == FC.value ? null : {passNotMatching: true};
        }
    }

}
