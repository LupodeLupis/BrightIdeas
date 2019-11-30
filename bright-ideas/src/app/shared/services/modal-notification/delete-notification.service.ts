import { Injectable } from '@angular/core';
import { DeleteNotificationComponent } from '../../component/delete-notification/delete-notification.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DeleteNotificationService {

  constructor(private modalService: NgbModal) { }

  openModalDeletenNotification(deleteNotificationMsg: object)  {
    const modalDeleteRef = this.modalService.open(DeleteNotificationComponent);
    modalDeleteRef.componentInstance.body = deleteNotificationMsg;
  }
}
