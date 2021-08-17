import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';

moment.locale('es');

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.css'],
})
export class HorasComponent implements OnInit {
  //forms
  horasForm: FormGroup;
  descriForm: FormGroup;
  //entradas y salidas
  luI: Time;
  luO: Time;
  maI: Time;
  maO: Time;
  miI: Time;
  miO: Time;
  juI: Time;
  juO: Time;
  viI: Time;
  viO: Time;
  saI: Time;
  saO: Time;
  doI: Time;
  doO: Time;
  //duracion de jornada
  hrsJornadaDiurna = 8;
  hrsJornadaNocturna = 6;
  hrsJornadaMixta = 7;
  //horarios de las jornadas
  diurnaI = moment(5, 'HH:mm a');
  diurnaO = moment(19, 'HH:mm a');
  nocturnaI = moment(19, 'HH:mm a');
  nocturnaO = moment(5, 'HH:mm a');
  mixtaIa = moment(13, 'HH:mm a');
  mixtaIb = moment(14, 'HH:mm a');
  mixtaIc = moment(15, 'HH:mm a');
  mixtaOa = moment(20, 'HH:mm a');
  mixtaOb = moment(21, 'HH:mm a');
  mixtaOc = moment(22, 'HH:mm a');
  reset = moment(24, 'HH:mm a');
  //modal
  isVisible = false;
  //horas trabajadas x dia de la semana
  hours;
  hoursLunes;
  hoursMartes;
  hoursMiercoles;
  hoursJueves;
  hoursViernes;
  hoursSabado;
  hoursDomingo;
  //horas trabajadas
  totalTrabNormales;
  totalTrabDiurnas;
  totalTrabNocturnas;
  totalTrabMixtas;
  totalExtrasDiurnas:number=0;
  totalExtrasNocturas:number=0;
  totalExtrasMixtras:number=0;
  //precio por jornada
  precioNormales;
  precioDiurnas;
  precioNocturnas;
  precioMixtas;

