import { ApiClientService } from '../../api-client/api-client.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  listUser: any;
  registerForm: FormGroup;
  listChoice = ['all', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedValue = 'byList';

  constructor(public apiClientService: ApiClientService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private location: Location) {
    this.registerForm = this.formBuilder.group({
      selected: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      console.log('params : ', params);
      if (params.id > 0 && params.id < 11) {
        this.registerForm.patchValue({
          selected : params.id
        });
        if (this.selectedValue === 'byId') {
          this.location.replaceState('/user/' + this.registerForm.value.selected);
        } else {
          this.location.replaceState('/user');
        }
      }
    });
  }

  ngOnInit() {

  }

  getListUser(index?) {
    console.log('index : ', index);
    if (index !== 'undefined') {
      this.location.replaceState('/user');
      if (index === 'all') {
        this.listUser = this.apiClientService.get(environment.USER_API);
      } else {
        this.listUser = this.apiClientService.get(environment.USER_API).pipe(map(
          val => val instanceof Array ?  val.slice(0, index) : val
          ));
      }
    }
  }

  getListUserById(id) {
    if (id !== 'undefined' ||  id !== 'null') {
      if (id === 'all') {
        this.listUser = this.apiClientService.get(environment.USER_API);
        this.location.replaceState('/user');
        console.log('this.listUser : ', this.listUser);
      } else {
        this.listUser = this.apiClientService.get(environment.USER_API + '/' + id);
        this.location.replaceState('/user/' + id);
        console.log('this.listUser : ', this.listUser);
      }
    }
  }

  onSubmit() {
    console.log('selectedValue : ', this.selectedValue);
    console.log('this.registerForm.value : ', this.registerForm.value.selected);
    // get list of user
    if (this.selectedValue === 'byList') {
      return this.getListUser(this.registerForm.value.selected);
    }
    // get user by id
    if (this.selectedValue === 'byId') {
      return this.getListUserById(this.registerForm.value.selected);
    }
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
  }
}
