import { FooterComponent } from './footer/footer.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ToolbarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ToolbarComponent, FooterComponent]
})
export class ComponentsModule { }
