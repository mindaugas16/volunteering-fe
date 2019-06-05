import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() image;
  @Input() shouldRemoveImage: boolean;

  @Output() imageUpload: EventEmitter<any> = new EventEmitter();
  @Output() removeImage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('inputImageElement') inputImageElement: ElementRef;

  formatImage = true;

  constructor(private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  onRemoveImage() {
    this.image = null;
    this.shouldRemoveImage = true;
    this.inputImageElement.nativeElement.value = this.image;
    this.removeImage.emit(this.shouldRemoveImage);
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageUpload.emit(file);
        this.image = reader.result;
        this.cd.markForCheck();
        this.formatImage = false;
      };
    }
  }

}
