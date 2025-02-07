import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SharedModule } from "src/mf_shared_components/shared.module";
import { slideCustomAnimation } from "src/mf_shared_components/animations/global.animations";
import { DisabledElementDirective } from "src/mf_shared_components/directives/disabled-element.directive";
import { ButtonComponent } from "../form/button/button.component";

interface ButtonsFooter {
  disabled?: boolean;
  hidden?: boolean;
  text?: string;
}

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [SharedModule, DisabledElementDirective, ButtonComponent],
  templateUrl: "./modal.component.html",
  animations: [
    slideCustomAnimation("slideEnterAndLeaveTop", "Y", "-1rem", "0", {
      enter: "400ms",
      leave: "400ms",
    }),
  ],
})
export class ModalComponent implements OnInit {
  @Input() size: "lg" | "md" | "sm" | "xs" = "lg";
  @Input() loadingButtons!: boolean;
  @Input() customStylesBody!: any;
  @Input() hideFooter!: boolean;
  @Input() customStyles!: any;
  @Input() title!: string;

  @Input() secondaryButton!: ButtonsFooter;
  @Input() primaryButton!: ButtonsFooter;

  @Output() eventButtonClick = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.customStyles = {
      ...this.customStyles,
      "grid-template-rows": `${this.title ? "auto" : ""} 1fr auto`,
    };
  }
}
