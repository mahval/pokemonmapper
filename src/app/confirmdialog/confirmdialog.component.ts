import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss']
})
export class ConfirmdialogComponent implements OnInit {
  yesOptionTitle: string;
  noOptionTitle: string;
  title: string;
  question: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.yesOptionTitle = data.yesOptionTitle;
    this.noOptionTitle = data.noOptionTitle;
    this.title = data.title;
    this.question = data.question;
  }

  ngOnInit() {
  }

  reset() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
