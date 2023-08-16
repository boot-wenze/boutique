import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}
