import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/services/master.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  public subject: any;
  public note: any;
  public id: any;
  public uniqueId: any;
  public docId: any;
  public documentId;
  public updateEnable: boolean = false;
  public submitEnable: boolean = true;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private masterService: MasterService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.uniqueId = this.route.snapshot.params.uniqueId;
    this.docId = this.route.snapshot.params.docId;
    if (this.docId){
      this.updateEnable = true;
      this.submitEnable = false;
      this.getNote();
    }
  }

  getNote(){
    this.masterService.getNote(this.uniqueId, this.docId).subscribe(res => {
      this.documentId = res.id;
      this.subject = res.data()['subject'];
      this.note = res.data()['note'];
      console.log(this.subject, this.note);
      // this.subject = res.data().subject;
      // this.note = res.data().note;
    });
  }

  submitNote(){
    if (this.subject && this.note.length > 120 && this.note.length < 160){
    this.masterService.addNote({id: this.id,
                                docId: this.generateRandomNumber(),
                                uniqueId: this.uniqueId,
                                subject: this.subject,
                                note: this.note
                              }).then(res => {
                                  if (res.id){
                                    this.note = '';
                                    this.subject = '';
                                    this.router.navigate(['./home', this.uniqueId, 1]);
                                  }
                                 });
    }else{
      alert('Enter more than 120 and less than 160 characters');
    }
  }

  UpdateNote(){
    this.masterService.updateNote(this.documentId, {id: this.id,
      docId: this.docId,
      uniqueId: this.uniqueId,
      subject: this.subject,
      note: this.note
    }).then(res => {
        alert('Note Updated');
    });
  }

  checkLength(){
    if (this.note.length > 120 && this.note.length < 160){
      console.log(this.note.length);
      alert("Text limit reached");
    }
  }

  generateRandomNumber(){
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
