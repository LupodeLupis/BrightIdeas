import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Media } from 'src/app/models/media';
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css']
})
export class UploadMediaComponent implements OnInit {

  @Output() uploadedFile = new EventEmitter<File>();

  constructor() { 

  }

  ngOnInit() {
    var fileField = (<HTMLInputElement>document.getElementById('mediaInput'));
    fileField.onchange = function()
    {
      //alert(fileField.files[0].size);
      if (fileField.files[0].size > 8388608)
      {
        alert("File size limit: 8mb");
        fileField.value = "";
      }
    };
  }

  onSubmit(): void {
    var fileField = (<HTMLInputElement>document.getElementById('mediaInput'));
    var file = fileField.files[0];
    //console.log(file);
    this.uploadedFile.emit(file);
  }
}
