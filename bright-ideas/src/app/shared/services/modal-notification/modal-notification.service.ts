import { Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalNotificationComponent } from '../../component/modal-notification/modal-notification.component';
import { DeleteNotificationComponent } from '../../component/delete-notification/delete-notification.component';

@Injectable({
  providedIn: 'root'
})
export class ModalNotificationService {

  constructor(private modalService: NgbModal) { }

  openModalNotification(notificationMsg: object) {
    const modalRef = this.modalService.open(ModalNotificationComponent);
    modalRef.componentInstance.message = notificationMsg;
  }


  openModalDeletenNotification(deleteNotificationMsg: object)  {
    console.log(deleteNotificationMsg)
    const modalDeleteRef = this.modalService.open(DeleteNotificationComponent);
    modalDeleteRef.componentInstance.body = deleteNotificationMsg;
  }

}
