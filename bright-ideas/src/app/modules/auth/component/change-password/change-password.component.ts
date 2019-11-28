import { ModalNotificationService } from './../../../../shared/services/modal-notification/modal-notification.service';
import { UserEndpointService } from './../../../../services/user-endpoint/user-endpoint.service';
import { removeToken } from './../../../../../../indexedDB-manager.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { User } from './../../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import bcrypt from 'bcryptjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
    @Input() eMail: string;
    @Input() changePassword: boolean;
    editPasswordForm: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    
    constructor(private formBuilder: FormBuilder,
                private userService: UserEndpointService,
                private router: Router,
                private modalNotificationService: ModalNotificationService,
                private route: ActivatedRoute) { }

    get f() { return this.editPasswordForm.controls; }

    ngOnInit() {
        this.changePassword = this.route.snapshot.paramMap.get('userEmail') ? true : false;
        this.editPasswordForm = this.formBuilder.group({
            currentPassword: ['', this.changePassword ? Validators.required : null],
            password: ['', [Validators.required, this.userService.customRegExpValidator(this.userService.passwordRegex)]],
            confirmPassword: ['', [this.userService.matchPassword()]]
        });
    };

    onSubmit(){
        this.submitted = true;
        if(this.editPasswordForm.valid){
            this.loading = true;
            this.userService.getUserByEmail(this.eMail)
            .subscribe((user) => {
                if(user[0]){
                    let updatingUser: User = user[0];
                    let currentPass = this.editPasswordForm.get('currentPassword').value;
                    let newPass = this.editPasswordForm.get('password').value;
                    let passwordIsCorrect = bcrypt.compareSync(currentPass, updatingUser.password);
                    let newPassMatchPrevPass = bcrypt.compareSync(newPass, updatingUser.previousPasswords);
                    if(this.changePassword){
                        if(passwordIsCorrect){
                            if(!newPassMatchPrevPass){
                                updatingUser.previousPasswords = updatingUser.password;
                                updatingUser.password = this.userService.getSaltAndHashPassword(newPass);
                                this.userService.updateUser(updatingUser).subscribe((data) => {
                                    removeToken();
                                    this.modalNotificationService.openModalNotification({ successMessage: "Successfully updated password" });
                                    this.router.navigate(['login']);
                                    console.log(data);
                                });
                            } else {
                                this.editPasswordForm.get('password').setErrors({ reusePassword: true });
                            };
                        } else {
                            this.editPasswordForm.get('currentPassword').setErrors({ incorrectPassword: true });
                        };
                    } else {
                        updatingUser.previousPasswords = updatingUser.password;
                        updatingUser.password = this.userService.getSaltAndHashPassword(newPass);
                        this.userService.updateUser(updatingUser).subscribe((data) => {
                            removeToken();
                            this.modalNotificationService.openModalNotification({ successMessage: "Successfully reset password" });
                            this.router.navigate(['login']);
                            console.log(data);
                        });
                    };
                };
            },(error) => {
                console.log(error)
            });
            this.loading = false;
        };
    };
};
