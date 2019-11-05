import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
    
    constructor(private formBuilder: FormBuilder, private userService: UserEndpointService, private router: Router) { }

    get f() { return this.registerForm.controls; }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.pattern(this.userService.nameRegex)]],
            lastName: ['', [Validators.required, Validators.pattern(this.userService.nameRegex)]],
            userName: ['', [Validators.required, Validators.pattern(this.userService.userNameRegex)]],
            eMail: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(this.userService.passwordRegex)]],
            confirmPassword: ['', [this.matchPassword]]
        });
    }

    onSubmit(){
        this.submitted = true;        
        if(this.registerForm.valid){
            this.loading = true;
            this.userService.registerUser(this.registerForm)
            .subscribe((response) => {
                if(response.error){
                    alert(response.error)
                } else {
                    this.router.navigate(['login']);
                }        
            },(error) => {
                console.log(error.error)
            });
            this.loading = false;
        }
    }

    matchPassword(FC: FormControl) {
        if(FC.parent){
            let password = FC.parent.get('password').value;
            return password == FC.value ? null : {passNotMatching: true};
        }
    }

}
