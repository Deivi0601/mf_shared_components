import { Component, Input } from "@angular/core";
import { SharedModule } from "src/mf_shared_components/shared.module";

@Component({
  selector: "app-item-skeleton",
  templateUrl: "./item-skeleton.component.html",
  imports: [SharedModule],
  standalone: true,
})
export class ItemSkeletonComponent {
  @Input() customStyles!: any;
  constructor() {}
}
