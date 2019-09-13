import {Injectable} from '@angular/core';
import {IUser} from '../../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {API_URL} from '../../resources/static.resource';
import {NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUser;
  observable: Observable<IUser>;
  formControl = {
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(4)]]
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private notify: NzNotificationService,
    private router: Router,
  ) {
  }

  login(value): Observable<IUser> {
    if (!this.observable) {
      this.observable = this.http
        .post<{ data: IUser }>(`${API_URL}auth/login`, value)
        .pipe(
          map(d => d.data),
          shareReplay()
        );

      this.observable.subscribe({
        next: val => {
          this.user = val;
        },
        error: err => {
          this.observable = null;
        }
      });
    }

    return this.observable;
  }
}
