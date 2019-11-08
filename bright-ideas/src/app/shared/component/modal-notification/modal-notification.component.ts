import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.css']
})
export class ModalNotificationComponent implements OnInit {

  @Input() message: object = {};

  constructor(public activeModal: NgbActiveModal) {

  }
  ngOnInit() {
  }
}
