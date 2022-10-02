import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  public setPreviousUrl(url: string) {
    sessionStorage.setItem('previousUrl', url);
  }

  public getPreviousUrl():string {
    const previousUrl = sessionStorage.getItem('previousUrl');
    return previousUrl;
  }

  public deletePreviousUrlKey() {
    sessionStorage.removeItem('previousUrl');
  }
}