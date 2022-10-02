import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }
  fetchCategories(){
  return  this.db.list("/categories") .snapshotChanges()
  .pipe(
    map((items) => {
      return items.map((a) => {
        const data = a.payload.val();
        const key = a.payload.key;
        return { key, data };
      });
    })
  );
  }
  
}
