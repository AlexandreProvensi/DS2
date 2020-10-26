import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  public title: string;
  public message: string;
  public btnColor: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogOption) {
    this.title = data.title;
    this.message = data.message;
    this.btnColor = data.btnColor;            
  }

  /**
   * Informa que a janela foi fechada pelo CANCELAR ("false" na funçao close)
   */
  public onDismiss(): void {
    this.dialogRef.close(false);
  }

  /**
   * Informa que a janela foi fechada pelo CONFIRMAR ("true" na funçao close)
   */
  public onConfirm(): void {
    this.dialogRef.close(true);
  }

}

/**
 * Classe com as options utilizadas na janela modal
 */
export class ConfirmDialogOption {

  constructor(public title: string, public message: string, public btnColor: string = 'primary'){};

}
