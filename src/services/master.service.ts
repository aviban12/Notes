import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private firestore: AngularFirestore) { }

  addNote(notesData){
    return this.firestore.collection('Notes')
                  .add(notesData)
                  .then(res => {
                    return res;
                  }).catch(err => {
                    return null;
                  });
  }

  updateNote(documentId, updatedNote){
    return this.firestore.collection('Notes')
                         .doc(documentId).update(updatedNote);
  }

  deleteNote(documentId){
    return this.firestore.collection('Notes').doc(documentId).delete().then(res => {
      return res;
    });
  }

  getNote(uniqueId, docId){
    return this.firestore.collection('Notes', ref => ref.where('uniqueId', '==', uniqueId)
                         .where('docId', '==', docId))
                         .snapshotChanges().pipe(map(text => {
                           const data = text[0];
                           if (data){
                             return data.payload.doc;
                           }else{
                             return null;
                           }
                         }));
  }

  getAllNotes(){
    return this.firestore.collection('Notes')
                  .snapshotChanges().pipe(map(notes => {
                    const note = [];
                    if (notes){
                      return notes;
                    }else{
                      return null;
                    }
                  }));
  }

  getStudentNotes(uniqueId){
    return this.firestore.collection('Notes', ref => ref.where('uniqueId', '==', uniqueId))
                         .snapshotChanges().pipe(map(notes => {
                           if (notes){
                             return notes;
                           }else{
                             return null;
                           }
                         }));
  }
}
