import { ApiClientService } from '../../api-client/api-client.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  registerForm: FormGroup;
  image: any;

  constructor(public apiClientService: ApiClientService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private location: Location) {
    this.registerForm = this.formBuilder.group({
      inputPhoto: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      console.log('params : ', params);
      if (params.id > 0 && params.id < 5001) {
        this.registerForm.patchValue({
          inputPhoto : params.id
        });
        this.location.replaceState('/photo/' + this.registerForm.value.inputPhoto);
      }
    });
  }

  ngOnInit() {

  }

  getImageById(id) {
    // if (id === 'all') {
    //   this.image = this.apiClientService.get(environment.PHOTO_API);
    //   console.log('this.image : ', this.image);
    // } else {
      if (id !== 'undefined' ||  id !== 'null') {
        this.image = this.apiClientService.get(environment.PHOTO_API + '/' + id);
        this.location.replaceState('/photo/' + this.registerForm.value.inputPhoto);
      }
      // console.log('this.image : ', this.image);
    // }
  }

  onSubmitPhoto() {
    this.getImageById(this.registerForm.value.inputPhoto);
  }
}
