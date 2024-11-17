import {Injectable} from '@angular/core';
import {UserService} from '../pursit-api-ts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private userService: UserService) {

  }

}
