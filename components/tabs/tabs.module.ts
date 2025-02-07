import { NgModule } from "@angular/core";
import { TabItemComponent } from "./tab-item/tab-item.component";
import { TabsGroupsComponent } from "./tabs-groups/tabs-groups.component";
import { SharedModule } from "src/mf_shared_components/shared.module";
import { DisabledElementDirective } from "src/mf_shared_components/directives/disabled-element.directive";

@NgModule({
  declarations: [TabItemComponent, TabsGroupsComponent],
  exports: [TabItemComponent, TabsGroupsComponent],
  imports: [SharedModule, DisabledElementDirective],
})
export class TabsModule {}
