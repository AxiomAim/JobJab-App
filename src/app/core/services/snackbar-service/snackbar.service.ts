import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class MatSnackBarService {
  constructor(private _matSnackBar: MatSnackBar) {}

  //   openSnackBar(message: string, action: string) {
  //     this.snackBar.open(message, action, {
  //        duration: 2000,
  //     });
  //   }

  success(message: string) {
    this._matSnackBar.open(message, "×", {
      duration: 4500,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["snackbar-success", "success"],
    });
  }
  error(message: string) {
    this._matSnackBar.open(message, "×", {
      duration: 7500,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["snackbar-error", "error"],
    });
  }
  warning(message: string) {
    this._matSnackBar.open(message, "×", {
      duration: 7500,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["snackbar-warn", "warning"],
    });
  }
}
