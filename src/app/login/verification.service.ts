import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private firestore: AngularFirestore) { }

  verifyUser(email, password){
   return this.firestore.collection('Users', ref => ref.where('email', '==', email)
                                                 .where('password', '==', password))
                                                 .snapshotChanges().pipe(map(users => {
                                                    const user = users[0];
                                                    if (user){
                                                      return user.payload.doc;
                                                    }else{
                                                      return null;
                                                    }
                                                  }));
  }
}
