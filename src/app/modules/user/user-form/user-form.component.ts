import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {UserService} from '../user.service';
import {IUser} from '../../../interfaces/user.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {getLocaleTimeFormat} from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less']
})
export class UserFormComponent implements OnInit {
  user: IUser;
  form: FormGroup;
  selectedValue = null;

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private userService: UserService
  ) {
    this.form = this.fb.group(this.userService.formControl);
  }

  ngOnInit() {
  }

  onSubmit() {

  }
}
