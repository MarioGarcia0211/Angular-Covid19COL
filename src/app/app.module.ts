import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './shared/components/components.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TablaGeneralComponent } from './pages/tabla-general/tabla-general.component';
import { GraficaComponent } from './pages/grafica/grafica.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    TablaGeneralComponent,
    GraficaComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
