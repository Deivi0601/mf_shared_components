import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  exports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
})
export class SharedModule {}
