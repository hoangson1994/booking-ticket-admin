import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {HelperService} from '../../../shared/services/helper.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {IUser, UserStatus} from '../../../interfaces/user.interface';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  user: IUser[] = null;
  isLoding: boolean;
  userStatus = UserStatus;

  constructor(
    private userService: UserService,
    private helper: HelperService,
    private notify: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.isLoding = true;
    this.listUser();
  }

  listUser() {
    this.userService.listUser()
      .pipe(
        finalize(() => this.isLoding = false)
      )
      .subscribe({
        next: value => {
          this.user = value;
          console.log(value);
        },
        error: err => {
          this.helper.handleError(err);
        }
      });
  }

  deleteUser(id) {
    console.log(id);
  }
}
