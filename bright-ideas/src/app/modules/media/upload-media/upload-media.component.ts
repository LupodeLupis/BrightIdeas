import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/models/media';
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css']
})
export class UploadMediaComponent implements OnInit {

  media: Media;

  constructor() { 

  }

  ngOnInit() {
  }

  onSubmit(f: NgForm): void {

  }
}