  constructor(private fb: FormBuilder, private modal: NzModalService) {
    this.horasForm = this.fb.group({
      luIControl: ['', Validators.required],
      luOControl: ['', Validators.required],
      maIControl: ['', Validators.required],
      maOControl: ['', Validators.required],
      miIControl: ['', Validators.required],
      miOControl: ['', Validators.required],
      juIControl: ['', Validators.required],
      juOControl: ['', Validators.required],
      viIControl: ['', Validators.required],
      viOControl: ['', Validators.required],
      saIControl: ['', Validators.required],
      saOControl: ['', Validators.required],
      doIControl: ['', Validators.required],
      doOControl: ['', Validators.required],
    });
    this.descriForm = this.fb.group({
      lunesSelect: ['', Validators.required],
      martesSelect: ['', Validators.required],
      miercolesSelect: ['', Validators.required],
      juevesSelect: ['', Validators.required],
      viernesSelect: ['', Validators.required],
      sabadoSelect: ['', Validators.required],
      domingoSelect: ['', Validators.required],
    });
  }
  ngOnInit(): void {}
  limpiar() {
    this.horasForm.reset();
    this.descriForm.get('lunesSelect').setValue('');
    this.descriForm.get('martesSelect').setValue('');
    this.descriForm.get('miercolesSelect').setValue('');
    this.descriForm.get('juevesSelect').setValue('');
    this.descriForm.get('viernesSelect').setValue('');
    this.descriForm.get('sabadoSelect').setValue('');
    this.descriForm.get('domingoSelect').setValue('');
  }
  cancelar() {
    this.limpiar();
  }
  horasSemana(entrada: moment.Moment, salida: moment.Moment) {
    if (entrada > salida) {
      var diferencia = moment.duration(salida.diff(entrada)).add(24, 'hours');
      this.hours = diferencia.asHours();
    } else {
      diferencia = moment.duration(salida.diff(entrada));
      this.hours = diferencia.asHours();
    }
  }
  calcular() {
    var lunesDesde = moment(this.luI, 'HH:mm a');
    var lunesHasta = moment(this.luO, 'HH:mm a');
    var martesDesde = moment(this.maI, 'HH:mm a');
    var martesHasta = moment(this.maO, 'HH:mm a');
    var miercolesDesde = moment(this.miI, 'HH:mm a');
    var miercolesHasta = moment(this.miO, 'HH:mm a');
    var juevesDesde = moment(this.juI, 'HH:mm a');
    var juevesHasta = moment(this.juO, 'HH:mm a');
    var viernesDesde = moment(this.viI, 'HH:mm a');
    var viernesHasta = moment(this.viO, 'HH:mm a');
    var sabadoDesde = moment(this.saI, 'HH:mm a');
    var sabadoHasta = moment(this.saO, 'HH:mm a');
    var domingoDesde = moment(this.doI, 'HH:mm a');
    var domingoHasta = moment(this.doO, 'HH:mm a');

    this.horasSemana(lunesDesde, lunesHasta);
    this.hoursLunes = this.hours;
    console.log('Lunes: ' + this.hoursLunes);
    this.horas(lunesDesde, lunesHasta, this.hoursLunes);

    this.horasSemana(martesDesde, martesHasta);
    this.hoursMartes = this.hours;
    console.log('Martes: ' + this.hoursMartes);
    this.horas(martesDesde, martesHasta, this.hoursMartes);

    this.horasSemana(miercolesDesde, miercolesHasta);
    this.hoursMiercoles = this.hours;
    console.log('Miercoles: ' + this.hoursMiercoles);
    this.horas(miercolesDesde, miercolesHasta, this.hoursMiercoles);

    this.horasSemana(juevesDesde, juevesHasta);
    this.hoursJueves = this.hours;
    console.log('Jueves: ' + this.hoursJueves);
    this.horas(juevesDesde, juevesHasta, this.hoursJueves);

    this.horasSemana(viernesDesde, viernesHasta);
    this.hoursViernes = this.hours;
    console.log('Viernes: ' + this.hoursViernes);
    this.horas(viernesDesde, viernesHasta, this.hoursViernes);

    this.horasSemana(sabadoDesde, sabadoHasta);
    this.hoursSabado = this.hours;
    console.log('Sabado: ' + this.hoursSabado);
    this.horas(sabadoDesde, sabadoHasta, this.hoursSabado);

    this.horasSemana(domingoDesde, domingoHasta);
    this.hoursDomingo = this.hours;
    console.log('Domingo: ' + this.hoursDomingo);
    this.horas(domingoDesde, domingoHasta, this.hoursDomingo);
  }
  horas(entrada: moment.Moment, salida: moment.Moment, horas: number) {
    var a:number=0, b:number=0, exd:number=0, exn:number=0, exm:number=0, sum:number=0, faltante:number=0, 
    hoursdif:number=0, jornada:number=0, hoursDiurna:number=0, hoursNocturna:number=0, completar:number=0;
    
    if (entrada.isValid() && salida.isValid()) {
      if (entrada.isSame(salida)) {
        console.log('horas validas pero son iguales');
      } else {
        console.log('true');
        //ciclo jornada diurna con extras diurnas
        if (entrada >= this.diurnaI && entrada < this.diurnaO && salida <= this.diurnaO && salida > this.diurnaI && salida > entrada ) {
          if (horas >= this.hrsJornadaDiurna) {
            exd = horas - this.hrsJornadaDiurna;
            console.log('jornada diurna ' + ' extras diurnas ' + exd);
          } else if (horas < this.hrsJornadaDiurna) {
            console.log('jornada diurna no completo ' + horas);
          }
          //ciclo jornada diurna con extras nocturnas y diurnas
        } else if (entrada >= this.diurnaI && entrada <= this.diurnaO && (salida > this.nocturnaI || salida <= this.diurnaO) && salida < entrada) {
          a = moment.duration(this.diurnaO.diff(entrada)).asHours();
          b = moment.duration(salida.diff(this.diurnaI)).asHours();
          if (b > 0) {
            sum = a + b;
            if (sum >= this.hrsJornadaDiurna) {
              exd = sum - this.hrsJornadaDiurna;
              exn = horas - sum;
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn);
            } else {
              exn = horas - sum - this.hrsJornadaNocturna;
              console.log('jornada nocturna ' + horas + ' extras diurnas ' + sum + ' extras nocturnas ' + exn);
            }
          } else {
            if (a >= this.hrsJornadaDiurna) {
              exd = a - this.hrsJornadaDiurna;
              exn = horas - a;
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn);
            } else {
              //arreglar 1pm-2am
              faltante = horas - a; 
              if (faltante >= this.hrsJornadaNocturna) {
                exn = horas - a - this.hrsJornadaNocturna;
                console.log('jornada nocturna ' + horas + ' extras diurnas ' + a + ' extras nocturnas ' + exn);
              } else if (faltante < this.hrsJornadaNocturna) {
                exd = horas - this.hrsJornadaNocturna;
                console.log('jornada nocturna ' + horas + ' extras diurnas ' + exd);
              }
            }
          }//arreglar ciclo 6pm-11pm
         } else if (entrada >= this.diurnaI && entrada <= this.diurnaO && salida > this.nocturnaI && salida <= this.reset) {
          a = moment.duration(this.diurnaO.diff(entrada)).asHours();
          b = moment.duration(salida.diff(this.diurnaO)).asHours();
          if (a >= this.hrsJornadaDiurna) {
            if (salida > this.nocturnaI && salida <= this.mixtaOc) {
              exd = a - this.hrsJornadaDiurna;
              exm = moment.duration(salida.diff(this.diurnaO)).asHours();
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras mixtas ' + exm);
            } else if (salida > this.mixtaOc && salida <= this.reset) {
              exd = a - this.hrsJornadaDiurna;
              exn = moment.duration(salida.diff(this.nocturnaI)).asHours();
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn);
            }
          } else if (a < this.hrsJornadaDiurna) {
            if (salida > this.nocturnaI && salida <= this.mixtaOc) {
              exm = horas - this.hrsJornadaDiurna;
              console.log('jornada diurna ' + horas + ' extras mixtas ' + exm);
            } else if (salida > this.mixtaOc && salida <= this.reset) {
              exn = horas - this.hrsJornadaNocturna;
              console.log('jornada nocturna ' + horas + ' extras nocturnas ' + exn);
            }
          }
        } else if ((entrada >= this.nocturnaI || entrada < this.nocturnaO) && (salida <= this.diurnaI || salida >= this.diurnaO)) {
          if (horas > 10) {
            if (salida >= this.diurnaO && salida <= this.mixtaOc) {
              exd = 6;
              exn = moment.duration(this.diurnaI.diff(entrada)).asHours();
              exm = moment.duration(salida.diff(this.diurnaO)).asHours();
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn + ' extras mixtas ' + exm);
            } else if (salida > this.mixtaOc && salida < this.reset) {
              exd = 6;
              a = moment.duration(this.diurnaI.diff(entrada)).asHours();
              b = moment.duration(salida.diff(this.nocturnaI)).asHours();
              exn = a + b;
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn);
            }
          } else if (horas >= this.hrsJornadaNocturna && horas < 10) {
            exn = horas - this.hrsJornadaNocturna;
            console.log('jornada nocturna ' + ' extras nocturnas ' + exn);
          } else {
            console.log('jornada nocturna no completo ' + horas);
          }
        } else if (entrada >= this.mixtaIa && entrada <= this.mixtaIc && (salida <= this.diurnaI || salida >= this.diurnaO)) {
          if (salida > this.mixtaOc || salida <= this.diurnaI) {
            jornada = moment.duration(this.mixtaOc.diff(entrada)).asHours();
            exm = jornada - this.hrsJornadaMixta;
            hoursdif = moment.duration(salida.diff(this.mixtaOc)).asHours();
            if (hoursdif < 0) {
              hoursdif = hoursdif + 24;
              console.log('jornada mixta ' + ' extras mixtas ' + exm + ' extra nocturna ' + hoursdif);
            } else {
              console.log('jornada mixta ' + ' extras mixtas ' + exm + ' extra nocturna ' + hoursdif);
            }
          } else if (salida > this.diurnaO && salida <= this.mixtaOc) {
            if (horas >= this.hrsJornadaMixta) {
              exm = horas - this.hrsJornadaMixta;
              console.log('jornada mixta ' + 'extras mixtas ' + exm);
            } else {
              console.log('jornada diurna no completo ' + horas);
            }
          }
        } else if (entrada >= this.nocturnaI || (entrada <= this.diurnaI && salida <= this.nocturnaI)) {
          hoursDiurna = moment.duration(salida.diff(this.diurnaI)).asHours();
          hoursNocturna = horas - hoursDiurna;
          if (hoursDiurna > hoursNocturna) {
            if (horas < this.hrsJornadaDiurna) {
              console.log('jornada diurna no completo ' + horas);
            } else if (horas >= this.hrsJornadaDiurna) {
              if (hoursDiurna > this.hrsJornadaDiurna) {
                exd = hoursDiurna - this.hrsJornadaDiurna;
                console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extra nocturna ' + hoursNocturna);
              } else if (hoursDiurna < this.hrsJornadaDiurna) {
                completar = this.hrsJornadaDiurna - hoursDiurna;
                exn = hoursNocturna - completar;
                console.log('jornada diurna ' + horas + ' extra nocturna ' + exn);
              } else if (hoursDiurna == this.hrsJornadaDiurna) {
                console.log('jornada diurna ' + horas + ' extra nocturna ' + hoursNocturna);
              }
            }
          } else {
            console.log(hoursDiurna, hoursNocturna);
            if (horas < this.hrsJornadaNocturna) {
              console.log('jornada nocturna no completo ' + horas);
            } else if (horas >= this.hrsJornadaNocturna) {
              if (hoursNocturna > this.hrsJornadaNocturna) {
                exn = hoursNocturna - this.hrsJornadaNocturna;
                console.log('jornada nocturna ' + horas + ' extras nocturna ' + exn + ' extra diurna ' + hoursDiurna);
              } else if (hoursNocturna < this.hrsJornadaNocturna) {
                completar = this.hrsJornadaNocturna - hoursNocturna;
                exd = hoursDiurna - completar;
                console.log('jornada nocturna ' + horas + ' extra diurnas ' + exd);
              } else if (hoursNocturna == this.hrsJornadaNocturna) {
                console.log('jornada nocturna ' + horas + ' extra diurna ' + hoursDiurna);
              }
            }
          }
        }
      }
    } else {
      console.log('horas invalidas');
    }
    if(exd<0){
      exd=0
    }
    if(exm<0){
      exm=0
    }
    if(exn<0){
      exn=0
    }
    this.totalExtrasDiurnas=this.totalExtrasDiurnas+exd;
    this.totalExtrasNocturas=this.totalExtrasNocturas+exn;
    this.totalExtrasMixtras=this.totalExtrasMixtras+exm;
    console.log("extra diurnas ",this.totalExtrasDiurnas, "extra nocturnas ",this.totalExtrasNocturas, "extra mixtas ",this.totalExtrasMixtras)
  }
  showModal(): void {
    this.modal.confirm({
      nzTitle: 'CONFIRMACIÓN',
      nzContent:
        '<b style="color: red;">¿Esta seguro de haber ingresado las horas correctas?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.calcular(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  horasLuI(value: Time): void {
    this.luI = value;
    console.log(value);
  }
  horasLuO(value: Time): void {
    this.luO = value;
    console.log(value);
  }
  horasMaI(value: Time): void {
    this.maI = value;
    console.log(value);
  }
  horasMaO(value: Time): void {
    this.maO = value;
    console.log(value);
  }
  horasMiI(value: Time): void {
    this.miI = value;
    console.log(value);
  }
  horasMiO(value: Time): void {
    this.miO = value;
    console.log(value);
  }
  horasJuI(value: Time): void {
    this.juI = value;
    console.log(value);
  }
  horasJuO(value: Time): void {
    this.juO = value;
    console.log(value);
  }
  horasViI(value: Time): void {
    this.viI = value;
    console.log(value);
  }
  horasViO(value: Time): void {
    this.viO = value;
    console.log(value);
  }
  horasSaI(value: Time): void {
    this.saI = value;
    console.log(value);
  }
  horasSaO(value: Time): void {
    this.saO = value;
    console.log(value);
  }
  horasDoI(value: Time): void {
    this.doI = value;
    console.log(value);
  }
  horasDoO(value: Time): void {
    this.doO = value;
    console.log(value);
  }
  onChangeLunes(value) {
    console.log(value);
    if (this.descriForm.get('lunesSelect').value == value && value != '') {
      this.horasForm.get('luIControl').disable();
      this.horasForm.get('luOControl').disable();
      this.horasForm.get('luIControl').setValue(0);
      this.horasForm.get('luOControl').setValue(0);
      console.log(this.luI, this.luO);
    } else {
      this.horasForm.get('luIControl').enable();
      this.horasForm.get('luOControl').enable();
    }
  }
  onChangeMartes(value) {
    console.log(value);
    if (this.descriForm.get('martesSelect').value == value && value != '') {
      this.horasForm.get('maIControl').disable();
      this.horasForm.get('maOControl').disable();
      this.horasForm.get('maIControl').setValue(0);
      this.horasForm.get('maOControl').setValue(0);
      console.log(this.maI, this.maO);
    } else {
      this.horasForm.get('maIControl').enable();
      this.horasForm.get('maOControl').enable();
    }
  }
  onChangeMiercoles(value) {
    console.log(value);
    if (this.descriForm.get('miercolesSelect').value == value && value != '') {
      this.horasForm.get('miIControl').disable();
      this.horasForm.get('miOControl').disable();
      this.horasForm.get('miIControl').setValue(0);
      this.horasForm.get('miOControl').setValue(0);
      console.log(this.miI, this.miO);
    } else {
      this.horasForm.get('miIControl').enable();
      this.horasForm.get('miOControl').enable();
    }
  }
  onChangeJueves(value) {
    console.log(value);
    if (this.descriForm.get('juevesSelect').value == value && value != '') {
      this.horasForm.get('juIControl').disable();
      this.horasForm.get('juOControl').disable();
      this.horasForm.get('juIControl').setValue(0);
      this.horasForm.get('juOControl').setValue(0);
      console.log(this.juI, this.juO);
    } else {
      this.horasForm.get('juIControl').enable();
      this.horasForm.get('juOControl').enable();
    }
  }
  onChangeViernes(value) {
    console.log(value);
    if (this.descriForm.get('viernesSelect').value == value && value != '') {
      this.horasForm.get('viIControl').disable();
      this.horasForm.get('viOControl').disable();
      this.horasForm.get('viIControl').setValue(0);
      this.horasForm.get('viOControl').setValue(0);
      console.log(this.viI, this.viO);
    } else {
      this.horasForm.get('viIControl').enable();
      this.horasForm.get('viOControl').enable();
    }
  }
  onChangeSabado(value) {
    console.log(value);
    if (this.descriForm.get('sabadoSelect').value == value && value != '') {
      this.horasForm.get('saIControl').disable();
      this.horasForm.get('saOControl').disable();
      this.horasForm.get('saIControl').setValue(0);
      this.horasForm.get('saOControl').setValue(0);
      console.log(this.saI, this.saO);
    } else {
      this.horasForm.get('saIControl').enable();
      this.horasForm.get('saOControl').enable();
    }
  }
  onChangeDomingo(value) {
    console.log(value);
    if (this.descriForm.get('domingoSelect').value == value && value != '') {
      this.horasForm.get('doIControl').disable();
      this.horasForm.get('doOControl').disable();
      this.horasForm.get('doIControl').setValue(0);
      this.horasForm.get('doOControl').setValue(0);
      console.log(this.doI, this.doO);
    } else {
      this.horasForm.get('doIControl').enable();
      this.horasForm.get('doOControl').enable();
    }
  }
}
