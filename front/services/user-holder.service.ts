import {EventEmitter, Injectable} from '@angular/core';
import {AuthDto, RegisterDto, UserDto, UserService} from '../api-core-ts';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHolder {

  public currentUser: UserDto | null = null;

  constructor(private userApi: UserService) {
    this.sessionSet(userApi.getSelf(), () => console.log("logined"), () => console.log("not logined"));
  }

  public isLogined(): boolean {
    return this.currentUser != null;
  }

  public checkAdmin(callback: (isAdmin: boolean) => void) {
    this.userApi.checkAdmin()
      .subscribe({
        next: () => callback(true),
        error: () => callback(false)
      });
  }

  public login(authDto: AuthDto, callback: Function, errorCallback: (error: any) => void) {
    this.sessionSet(this.userApi.login(authDto), callback, errorCallback);
  }

  public register(registerDto: RegisterDto, callback: Function, errorCallback: (error: any) => void) {
    this.sessionSet(this.userApi.register(registerDto), callback, errorCallback);
  }

  private sessionSet(userObs: Observable<UserDto>, callback: Function, errorCallback: (error: any) => void) {
    userObs.subscribe({
      next: user => {
        this.currentUser = user;
        console.log('user', user);
        callback(user);
      },
      error: resp => {
        this.currentUser = null;
        errorCallback(resp);
      }
    })
  }

  public logout() {
    this.userApi.logout()
      .subscribe(() => this.currentUser = null);
  }
}
