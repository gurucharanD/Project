import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private route:Router){}
  
  canActivate(): boolean {
     let res = Cookie.get('isStudentLoggedIn')=="1";
      if(!res)
     {
      alert("User is not logged In");
      this.route.navigate(['login']);
     }
     return res; 
  }
}
