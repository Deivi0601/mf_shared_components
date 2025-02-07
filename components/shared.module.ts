import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Para formularios reactivos
    RouterModule, // Para enrutamiento
  ],
  exports: [
    CommonModule, // Exporta para que otros componentes standalone lo usen
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
