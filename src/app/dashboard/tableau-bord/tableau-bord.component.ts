import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SecureStorageService } from 'src/app/services/secure-storage';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-tableau-bord',
  templateUrl: './tableau-bord.component.html',
  styleUrls: ['./tableau-bord.component.scss']
})
export class TableauBordComponent {
  @ViewChild('profil') profil !: ElementRef
  @ViewChild('couverture') couverture !: ElementRef

  name: string = ''
  id = ''
  data !: any

  imgHolder = "https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=612x612&w=0&k=20&c=qRydgCNlE44OUSSoz5XadsH7WCkU59-l-dwrvZzhXsI="
  imgHolder1 = "https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=612x612&w=0&k=20&c=qRydgCNlE44OUSSoz5XadsH7WCkU59-l-dwrvZzhXsI="

  constructor(
    private api: ApiService,
    private securestorage : SecureStorageService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.data = this.api.getInfo()

    console.log(this.data);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {

    });

    dialogRef.afterClosed();
  }

  convertDate(dateString: string) {
    const date = new Date(dateString);

    // Obtenir les composants de date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Les mois sont indexés à partir de 0, donc ajoutez 1
    const year = date.getFullYear();

    // Formater la date dans un format lisible "jour-mois-année"
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    return formattedDate
  }

  openFile(event: string) {
    if (event === 'profil') {
      this.profil.nativeElement.click()
    } else {
      this.couverture.nativeElement.click()
    }
  }

  changeImage(event: string) {
    if (event === 'profil') {
      this.imgHolder1 = './assets/' + this.profil.nativeElement.files[0].name
    } else {
      this.imgHolder = './assets/' + this.couverture.nativeElement.files[0].name
    }
  }

}

