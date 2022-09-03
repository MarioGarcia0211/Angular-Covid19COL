import { Paciente } from './../../models/paciente';
import { ConexionService } from './../../services/conexion.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {

  charts: any = [];
  limit = 2000;
  loading = true;

  //Datos para la gráfica de género
  contMasculino = 0;
  contFemenino = 0;
  porcMasculino = 0;
  porcFemenino = 0;

  //Datos para la grafica de tipo de contagio
  contRelacionado = 0;
  contImportado = 0;
  contComunitario = 0
  contEstudio = 0;
  porcRelacionado = 0;
  porcImportado = 0;
  porcComunitario = 0
  porcEstudio = 0;

  //Datos para la grafica de los recuperados y muertos
  contRecuperado = 0;
  contMuerto = 0;
  porcRecuperado = 0;
  porcMuerto = 0;

  //Datos para la grafica del tipo de recuperacion
  contPCR = 0;
  contTiempo = 0;
  contNoRecuperado = 0;
  porcPCR = 0;
  porcTiempo = 0;
  porcNoRecuperado = 0;

  //Datos para la grafica de los distritos
  contBarrancabermeja = 0;
  contBarranquilla = 0;
  contBogota = 0;
  contBuenaventura = 0;
  contCali = 0;
  contCartagena = 0;
  contMedellin = 0;
  contMompox = 0;
  contRiohacha = 0;
  contSantaMarta = 0;
  contTumaco = 0;
  contTurbo = 0;
  porcBarrancabermeja = 0;
  porcBarranquilla = 0;
  porcBogota = 0;
  porcBuenaventura = 0;
  porcCali = 0;
  porcCartagena = 0;
  porcMedellin = 0;
  porcMompox = 0;
  porcRiohacha = 0;
  porcSantaMarta = 0;
  porcTumaco = 0;
  porcTurbo = 0;

  //Datos para la grafica de los extranjeros
  contExtranjero = 0;
  contNacional = 0;
  porcExtranjero = 0;
  porcNacional = 0;

  //Datos para la grafica de las edades
  contPe = 0;
  contSe = 0;
  contTe = 0;
  contCe = 0;
  porcPe = 0;
  porcSe = 0;
  porcTe = 0;
  porcCe = 0;

  //Datos para la grafica de los estados
  contFallecido = 0;
  contGrave = 0;
  contLeve = 0;
  contModerado = 0;
  contNA = 0;
  porcFallecido = 0;
  porcGrave = 0;
  porcLeve = 0;
  porcModerado = 0;
  porcNA = 0;

  //Datos para la grafica de la ubicacion
  contCasa = 0;
  contFado = 0;
  contHospital = 0;
  contUbiNA = 0;
  contUCI = 0;
  porcCasa = 0;
  porcFado = 0;
  porcHospital = 0;
  porcUbiNA = 0;
  porcUCI = 0;

  constructor(private cs: ConexionService) { }

  ngOnInit(): void {
    this.setCharts();
  }

  //Método para obtener los datos y dibujar las gráficas
  setCharts(){
    this.cs.mostrarPacientes('?$limit='+this.limit+'&$select=sexo, fuente_tipo_contagio, fecha_recuperado, tipo_recuperacion, ciudad_municipio_nom, pais_viajo_1_nom, edad, estado, ubicacion').subscribe((lista: Paciente[]) => {

      //Recorrido de la información para obtener la cantidad de hombres y mujeres
      lista.forEach(res => {
        if(res.sexo == 'M' || res.sexo == 'm'){
          this.contMasculino++;
        }if(res.sexo == 'F' || res.sexo == 'f'){
          this.contFemenino++;
        }
      });

      //Porcentaje de la grafica genero
      this.porcMasculino = (this.contMasculino * 100)/lista.length;
      this.porcFemenino = (this.contFemenino * 100)/lista.length;

      //Diseño de la gráfica de genero
      this.charts = new Chart('genero', {

        type: 'pie',
        data:{
          labels: ['Hombres', 'Mujeres'],
          datasets: [{
            label: 'Género',
            data: [this.contMasculino, this.contFemenino, ],
            backgroundColor: ['rgb(19, 76, 174)', 'rgb(200, 3, 131)'],
            hoverBackgroundColor: ['rgb(54, 121, 180)', 'rgb(204, 46, 149)'],
            hoverBorderColor: ['rgb(12, 58, 136)', 'rgb(158, 0, 103)'],
            borderWidth: 0
          }]
        }

      });
      //Fin diseño gráfica de género
      //------------------------------------------------------

      //Recorrido de la información para obtener la cantidad de los diferentes tipos de contagio
      lista.forEach(res => {
        if(res.fuente_tipo_contagio == 'Relacionado'){
          this.contRelacionado++;
        }if(res.fuente_tipo_contagio == 'Comunitaria'){
          this.contComunitario++;
        }if(res.fuente_tipo_contagio == 'Importado'){
          this.contImportado++;
        }
      });

      //Porcentaje de la grafica del tipo de contagio
      this.porcRelacionado = (this.contRelacionado * 100)/lista.length;
      this.porcImportado = (this.contImportado * 100)/lista.length;
      this.porcComunitario = (this.contComunitario * 100)/lista.length;

      //Diseño de la gráfica del tipo de contagio
      this.charts = new Chart('tipocontagio', {

        type: 'pie',
        data:{
          labels: ['Comunitario', 'Importado', 'Relacionado'],
          datasets: [{
            label: 'Tipo de contagio',
            data: [this.contComunitario, this.contImportado, this.contRelacionado],
            backgroundColor: ['rgb(255, 117, 3)', 'rgb(2, 159, 159)', 'rgb(17, 17, 17)'],
            hoverBackgroundColor: ['rgb(255, 147, 58)', 'rgb(38, 166, 166)', 'rgb(68, 68, 68)'],
            hoverBorderColor: ['rgb(205, 93, 0)', 'rgb(0, 123, 123)', 'rgb(0, 0, 0)'],
            borderWidth: 0
          }]
        }

      });
      //Fin diseño gráfica del tipo de contagio
      //------------------------------------------------------


      //Recorrido de la información para obtener la cantidad de recuperados y muertos
      lista.forEach(res => {
        if(res.fecha_recuperado == undefined || res.fecha_recuperado == null){
          this.contMuerto++;
        }else{
          this.contRecuperado++;
        }
      });

      //Porcentaje de la grafica de los recuperados y muertos
      this.porcMuerto = (this.contMuerto * 100)/lista.length;
      this.porcRecuperado = (this.contRecuperado * 100)/lista.length;

      //Diseño de la gráfica de los recuperados
      this.charts = new Chart('recuperado', {

        type: 'pie',
        data:{
          labels: ['Muertos', 'Recuperados'],
          datasets: [{
            label: 'Muertos y Recuperados',
            data: [this.contMuerto, this.contRecuperado],
            backgroundColor: ['rgb(254, 7, 7)', 'rgb(6, 203, 6)'],
            hoverBackgroundColor: ['rgb(255, 59, 59)', 'rgb(49, 208, 49)'],
            hoverBorderColor: ['rgb(197, 0, 0)', 'rgb(0, 158, 0)'],
            borderWidth: 0
          }]
        }

      });
      //Fin diseño gráfica de los recuperados
      //------------------------------------------------------

      //Recorrido de la información para obtener el tipo de recuperacion
      lista.forEach(res => {
        if(res.tipo_recuperacion == 'PCR'){
          this.contPCR++;
        }if(res.tipo_recuperacion == 'Tiempo'){
          this.contTiempo++;
        }if(res.tipo_recuperacion == null){
          this.contNoRecuperado++;
        }
      });

      //Porcentaje de la grafica el tipo de recuperacion
      this.porcPCR = (this.contPCR * 100)/lista.length;
      this.porcTiempo = (this.contTiempo * 100)/lista.length;
      this.porcNoRecuperado = (this.contNoRecuperado * 100)/lista.length;

      //Diseño de la gráfica el tipo de recuperacion
      this.charts = new Chart('tiporecuperacion', {

        type: 'pie',
        data:{
          labels: ['PCR', 'Tiempo', 'No recuperado'],
          datasets: [{
            label: 'Tipo de recuperacion',
            data: [this.contPCR, this.contTiempo, this.contNoRecuperado],
            backgroundColor: ['rgb(254, 227, 7)', 'rgb(5, 147, 153)', 'rgb(115, 53, 0)'],
            hoverBackgroundColor: ['rgb(255, 234, 59)', 'rgb( 39, 157, 163)', 'rgb(151, 70, 0)'],
            hoverBorderColor: ['rgb(198, 176, 0)', 'rgb(1, 114, 119)', 'rgb(71, 33, 0)'],
            borderWidth: 0
          }]
        }

      });
      //Fin diseño gráfica el tipo de recuperacion
      //------------------------------------------------------

      //Recorrido de la información para obtener los extranjeros
      lista.forEach(res => {
        if(res.pais_viajo_1_nom == undefined || res.fecha_recuperado == null){
          this.contNacional++;
        }else{
          this.contExtranjero++;
        }
      });

      //Porcentaje de la grafica de los extranjeros
      this.porcExtranjero = (this.contExtranjero * 100)/lista.length;
      this.porcNacional = (this.contNacional * 100)/lista.length;

       //Diseño de la gráfica de los extranjeros
       this.charts = new Chart('extranjeros', {

        type: 'pie',
        data:{
          labels: ['Extranjeros', 'Nacionales'],
          datasets: [{
            label: 'Extranjeros y Nacionales',
            data: [this.contExtranjero, this.contNacional],
            backgroundColor: ['rgb(0, 255, 255)', 'rgb(88, 48, 123)'],
            hoverBackgroundColor: ['rgb(0, 253, 253)', 'rgb(105, 51, 151)'],
            hoverBorderColor: ['rgb(0, 213, 213)', 'rgb(68, 41, 91)'],
            borderWidth: 0
          }]
        }

      });
      //Fin diseño grafica de los extranjeros
      //--------------------------------------------------------

      //Recorrido de la información para obtener las edades
      lista.forEach(res => {
        let edades: any = res.edad;
        if(parseInt(edades) < 12){
          this.contPe++;
        }if(parseInt(edades) > 11 && parseInt(edades) < 27){
          this.contSe++;
        }if(parseInt(edades) > 26 && parseInt(edades) < 60){
          this.contTe++;
        }if(parseInt(edades) > 59){
          this.contCe++;
        }
      });

      this.porcPe = (this.contPe * 100)/lista.length;
      this.porcSe = (this.contSe * 100)/lista.length;
      this.porcTe = (this.contTe * 100)/lista.length;
      this.porcCe = (this.contCe * 100)/lista.length;

      //Diseño de la grafica de las edades
      this.charts = new Chart('edades', {
        type: 'pie',
        data: {
          labels: ['0 - 11', '12 - 26', '27 - 59', '60 en adelante'],
         datasets: [{
          data: [this.contPe, this.contSe, this.contTe, this.contCe],
          backgroundColor: ['rgb(54, 97, 255)', 'rgb(255, 111, 111)', 'rgb(133, 203, 0)', 'rgb(73, 73, 73)'],
          hoverBackgroundColor: ['rgb(74, 113, 255)', 'rgb(255, 159, 159)', 'rgb(149, 228, 0)', 'rgb(110, 110, 110)'],
          hoverBorderColor: ['rgb(36, 82, 251)', 'rgb(255, 71, 71)', 'rgb(115, 176,0)', 'rgb(29, 29, 29)'],
          borderWidth: 0
         }]
        }
      })
      //Fin diseño gráfica de las edades
      //------------------------------------------------------

      //Recorrido de la información para obtener los estados
      lista.forEach(res => {
        if(res.estado == 'Fallecido'){
          this.contFallecido++;
        }if(res.estado == 'Grave'){
          this.contGrave++;
        }if(res.estado == 'Leve' || res.estado == 'LEVE' || res.estado == 'leve'){
          this.contLeve++;
        }if(res.estado == 'Moderado'){
          this.contModerado++;
        }if(res.estado == 'N/A'){
          this.contNA++;
        }
      })

      //Porcentaje de la grafica de los estados
      this.porcFallecido = (this.contFallecido * 100)/lista.length;
      this.porcGrave = (this.contGrave * 100)/lista.length;
      this.porcLeve = (this.contLeve * 100)/lista.length;
      this.porcModerado = (this.contModerado * 100)/lista.length;
      this.porcNA = (this.contNA * 100)/lista.length;

      //Diseño de la grafica de los estados
      this.charts = new Chart ('estados', {
        type: 'pie',
        data:{
          labels: ['Fallecido', 'Grave', 'Leve', 'Moderado', 'N/A'],
          datasets: [{
            label: 'Estados',
            data: [this.contFallecido, this.contGrave, this.contLeve, this.contModerado, this.contNA],
            backgroundColor: ['rgb(249, 213, 38)', 'rgb(73, 43, 171)', 'rgb(30, 199, 30)', 'rgb(247, 37, 43)', 'rgb(41, 75, 168)'],
            hoverBackgroundColor: ['rgb( 246, 217, 77)', 'rgb(91, 66, 169)', 'rgb(62, 197, 62)', 'rgb( 244, 76, 81)', 'rgb(64, 92, 166)'],
            hoverBorderColor: ['rgb(241, 200, 0)', 'rgb(53, 18, 166)', 'rgb(0, 193, 0)', 'rgb(239, 0, 6)', 'rgb(17, 56, 162)'],
            borderWidth: 0
          }]
        }
      });
      //Fin diseño gráfica de los estados
      //------------------------------------------------------

      //Recorrido de la informacion para obtener la ubicacion de los casos
      lista.forEach(res => {
        if(res.ubicacion == 'Casa' || res.ubicacion == 'casa' || res.ubicacion == 'CASA'){
          this.contCasa++;
        }if(res.ubicacion == 'Fallecido'){
          this.contFado++;
        }if(res.ubicacion == 'Hospital'){
          this.contHospital++;
        }if(res.ubicacion == 'Hospital UCI'){
          this.contUCI++;
        }if(res.ubicacion == 'N/A'){
          this.contUbiNA++;
        }
      });

      //Porcentaje de la grafica de las ubicaciones de los casos
      this.porcCasa = (this.contCasa * 100)/lista.length;
      this.porcFado = (this.contFado * 100)/lista.length;
      this.porcHospital = (this.contHospital * 100)/lista.length;
      this.porcUCI = (this.contUCI * 100)/lista.length;
      this.porcUbiNA = (this.contUbiNA * 100)/lista.length;

      //Diseño de la grafica de las ubicaciones de los casos
      this.charts = new Chart ('ubicacion', {
        type: 'pie',
        data:{
          labels: ['Casa', 'Fallecido', 'Hospital', 'Hospital UCI', 'N/A'],
          datasets: [{
            label: 'Estados',
            data: [this.contCasa, this.contFado, this.contHospital, this.contUCI ,this.contUbiNA],
            backgroundColor: ['rgb(249, 213, 38)', 'rgb(73, 43, 171)', 'rgb(30, 199, 30)', 'rgb(247, 37, 43)', 'rgb(41, 75, 168)'],
            hoverBackgroundColor: ['rgb( 246, 217, 77)', 'rgb(91, 66, 169)', 'rgb(62, 197, 62)', 'rgb( 244, 76, 81)', 'rgb(64, 92, 166)'],
            hoverBorderColor: ['rgb(241, 200, 0)', 'rgb(53, 18, 166)', 'rgb(0, 193, 0)', 'rgb(239, 0, 6)', 'rgb(17, 56, 162)'],
            borderWidth: 0
          }]
        }
      });


      //Recorrido de la información para obtener los distritos
      lista.forEach(res => {
        if(res.ciudad_municipio_nom == 'BARRANCABERMEJA'){
          this.contBarrancabermeja++;
        }if(res.ciudad_municipio_nom == 'BARRANQUILLA'){
          this.contBarranquilla++;
        }if(res.ciudad_municipio_nom == 'BOGOTA'){
          this.contBogota++;
        }if(res.ciudad_municipio_nom == 'BUENAVENTURA'){
          this.contBuenaventura++;
        }if(res.ciudad_municipio_nom == 'CALI'){
          this.contCali++;
        }if(res.ciudad_municipio_nom == 'CARTAGENA'){
          this.contCartagena++;
        }if(res.ciudad_municipio_nom == 'MEDELLIN'){
          this.contMedellin++;
        }if(res.ciudad_municipio_nom == 'MOMPOX'){
          this.contMompox++;
        }if(res.ciudad_municipio_nom == 'RIOHACHA'){
          this.contRiohacha++;
        }if(res.ciudad_municipio_nom == 'SANTA MARTA'){
          this.contSantaMarta++;
        }if(res.ciudad_municipio_nom == 'TUMACO'){
          this.contTumaco++;
        }if(res.ciudad_municipio_nom == 'TURBO'){
          this.contTurbo++;
        }
      });

      //Porcentaje de la grafica de los distritos
      this.porcBarrancabermeja = (this.contBarrancabermeja * 100)/lista.length;
      this.porcBarranquilla = (this.contBarranquilla * 100)/lista.length;
      this.porcBogota = (this.contBogota * 100)/lista.length;
      this.porcBuenaventura = (this.contBuenaventura * 100)/lista.length;
      this.porcCali = (this.contCali * 100)/lista.length;
      this.porcCartagena = (this.contCartagena * 100)/lista.length;
      this.porcMedellin = (this.contMedellin * 100)/lista.length;
      this.porcMompox = (this.contMompox * 100)/lista.length;
      this.porcRiohacha = (this.contRiohacha * 100)/lista.length;
      this.porcSantaMarta = (this.contSantaMarta * 100)/lista.length;
      this.porcTumaco = (this.contTumaco * 100)/lista.length;
      this.porcTurbo = (this.contTurbo * 100)/lista.length;

      //Diseño de la gráfica del distrito
      this.charts = new Chart('distritos', {

        type: 'bar',
        data:{
          labels: ['Distritos de Colombia'],
          datasets: [{
            label: 'Barrancabermeja',
            data: [this.contBarrancabermeja],
            backgroundColor: 'rgb(255, 3, 3)',
            hoverBackgroundColor: 'rgb(255, 58, 58)',
            borderColor: 'rgb(161, 0, 0)',
            hoverBorderColor: 'rgb(161, 0, 0)',
            borderWidth: 2
          },{
            label: 'Barranquilla',
            data: [this.contBarranquilla],
            backgroundColor: 'rgb(3, 201, 27)',
            hoverBackgroundColor: 'rgb(46, 205, 66)',
            borderColor: 'rgb(0, 125, 15)',
            hoverBorderColor: 'rgb(0, 125, 15)',
            borderWidth: 2
          },{
            label: 'Bogota',
            data: [this.contBogota],
            backgroundColor: 'rgb(255, 78, 3)',
            hoverBackgroundColor: 'rgb(255, 117, 58)',
            borderColor: 'rgb(205, 61, 0)',
            hoverBorderColor: 'rgb(205, 61, 0)',
            borderWidth: 2
          },{
            label: 'Buenaventura',
            data: [this.contBuenaventura],
            backgroundColor: 'rgb(2, 178, 107)',
            hoverBackgroundColor: 'rgb(42, 184, 127)',
            borderColor: 'rgb(0, 140, 83)',
            hoverBorderColor: 'rgb(0, 140, 83)',
            borderWidth: 2
          },{
            label: 'Cali',
            data: [this.contCali],
            backgroundColor: 'rgb(255, 120, 3)',
            hoverBackgroundColor: 'rgb(255, 149, 58)',
            borderColor: 'rgb(205, 95, 0)',
            hoverBorderColor: 'rgb(205, 95, 0)',
            borderWidth: 2
          },{
            label: 'Cartagena',
            data: [this.contCartagena],
            backgroundColor: 'rgb(3, 153, 160)',
            hoverBackgroundColor: 'rgb(39, 161, 167)',
            borderColor: 'rgb(1, 118, 127)',
            hoverBorderColor: 'rgb(1, 118, 127)',
            borderWidth: 2
          },{
            label: 'Medellin',
            data: [this.contMedellin],
            backgroundColor: 'rgb(255, 149, 3)',
            hoverBackgroundColor: 'rgb(255, 172, 58)',
            borderColor: 'rgb(205, 119, 0)',
            hoverBorderColor: 'rgb(161, 93, 0)',
            borderWidth: 2
          },{
            label: 'Mompox',
            data: [this.contMompox],
            backgroundColor: 'rgb(14, 99, 170)',
            hoverBackgroundColor: 'rgb(49, 118, 176)',
            borderColor: 'rgb(8, 76, 132)',
            hoverBorderColor: 'rgb(8, 76, 132)',
            borderWidth: 2
          },{
            label: 'Riohacha',
            data: [this.contRiohacha],
            backgroundColor: 'rgb(255, 211, 3)',
            hoverBackgroundColor: 'rgb(255, 220, 58)',
            borderColor: 'rgb(205, 169, 0)',
            hoverBorderColor: 'rgb(205, 169, 0)',
            borderWidth: 2
          },{
            label: 'Santa Marta',
            data: [this.contSantaMarta],
            backgroundColor: 'rgb(58, 23, 180)',
            hoverBackgroundColor: 'rgb(87, 59, 106)',
            borderColor: 'rgb(43, 15, 141)',
            hoverBorderColor: 'rgb(43, 15, 141)',
            borderWidth: 2
          },{
            label: 'Tumaco',
            data: [this.contTumaco],
            backgroundColor: 'rgb(205, 247, 3)',
            hoverBackgroundColor: 'rgb(215, 247, 56)',
            borderColor: 'rgb(164, 198, 0)',
            hoverBorderColor: 'rgb(164, 198, 0)',
            borderWidth: 2
          },{
            label: 'Turbo',
            data: [this.contTurbo],
            backgroundColor: 'rgb(171, 2, 171)',
            hoverBackgroundColor: 'rgb(177, 40, 177)',
            borderColor: 'rgb(133, 0, 133)',
            hoverBorderColor: 'rgb(133, 0, 133)',
            borderWidth: 2
          }
        ]
        },
        options: {
          responsive: true
        }

      });
      //Fin diseño gráfica del estado
      //------------------------------------------------------

    });

    this.loading = false
  }

  disableLoading(){

  }

}
