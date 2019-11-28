import { ModalNotificationService } from './../../../../shared/services/modal-notification/modal-notification.service';
import { UserEndpointService } from './../../../../services/user-endpoint/user-endpoint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    loading = false;
    
    constructor(private formBuilder: FormBuilder, 
                private userService: UserEndpointService,
                private router: Router,
                private modalNotificationService: ModalNotificationService) { };

    // Return form controls, for ease of use
    get f() { return this.registerForm.controls; };

    ngOnInit() {
        // Initilize all form controls and set validators
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, this.userService.customRegExpValidator(this.userService.nameRegex)]],
            lastName: ['', [Validators.required, this.userService.customRegExpValidator(this.userService.nameRegex)]],
            userName: ['', [Validators.required, this.userService.customRegExpValidator(this.userService.userNameRegex)]],
            eMail: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, this.userService.customRegExpValidator(this.userService.passwordRegex)]],
            confirmPassword: ['', [this.userService.matchPassword()]]
        });
    };

    onSubmit() {
        this.submitted = true;
        if(this.registerForm.valid){
            this.loading = true;
            this.userService.registerUser(this.registerForm)
            .subscribe((response) => {
                if(response.error){
                    this.modalNotificationService.openModalNotification({ messageFailure: response.error });
                } else {
                    this.modalNotificationService.openModalNotification({ successMessage: response.message });
                    this.router.navigate(['login']);
                }
            },(error) => {
            this.modalNotificationService.openModalNotification({ 
                messageFailure: "Encountered an error creating an account, please try again" });
            console.log(error.error)
            });
            this.loading = false;
        };
    };
};