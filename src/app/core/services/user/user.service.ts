import { Injectable } from '@angular/core';
import { ApiService } from '../../../api.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ParticipationInterface } from '../../../shared/models/participation.interface';
import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService, private auth: AuthService) {
  }

  getUserOrganizations(id: number | string) {
    return this.apiService.get(`users/${id}/organizations`)
      .pipe(
        map(({organizations}) => organizations)
      );
  }

  getUserParticipation(id?: string | number): Observable<ParticipationInterface[]> {
    return this.apiService.get(`users/${id}/participation`)
      .pipe(
        map(({participation}) => participation)
      );
  }

  getCurrentUserParticipation(): Observable<ParticipationInterface[]> {
    return this.auth.getCurrentUser(false)
      .pipe(
        switchMap(user => {
          return this.getUserParticipation(user._id);
        })
      );
  }
}
