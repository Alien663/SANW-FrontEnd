import { CanActivate } from "@angular/router";
import { APIService } from './api.service'
import { AuthService } from '../Authorization/Authorization.service'

export class PermissionsGuard implements CanActivate{
    constructor(private _auth : AuthService){}
    canActivate( )
    {
        return this._auth.PermissionCheck();
    }
  }