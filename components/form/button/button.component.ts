import {
  ChangeDetectionStrategy,
  EventEmitter,
  Component,
  Output,
  Input,
} from "@angular/core";

import { SharedModule } from "src/mf_shared_components/shared.module";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  imports: [SharedModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() loading!: boolean;
  @Input() classes!: string;
  @Input() styles!: any;

  @Output() eventButtonClick = new EventEmitter<void>();
}
