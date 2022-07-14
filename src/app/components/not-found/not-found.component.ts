import { ApiClientService } from '../../api-client/api-client.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-not-foung',
  templateUrl: './not-found.component.html',
  // styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
}
