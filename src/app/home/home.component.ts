import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/services/master.service';

export interface Notes {
  id: string;
  docId: string;
  uniqueId: string;
  subject: string;
  note: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  id: any;
  uniqueId: any;
  displayedColumns;
  dataSource;
  notesData: Notes[];
  public documentId: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private masterService: MasterService) { }


  ngOnInit(): void {
    this.uniqueId = this.route.snapshot.params.uniqueId;
    this.id = this.route.snapshot.params.id;

    if (this.id === '0'){
      this.getAllNote();
    }else{
      this.getStudentNotes();
    }
    if (!this.uniqueId){
      this.router.navigate(['./login']);
    }
  }

  getStudentNotes(){
    this.masterService.getStudentNotes(this.uniqueId).subscribe(res => {
      const note = [];
      res.forEach(doc => {
          note.push(doc.payload.doc);
      });
      this.notesData = note;
      this.dataSource = this.notesData;
      console.log(this.dataSource);
    });
    this.displayedColumns = ['uniqueId' , 'subject', 'note', 'id'];
  }

  getAllNote(){
    this.masterService.getAllNotes().subscribe(res => {
     const note = [];
     res.forEach(doc => {
        note.push(doc.payload.doc);
     });
     this.notesData = note;
     this.dataSource = this.notesData;
     console.log(this.dataSource);
    });
    this.displayedColumns = ['uniqueId' , 'subject', 'note', 'id'];
  }

  deleteNote(id){
    this.masterService.deleteNote(id).then(res => {
      //alert
    });
  }

  openNote(docId){
    console.log(docId);
    if (docId){
      this.router.navigate(['./notes', this.uniqueId, this.id , docId]);
    }
  }

}
