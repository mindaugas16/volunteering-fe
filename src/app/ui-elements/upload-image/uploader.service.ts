import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  constructor(private apiService: ApiService) {
  }

  upload(image): Observable<string> {
    if (!image) {
      return of(null);
    }
    return new Observable(observer => {
      const formData = new FormData();
      formData.append('image', image);
      this.apiService.upload(formData).subscribe(res => {
        observer.next((res as any).fileName);
        observer.complete();
      });
    });
  }
}
