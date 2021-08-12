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
  horasForm: FormGroup;
  descriForm: FormGroup;
  lunesDesde: moment.Moment;
  lunesHasta: moment.Moment;
  martesDesde: moment.Moment;
  martesHasta: moment.Moment;
  miercolesDesde: moment.Moment;
  miercolesHasta: moment.Moment;
  juevesDesde: moment.Moment;
  juevesHasta: moment.Moment;
  viernesDesde: moment.Moment;
  viernesHasta: moment.Moment;
  sabadoDesde: moment.Moment;
  sabadoHasta: moment.Moment;
  domingoDesde: moment.Moment;
  domingoHasta: moment.Moment;
  hrsJornadaDiurna = 8;
  hrsJornadaNocturna = 6;
  hrsJornadaMixta = 7;
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
  isVisible = false;
  hours;
  trabajadasNormales;
  trabajadasDiurnas;
  trabajadasNocturnas;
  trabajadasMixtas;
  ExtrasDiurnas;
  ExtrasNocturas;
  ExtrasMixtras;
  valorNormales;
  valorDiurnas;
  valorNocturnas;
  valorMixtas;

  constructor(private fb: FormBuilder,private modal: NzModalService) {
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
  horasSemana (entrada:moment.Moment, salida:moment.Moment) {
    if (entrada > salida) {
      var diferencia = moment
        .duration(salida.diff(entrada))
        .add(24, 'hours');
      this.hours = diferencia.asHours();
    } else {
      diferencia = moment.duration(salida.diff(entrada));
      this.hours = diferencia.asHours();
    }
  }
  calcular() {
    this.horasSemana(this.lunesDesde,this.lunesHasta)
    console.log('Lunes: ' + this.hours);
    this.horas(this.lunesDesde, this.lunesHasta, this.hours);

    this.horasSemana(this.martesDesde,this.martesHasta)
    console.log('Martes: ' + this.hours);
    this.horas(this.martesDesde, this.martesHasta, this.hours);

    this.horasSemana(this.miercolesDesde,this.miercolesHasta)
    console.log('Miercoles: ' + this.hours);
    this.horas(this.miercolesDesde, this.miercolesHasta, this.hours);

    this.horasSemana(this.juevesDesde,this.juevesHasta)
    console.log('Jueves: ' + this.hours);
    this.horas(this.juevesDesde, this.juevesHasta, this.hours);

    this.horasSemana(this.viernesDesde,this.viernesHasta)
    console.log('Viernes: ' + this.hours);
    this.horas(this.viernesDesde, this.viernesHasta, this.hours);

    this.horasSemana(this.sabadoDesde,this.sabadoHasta)
    console.log('Sabado: ' + this.hours);
    this.horas(this.sabadoDesde, this.sabadoHasta, this.hours);

    this.horasSemana(this.domingoDesde,this.domingoHasta)
    console.log('Domingo: ' + this.hours);
    this.horas(this.domingoDesde, this.domingoHasta, this.hours);
  }
  horas(entrada: moment.Moment, salida: moment.Moment, horas: number) {
    if (entrada.isValid() && salida.isValid()) {
      if (entrada.isSame(salida)) {
        console.log('horas validas pero son iguales');
      } else {
        console.log('true');
        if (entrada >= this.diurnaI && salida <= this.diurnaO && salida > this.diurnaI && salida > entrada) {
          if (horas >= this.hrsJornadaDiurna) {
            var extras = horas - this.hrsJornadaDiurna;
            console.log('jornada diurna ' + 'extras diurnas ' + extras);
          } else if (horas < this.hrsJornadaDiurna) {
            console.log('jornada diurna no completo ' + horas);
          }
        } else if (entrada >= this.diurnaI && entrada <= this.diurnaO && (salida > this.nocturnaI || salida <= this.diurnaO) && salida < entrada) {
          var a = moment.duration(this.diurnaO.diff(entrada)).asHours();
          var b = moment.duration(salida.diff(this.diurnaI)).asHours();
          if (b > 0) {
            var sum = a + b;
            if (sum >= this.hrsJornadaDiurna) {
              var exd = sum - this.hrsJornadaDiurna;
              var exn = horas - sum;
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn);
            } else {
              var exn = horas - sum - this.hrsJornadaNocturna;
              console.log('jornada nocturna ' + horas + ' extras diurnas ' + sum + ' extras nocturnas ' + exn );
            }
          } else {
            if (a >= this.hrsJornadaDiurna) {
              var exd = a - this.hrsJornadaDiurna;
              var exn = horas - a;
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn);
            } else {
              var faltante = horas - a;
              if (faltante >= this.hrsJornadaNocturna) {
                var exn = horas - a - this.hrsJornadaNocturna;
                console.log('jornada nocturna ' + horas + ' extras diurnas ' + a + ' extras nocturnas ' + exn);
              } else if (faltante < this.hrsJornadaNocturna) {
                var exd = horas - this.hrsJornadaNocturna;
                console.log('jornada nocturna ' + horas + ' extras diurnas ' + exd);
              }
            }
          }
        } else if (entrada >= this.diurnaI && entrada <= this.diurnaO && salida > this.nocturnaI && salida <= this.reset) {
          var a = moment.duration(this.diurnaO.diff(entrada)).asHours();
          var b = moment.duration(salida.diff(this.diurnaO)).asHours();
          if (a >= this.hrsJornadaDiurna) {
            if (salida > this.nocturnaI && salida <= this.mixtaOc) {
              var exd = a - this.hrsJornadaDiurna;
              var exm = moment.duration(salida.diff(this.diurnaO)).asHours();
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras mixtas ' + exm);
            } else if (salida > this.mixtaOc && salida <= this.reset) {
              var exd = a - this.hrsJornadaDiurna;
              var exn = moment.duration(salida.diff(this.nocturnaI)).asHours();
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn);
            }
          } else if (a < this.hrsJornadaDiurna) {
            if (salida > this.nocturnaI && salida <= this.mixtaOc) {
              var exm = horas - this.hrsJornadaDiurna;
              console.log('jornada diurna ' + horas + ' extras mixtas ' + exm);
            } else if (salida > this.mixtaOc && salida <= this.reset) {
              var exn = horas - this.hrsJornadaDiurna;
              console.log('jornada diurna ' + horas + ' extras nocturnas ' + exn);
            }
          }
        } else if (
          (entrada >= this.nocturnaI || entrada < this.nocturnaO) &&
          (salida <= this.diurnaI || salida >= this.diurnaO)
        ) {
          if (horas > 10) {
            if (salida >= this.diurnaO && salida <= this.mixtaOc) {
              const exd = 6;
              var exn = moment.duration(this.diurnaI.diff(entrada)).asHours();
              var exm = moment.duration(salida.diff(this.diurnaO)).asHours();
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn + ' extras mixtas ' + exm);
            } else if (salida > this.mixtaOc && salida < this.reset) {
              const exd = 6;
              var a = moment.duration(this.diurnaI.diff(entrada)).asHours();
              var b = moment.duration(salida.diff(this.nocturnaI)).asHours();
              var exn = a + b;
              console.log('jornada diurna ' + horas + ' extras diurnas ' + exd + ' extras nocturnas ' + exn);
            }
          } else if (horas >= this.hrsJornadaNocturna && horas < 10) {
            var extras = horas - this.hrsJornadaNocturna;
            console.log('jornada nocturna ' + 'extras nocturnas ' + extras);
          } else {
            console.log('jornada nocturna no completo ' + horas);
          }
        } else if (entrada >= this.mixtaIa && entrada <= this.mixtaIc && (salida <= this.diurnaI || salida >= this.diurnaO)) {
          if (salida > this.mixtaOc || salida <= this.diurnaI) {
            var jornada = moment.duration(this.mixtaOc.diff(entrada)).asHours();
            var extras = jornada - this.hrsJornadaMixta;
            var hoursdif = moment.duration(salida.diff(this.mixtaOc)).asHours();
            if (hoursdif < 0) {
              hoursdif = hoursdif + 24;
              console.log('jornada mixta ' + 'extras mixtas ' + extras + ' extra nocturna ' + hoursdif);
            } else {
              console.log('jornada mixta ' + 'extras mixtas ' + extras + ' extra nocturna ' + hoursdif);
            }
          } else if (salida > this.diurnaO && salida <= this.mixtaOc) {
            if (horas >= this.hrsJornadaMixta) {
              var exm = horas - this.hrsJornadaMixta;
              console.log('jornada mixta ' + 'extras mixtas ' + exm);
            } else {
              console.log('jornada diurna no completo ' + horas);
            }
          }
        } else if (entrada >= this.nocturnaI || (entrada <= this.diurnaI && salida <= this.nocturnaI)) {
          var hoursDiurna = moment.duration(salida.diff(this.diurnaI)).asHours();
          var hoursNocturna = horas - hoursDiurna;
          if (hoursDiurna > hoursNocturna) {
            if (horas < this.hrsJornadaDiurna) {
              console.log('jornada diurna no completo ' + horas);
            } else if (horas >= this.hrsJornadaDiurna) {
              if (hoursDiurna > this.hrsJornadaDiurna) {
                var extra = hoursDiurna - this.hrsJornadaDiurna;
                console.log('jornada diurna ' + horas + ' extras diurnas ' + extra + ' extra nocturna ' + hoursNocturna);
              } else if (hoursDiurna < this.hrsJornadaDiurna) {
                var completar = this.hrsJornadaDiurna - hoursDiurna;
                var xnocturna = hoursNocturna - completar;
                console.log('jornada diurna ' + horas + ' extra nocturna ' + xnocturna);
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
                var extra = hoursNocturna - this.hrsJornadaNocturna;
                console.log('jornada nocturna ' + horas + ' extras nocturna ' + extra + ' extra diurna ' + hoursDiurna);
              } else if (hoursNocturna < this.hrsJornadaNocturna) {
                var completar = this.hrsJornadaNocturna - hoursNocturna;
                var xdiurna = hoursDiurna - completar;
                console.log('jornada nocturna ' + horas + ' extra diurnas ' + xdiurna);
              } else if (hoursNocturna == this.hrsJornadaNocturna) {
                console.log(
                  'jornada nocturna ' + horas + ' extra diurna ' + hoursDiurna
                );
              }
            }
          }
        }
      }
    } else {
      console.log('horas invalidas');
    }
  }
  showModal(): void {
    this.modal.confirm({
      nzTitle: 'CONFIRMACIÓN',
      nzContent: '<b style="color: red;">¿Esta seguro de haber ingresado las horas correctas?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.calcular(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
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
  horasLuI(value: moment.Moment): void {
    this.lunesDesde = value;
    console.log(value);
  }
  horasLuO(value: moment.Moment): void {
    this.lunesHasta = value;
    console.log(value);
  }
  horasMaI(value: moment.Moment): void {
    this.martesDesde = value;
    console.log(value);
  }
  horasMaO(value: moment.Moment): void {
    this.martesHasta = value;
    console.log(value);
  }
  horasMiI(value: moment.Moment): void {
    this.miercolesDesde = value;
    console.log(value);
  }
  horasMiO(value: moment.Moment): void {
    this.miercolesHasta = value;
    console.log(value);
  }
  horasJuI(value: moment.Moment): void {
    this.juevesDesde = value;
    console.log(value);
  }
  horasJuO(value: moment.Moment): void {
    this.juevesHasta = value;
    console.log(value);
  }
  horasViI(value: moment.Moment): void {
    this.viernesDesde = value;
    console.log(value);
  }
  horasViO(value: moment.Moment): void {
    this.viernesHasta = value;
    console.log(value);
  }
  horasSaI(value: moment.Moment): void {
    this.sabadoDesde = value;
    console.log(value);
  }
  horasSaO(value: moment.Moment): void {
    this.sabadoHasta = value;
    console.log(value);
  }
  horasDoI(value: moment.Moment): void {
    this.domingoDesde = value;
    console.log(value);
  }
  horasDoO(value: moment.Moment): void {
    this.domingoHasta = value;
    console.log(value);
  }
  onChangeLunes(value) {
    console.log(value);
    if (this.descriForm.get('lunesSelect').value == value && value != '') {
      this.horasForm.get('luIControl').disable();
      this.horasForm.get('luOControl').disable();
      this.horasForm.get('luIControl').setValue(0);
      this.horasForm.get('luOControl').setValue(0);
      console.log(this.lunesDesde, this.lunesHasta);
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
      console.log(this.martesDesde, this.martesHasta);
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
      console.log(this.miercolesDesde, this.miercolesHasta);
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
      console.log(this.juevesDesde, this.juevesHasta);
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
      console.log(this.viernesDesde, this.viernesHasta);
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
      console.log(this.sabadoDesde, this.sabadoHasta);
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
      console.log(this.domingoDesde, this.domingoHasta);
    } else {
      this.horasForm.get('doIControl').enable();
      this.horasForm.get('doOControl').enable();
    }
  }
}
