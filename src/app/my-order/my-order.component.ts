import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
})
export class MyOrderComponent implements OnInit {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  post: Observable<any>;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  
  }
  onGetPost(){
   const params=new HttpParams().set("id","1");

const headers=new HttpHeaders().set("Authorization","auth-token")
    this.post = this.http.get(this.ROOT_URL+'/posts',{headers});
  }
}
