import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  constructor(private firestore: AngularFirestore) { }

  registerUser(userInformation){
    return this.firestore.collection('Users')
                         .add(Object.assign({}, userInformation))
                         .then(res => {
                           return res;
                         }).catch(err => {
                           return null;
                         });
  }
}
