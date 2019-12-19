import { Component, OnInit, Input } from '@angular/core';
import { Idea_Detail } from '../../../../models/idea_detail';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-single-idea',
    templateUrl: './single-idea.component.html',
    styleUrls: ['./single-idea.component.css']
})
export class SingleIdeaComponent implements OnInit {
    @Input() idea: Idea_Detail;
    backgroundImage: any = "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2014/04/idea-spark-730x409.jpg"

    constructor(private domSanitizer: DomSanitizer) { }

    ngOnInit() {
        if(this.idea.backgroundImage){
            this.backgroundImage = this.getSafeImageURL(this.idea.backgroundImage);
        };
    }

    getSafeImageURL(image){
        // Converts arraybuffer to typed array object
        const TYPED_ARRAY = new Uint16Array(image.data);
        // converts the typed array to string of characters
        // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY); // this way causes (ERROR RangeError: Maximum call stack size exceeded) error
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, '');
        //sanitize the url that is passed as a value to image src attrtibute
        return this.domSanitizer.bypassSecurityTrustUrl(STRING_CHAR);
    };
}
