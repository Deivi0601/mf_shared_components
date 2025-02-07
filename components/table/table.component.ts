import {
  ContentChild,
  EventEmitter,
  TemplateRef,
  Component,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from "@angular/core";

import { ItemSkeletonComponent } from "../item-skeleton/item-skeleton.component";

import {
  arrayFilter,
  createArrayByNumber,
} from "src/mf_shared_components/services/helper.service";

import { SharedModule } from "src/mf_shared_components/shared.module";
import { DisabledElementDirective } from "src/mf_shared_components/directives/disabled-element.directive";
import { fadeInCustomAnimation } from "src/mf_shared_components/animations/global.animations";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  imports: [ItemSkeletonComponent, SharedModule, DisabledElementDirective],
  standalone: true,
  animations: [fadeInCustomAnimation("fadeIn", "300ms")],
})
export class TableComponent implements OnChanges {
  @Input() itemsPerPage = 25;
  @Input() selectedItem: [string, any] = [
    "",
    null,
  ]; /** La primera posición es el identificador y el siguiente el valor a comparar */
  @Input() fieldsToFilter: string[] = [];
  @Input() hiddenOptionsPager!: boolean;
  @Input() gridHeaderColumns!: string;
  @Input() gridBodyColumns!: string;
  @Input() loadingTable!: boolean;
  @Input() currentPage!: number;
  @Input() textFilter!: string;
  @Input() totalItems!: number;
  @Input() withPager!: boolean;
  @Input() list: any[] = [];
  @Input() height = "100%";

  @Output() currentPageChange = new EventEmitter<number>();
  @Output() eventRowClick = new EventEmitter<any>();

  @ContentChild(TemplateRef, { static: false }) templateRef!: TemplateRef<any>;

  public listFilter: any[] = [];

  public createArrayByNumber = createArrayByNumber;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["list"]) {
      if (this.textFilter) {
        this.listFilter = arrayFilter(
          this.list,
          this.textFilter,
          this.fieldsToFilter
        );
      } else {
        this.listFilter = this.list;
      }
    }

    if (changes["textFilter"]) {
      this.listFilter = arrayFilter(
        this.list,
        this.textFilter,
        this.fieldsToFilter
      );
    }
  }

  public changeCurrentPage(page: number): void {
    this.currentPage = page;
    this.currentPageChange.emit(page);
  }
}
