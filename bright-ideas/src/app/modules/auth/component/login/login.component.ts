import { ModalNotificationService } from './../../../../shared/services/modal-notification/modal-notification.service';
import { UserEndpointService } from './../../../../services/user-endpoint/user-endpoint.service';
import { saveToken } from  './../../../../../../indexedDB-manager.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../../shared/services/session-storage/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    loading = false;

    constructor(private formBuilder: FormBuilder,
                private userService: UserEndpointService,
                private router: Router,
                private modalNotificationService: ModalNotificationService,
                private sessionStorageService: SessionStorageService,
                ) { }

    // Return form controls, for ease of use
    get f() { return this.loginForm.controls; };

    ngOnInit() {
        // Initilize all form controls and set validators
        this.loginForm = this.formBuilder.group({
            eMail: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    };

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.valid) {
            this.loading = true;
            this.userService.login(this.loginForm)
            .subscribe((response) => {
                // Server will return a webToken if login was successful. save the token locally to be used later
                if (response.token) {
                    saveToken(response.token);
                    this.sessionStorageService.saveUser(response.user)
                    this.router.navigate(['home']);
                }
                this.loginForm.get('password').setErrors({ error: true });
            },(error) => {
                this.modalNotificationService.openModalNotification(
                    { messageFailure: 'Encountered an error logging in, please try again'
                });
            });
            this.loading = false;
        }
    }
}
