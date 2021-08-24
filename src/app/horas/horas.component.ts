import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
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
  extraForm: FormGroup;
  resumenForm: FormGroup;
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
  nocturnaIa = moment(18, 'HH:mm a');
  nocturnaI = moment(19, 'HH:mm a');
  nocturnaO = moment(5, 'HH:mm a');
  mixtaIa = moment(13, 'HH:mm a');
  mixtaIb = moment(14, 'HH:mm a');
  mixtaIc = moment(15, 'HH:mm a');
  mixtaOa = moment(20, 'HH:mm a');
  mixtaOb = moment(21, 'HH:mm a');
  mixtaOc = moment(22, 'HH:mm a');
  reset = moment(24, 'HH:mm a');
  //visibilidad de modals
  isVisible = false;
  isVisibleInvalidas = false;
  isVisibleValidasIguales = false;
  isVisibleLibres = false;
  //horas trabajadas x dia de la semana
  hours;
  hoursLunes;
  hoursMartes;
  hoursMiercoles;
  hoursJueves;
  hoursViernes;
  hoursSabado;
  hoursDomingo;
  //total horas trabajadas x semana
  totalTrabNormales: number = 0;
  totalTrabDiurnas: number = 0;
  totalTrabNocturnas: number = 0;
  totalTrabMixtas: number = 0;
  totalExtrasDiurnas: number = 0;
  totalExtrasNocturas: number = 0;
  totalExtrasMixtas: number = 0;
  extrasSabados: number = 0;
  requiredCompletarDiurna: number = 0;
  requiredCompletarMixta: number = 0;
  requiredCompletarNocturna: number = 0;
  //precio por jornada
  precioNormales;
  precioDiurnas;
  precioNocturnas;
  precioMixtas;
  //count de observacion
  feriado: number = 0;
  incapacidadpub: number = 0;
  incapacidadpriv: number = 0;
  septimo: number = 0;
  vacacion: number = 0;
  falta: number = 0;
  abandono: number = 0;
  nombre = 'REGGIE LEE MURRAY BOOTH';

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
    this.extraForm = this.fb.group({
      incpub: [{ value: 0, disabled: true }, Validators.required],
    });
    this.resumenForm = this.fb.group({
      hn: [{ value: 0, disabled: true }, Validators.required],
      hed: [{ value: 0, disabled: true }, Validators.required],
      hem: [{ value: 0, disabled: true }, Validators.required],
      hen: [{ value: 0, disabled: true }, Validators.required],
      feriado: [{ value: 0, disabled: true }, Validators.required],
      incapacidad: [{ value: 0, disabled: true }, Validators.required],
      septimo: [{ value: 0, disabled: true }, Validators.required],
      vacacion: [{ value: 0, disabled: true }, Validators.required],
    });
  }
  ngOnInit(): void {}

  handleEmpleado(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.limpiar();
    this.isVisible = false;
  }
  limpiar() {
    this.horasForm.reset();
    this.descriForm.get('lunesSelect').setValue('');
    this.descriForm.get('martesSelect').setValue('');
    this.descriForm.get('miercolesSelect').setValue('');
    this.descriForm.get('juevesSelect').setValue('');
    this.descriForm.get('viernesSelect').setValue('');
    this.descriForm.get('sabadoSelect').setValue('');
    this.descriForm.get('domingoSelect').setValue('');
    this.extraForm.reset();
    this.extraForm.disable();
    this.resetObservacion();
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
  invalidas(): void {
    this.isVisibleInvalidas = true;
    this.modal.error({
      nzCentered: true,
      nzTitle: 'ERROR',
      nzContent:
        '<b style="color: red;">ADVERTENCIA: Horas inválidas. Reingrese.</b>',
      nzOkType: 'primary',
      nzOkDanger: true,
    });
  }
  validasIguales(): void {
    this.isVisibleValidasIguales = true;
    this.modal.error({
      nzCentered: true,
      nzTitle: 'ERROR',
      nzContent:
        '<b style="color: red;">ADVERTENCIA: Horas iguales. Reingrese.</b>',
      nzOkType: 'primary',
      nzOkDanger: true,
    });
  }
  libres(): void {
    this.isVisibleLibres = true;
    this.modal.warning({
      nzTitle: 'ATENCION',
      nzContent: 'Solo puede tener un septimo día a la semana.',
    });
  }
  revisarLunes(entrada: moment.Moment, salida: moment.Moment) {
    if (entrada.isValid() && salida.isValid()) {
      if (entrada.isSame(salida)) {
        if (this.isVisibleValidasIguales == false) {
          this.validasIguales();
        } else {
          this.isVisibleValidasIguales = false;
        }
        this.horasForm.get('luIControl').setValue('');
        this.horasForm.get('luOControl').setValue('');
      } else {
        this.horasSemana(entrada, salida);
        this.hoursLunes = this.hours;
        console.log('Lunes: ' + this.hoursLunes);
        var dia = 'Lunes';
        this.horas(entrada, salida, this.hoursLunes, dia);
      }
    } else if (this.descriForm.get('lunesSelect').value != '') {
      if (this.descriForm.get('lunesSelect').value == 'feriado') {
        this.feriado = this.feriado + 1;
      } else if (this.descriForm.get('lunesSelect').value == 'incapacidadpub') {
        this.incapacidadpub = this.incapacidadpub + 1;
      } else if (
        this.descriForm.get('lunesSelect').value == 'incapacidadpriv'
      ) {
        this.incapacidadpriv = this.incapacidadpriv + 1;
      } else if (this.descriForm.get('lunesSelect').value == 'septimo') {
        this.septimo = this.septimo + 1;
        if (this.isVisibleLibres == false) {
          if (this.septimo > 1) {
            this.libres();
          }
        }
      } else if (this.descriForm.get('lunesSelect').value == 'vacacion') {
        this.vacacion = this.vacacion + 1;
      } else if (this.descriForm.get('lunesSelect').value == 'falta') {
        this.falta = this.falta + 1;
      } else if (this.descriForm.get('lunesSelect').value == 'abandono') {
        this.abandono = this.abandono + 1;
      }
    } else {
      if (this.isVisibleInvalidas == false) {
        this.invalidas();
      }
      this.horasForm.get('luIControl').setValue('');
      this.horasForm.get('luOControl').setValue('');
    }
  }
  revisarMartes(entrada: moment.Moment, salida: moment.Moment) {
    if (entrada.isValid() && salida.isValid()) {
      if (entrada.isSame(salida)) {
        if (this.isVisibleValidasIguales == false) {
          this.validasIguales();
        } else {
          this.isVisibleValidasIguales = false;
        }
        this.horasForm.get('maIControl').setValue('');
        this.horasForm.get('maOControl').setValue('');
      } else {
        this.horasSemana(entrada, salida);
        this.hoursMartes = this.hours;
        console.log('Martes: ' + this.hoursMartes);
        var dia = 'Martes';
        this.horas(entrada, salida, this.hoursMartes, dia);
      }
    } else if (this.descriForm.get('martesSelect').value != '') {
      if (this.descriForm.get('martesSelect').value == 'feriado') {
        this.feriado = this.feriado + 1;
      } else if (
        this.descriForm.get('martesSelect').value == 'incapacidadpub'
      ) {
        this.incapacidadpub = this.incapacidadpub + 1;
      } else if (
        this.descriForm.get('martesSelect').value == 'incapacidadpriv'
      ) {
        this.incapacidadpriv = this.incapacidadpriv + 1;
      } else if (this.descriForm.get('martesSelect').value == 'septimo') {
        this.septimo = this.septimo + 1;
        if (this.isVisibleLibres == false) {
          if (this.septimo > 1) {
            this.libres();
          }
        }
      } else if (this.descriForm.get('martesSelect').value == 'vacacion') {
        this.vacacion = this.vacacion + 1;
      } else if (this.descriForm.get('martesSelect').value == 'falta') {
        this.falta = this.falta + 1;
      } else if (this.descriForm.get('martesSelect').value == 'abandono') {
        this.abandono = this.abandono + 1;
      }
    } else {
      if (this.isVisibleInvalidas == false) {
        this.invalidas();
      }
      this.horasForm.get('maIControl').setValue('');
      this.horasForm.get('maOControl').setValue('');
    }
  }
  revisarMiercoles(entrada: moment.Moment, salida: moment.Moment) {
    if (entrada.isValid() && salida.isValid()) {
      if (entrada.isSame(salida)) {
        if (this.isVisibleValidasIguales == false) {
          this.validasIguales();
        } else {
          this.isVisibleValidasIguales = false;
        }
        this.horasForm.get('miIControl').setValue('');
        this.horasForm.get('miOControl').setValue('');
      } else {
        this.horasSemana(entrada, salida);
        this.hoursMiercoles = this.hours;
        console.log('Miercoles: ' + this.hoursMiercoles);
        var dia = 'Miercoles';
        this.horas(entrada, salida, this.hoursMiercoles, dia);
      }
    } else if (this.descriForm.get('miercolesSelect').value != '') {
      if (this.descriForm.get('miercolesSelect').value == 'feriado') {
        this.feriado = this.feriado + 1;
      } else if (
        this.descriForm.get('miercolesSelect').value == 'incapacidadpub'
      ) {
        this.incapacidadpub = this.incapacidadpub + 1;
      } else if (
        this.descriForm.get('miercolesSelect').value == 'incapacidadpriv'
      ) {
        this.incapacidadpriv = this.incapacidadpriv + 1;
      } else if (this.descriForm.get('miercolesSelect').value == 'septimo') {
        this.septimo = this.septimo + 1;
        if (this.isVisibleLibres == false) {
          if (this.septimo > 1) {
            this.libres();
          }
        }
      } else if (this.descriForm.get('miercolesSelect').value == 'vacacion') {
        this.vacacion = this.vacacion + 1;
      } else if (this.descriForm.get('miercolesSelect').value == 'falta') {
        this.falta = this.falta + 1;
      } else if (this.descriForm.get('miercolesSelect').value == 'abandono') {
        this.abandono = this.abandono + 1;
      }
    } else {
      if (this.isVisibleInvalidas == false) {
        this.invalidas();
      }
      this.horasForm.get('miIControl').setValue('');
      this.horasForm.get('miOControl').setValue('');
    }
  }
  revisarJueves(entrada: moment.Moment, salida: moment.Moment) {
    if (entrada.isValid() && salida.isValid()) {
      if (entrada.isSame(salida)) {
        if (this.isVisibleValidasIguales == false) {
          this.validasIguales();
        } else {
          this.isVisibleValidasIguales = false;
        }
        this.horasForm.get('juIControl').setValue('');
        this.horasForm.get('juOControl').setValue('');
      } else {
        this.horasSemana(entrada, salida);
        this.hoursJueves = this.hours;
        console.log('Jueves: ' + this.hoursJueves);
        var dia = 'Jueves';
        this.horas(entrada, salida, this.hoursJueves, dia);
      }
    } else if (this.descriForm.get('juevesSelect').value != '') {
      if (this.descriForm.get('juevesSelect').value == 'feriado') {
        this.feriado = this.feriado + 1;
      } else if (
        this.descriForm.get('juevesSelect').value == 'incapacidadpub'
      ) {
        this.incapacidadpub = this.incapacidadpub + 1;
      } else if (
        this.descriForm.get('juevesSelect').value == 'incapacidadpriv'
      ) {
        this.incapacidadpriv = this.incapacidadpriv + 1;
      } else if (this.descriForm.get('juevesSelect').value == 'septimo') {
        this.septimo = this.septimo + 1;
        if (this.isVisibleLibres == false) {
          if (this.septimo > 1) {
            this.libres();
          }
        }
      } else if (this.descriForm.get('juevesSelect').value == 'vacacion') {
        this.vacacion = this.vacacion + 1;
      } else if (this.descriForm.get('juevesSelect').value == 'falta') {
        this.falta = this.falta + 1;
      } else if (this.descriForm.get('juevesSelect').value == 'abandono') {
        this.abandono = this.abandono + 1;
      }
    } else {
      if (this.isVisibleInvalidas == false) {
        this.invalidas();
      }
      this.horasForm.get('juIControl').setValue('');
      this.horasForm.get('juOControl').setValue('');
    }
  }
  revisarViernes(entrada: moment.Moment, salida: moment.Moment) {
    if (entrada.isValid() && salida.isValid()) {
      if (entrada.isSame(salida)) {
        if (this.isVisibleValidasIguales == false) {
          this.validasIguales();
        } else {
          this.isVisibleValidasIguales = false;
        }
        this.horasForm.get('viIControl').setValue('');
        this.horasForm.get('viOControl').setValue('');
      } else {
        this.horasSemana(entrada, salida);
        this.hoursViernes = this.hours;
        console.log('Viernes: ' + this.hoursViernes);
        var dia = 'Viernes';
        this.horas(entrada, salida, this.hoursViernes, dia);
      }
    } else if (this.descriForm.get('viernesSelect').value != '') {
      if (this.descriForm.get('viernesSelect').value == 'feriado') {
        this.feriado = this.feriado + 1;
      } else if (
        this.descriForm.get('viernesSelect').value == 'incapacidadpub'
      ) {
        this.incapacidadpub = this.incapacidadpub + 1;
      } else if (
        this.descriForm.get('viernesSelect').value == 'incapacidadpriv'
      ) {
        this.incapacidadpriv = this.incapacidadpriv + 1;
      } else if (this.descriForm.get('viernesSelect').value == 'septimo') {
        this.septimo = this.septimo + 1;
        if (this.isVisibleLibres == false) {
          if (this.septimo > 1) {
            this.libres();
          }
        }
      } else if (this.descriForm.get('viernesSelect').value == 'vacacion') {
        this.vacacion = this.vacacion + 1;
      } else if (this.descriForm.get('viernesSelect').value == 'falta') {
        this.falta = this.falta + 1;
      } else if (this.descriForm.get('viernesSelect').value == 'abandono') {
        this.abandono = this.abandono + 1;
      }
    } else {
      if (this.isVisibleInvalidas == false) {
        this.invalidas();
      }
      this.horasForm.get('viIControl').setValue('');
      this.horasForm.get('viOControl').setValue('');
    }
  }
  revisarSabado(entrada: moment.Moment, salida: moment.Moment) {
    if (entrada.isValid() && salida.isValid()) {
      if (entrada.isSame(salida)) {
        if (this.isVisibleValidasIguales == false) {
          this.validasIguales();
        } else {
          this.isVisibleValidasIguales = false;
        }
        this.horasForm.get('saIControl').setValue('');
        this.horasForm.get('saOControl').setValue('');
      } else {
        this.horasSemana(entrada, salida);
        this.hoursSabado = this.hours;
        console.log('Sabado: ' + this.hoursSabado);
        var dia = 'Sabado';
        if (this.hoursSabado >= 4) {
          if (
            (entrada >= this.diurnaI &&
              entrada < this.diurnaO &&
              salida <= this.diurnaO &&
              salida > this.diurnaI &&
              salida > entrada) ||
            (entrada >= this.diurnaI &&
              entrada < this.mixtaIa &&
              (salida > this.nocturnaI || salida <= this.reset))
          ) {
            this.extrasSabados = this.hoursSabado - 4;
            this.horas(entrada, salida, 4, dia);
          } else {
            this.horas(entrada, salida, this.hoursSabado, dia);
          }
        } else {
          this.horas(entrada, salida, this.hoursSabado, dia);
        }
      }
    } else if (this.descriForm.get('sabadoSelect').value != '') {
      if (this.descriForm.get('sabadoSelect').value == 'feriado') {
        this.feriado = this.feriado + 1;
      } else if (
        this.descriForm.get('sabadoSelect').value == 'incapacidadpub'
      ) {
        this.incapacidadpub = this.incapacidadpub + 1;
      } else if (
        this.descriForm.get('sabadoSelect').value == 'incapacidadpriv'
      ) {
        this.incapacidadpriv = this.incapacidadpriv + 1;
      } else if (this.descriForm.get('sabadoSelect').value == 'septimo') {
        this.septimo = this.septimo + 1;
        if (this.isVisibleLibres == false) {
          if (this.septimo > 1) {
            this.libres();
          }
        }
      } else if (this.descriForm.get('sabadoSelect').value == 'vacacion') {
        this.vacacion = this.vacacion + 1;
      } else if (this.descriForm.get('sabadoSelect').value == 'falta') {
        this.falta = this.falta + 1;
      } else if (this.descriForm.get('sabadoSelect').value == 'abandono') {
        this.abandono = this.abandono + 1;
      }
    } else {
      if (this.isVisibleInvalidas == false) {
        this.invalidas();
      }
      this.horasForm.get('saIControl').setValue('');
      this.horasForm.get('saOControl').setValue('');
    }
  }
  revisarDomingo(entrada: moment.Moment, salida: moment.Moment) {
    if (entrada.isValid() && salida.isValid()) {
      if (entrada.isSame(salida)) {
        if (this.isVisibleValidasIguales == false) {
          this.validasIguales();
        } else {
          this.isVisibleValidasIguales = false;
        }
        this.horasForm.get('doIControl').setValue('');
        this.horasForm.get('doOControl').setValue('');
      } else {
        this.horasSemana(entrada, salida);
        this.hoursDomingo = this.hours;
        console.log('Domingo: ' + this.hoursDomingo);
        var dia = 'Domingo';
        this.horas(entrada, salida, this.hoursDomingo, dia);
      }
    } else if (this.descriForm.get('domingoSelect').value != '') {
      if (this.descriForm.get('domingoSelect').value == 'feriado') {
        this.feriado = this.feriado + 1;
      } else if (
        this.descriForm.get('domingoSelect').value == 'incapacidadpub'
      ) {
        this.incapacidadpub = this.incapacidadpub + 1;
      } else if (
        this.descriForm.get('domingoSelect').value == 'incapacidadpriv'
      ) {
        this.incapacidadpriv = this.incapacidadpriv + 1;
      } else if (this.descriForm.get('domingoSelect').value == 'septimo') {
        this.septimo = this.septimo + 1;
        if (this.isVisibleLibres == false) {
          if (this.septimo > 1) {
            this.libres();
          }
        }
      } else if (this.descriForm.get('domingoSelect').value == 'vacacion') {
        this.vacacion = this.vacacion + 1;
      } else if (this.descriForm.get('domingoSelect').value == 'falta') {
        this.falta = this.falta + 1;
      } else if (this.descriForm.get('domingoSelect').value == 'abandono') {
        this.abandono = this.abandono + 1;
      }
    } else {
      if (this.isVisibleInvalidas == false) {
        this.invalidas();
      }
      this.horasForm.get('doIControl').setValue('');
      this.horasForm.get('doOControl').setValue('');
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
    this.isVisibleInvalidas = false;
    this.isVisibleValidasIguales = false;
    this.isVisibleLibres = false;
    this.resetObservacion();
    this.revisarLunes(lunesDesde, lunesHasta);
    this.revisarMartes(martesDesde, martesHasta);
    this.revisarMiercoles(miercolesDesde, miercolesHasta);
    this.revisarJueves(juevesDesde, juevesHasta);
    this.revisarViernes(viernesDesde, viernesHasta);
    this.revisarSabado(sabadoDesde, sabadoHasta);
    this.revisarDomingo(domingoDesde, domingoHasta);
    this.incapacidad();
  }
  horas(
    entrada: moment.Moment,
    salida: moment.Moment,
    horas: number,
    dia: string
  ) {
    var a: number = 0,
      b: number = 0,
      exd: number = 0,
      exn: number = 0,
      exm: number = 0,
      jornada: number = 0;
    //jornada diurna con extras diurnas
    if (
      entrada >= this.diurnaI &&
      entrada < this.diurnaO &&
      salida <= this.diurnaO &&
      salida > this.diurnaI &&
      salida > entrada
    ) {
      if (dia == 'Sabado' && horas >= 4) {
        this.totalExtrasDiurnas = this.totalExtrasDiurnas + this.extrasSabados;
        console.log('jornada diurna ' + 'extras diurnas ' + this.extrasSabados);
      } else if (dia == 'Sabado' && horas < 4) {
        console.log('jornada diurna no completo ' + horas);
      } else if (horas >= this.hrsJornadaDiurna) {
        exd = horas - this.hrsJornadaDiurna;
        this.totalExtrasDiurnas = this.totalExtrasDiurnas + exd;
        console.log('jornada diurna ' + 'extras diurnas ' + exd);
      } else if (horas < this.hrsJornadaDiurna) {
        console.log('jornada diurna no completo ' + horas);
      }
      //jornada nocturna extras nocturas
    } else if (
      entrada >= this.nocturnaIa &&
      entrada < this.reset &&
      (salida > this.nocturnaIa || salida <= this.mixtaIa)
    ) {
      if (horas >= this.hrsJornadaNocturna) {
        exn = horas - this.hrsJornadaNocturna;
        this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
        console.log('jornada nocturna ' + 'extras nocturnas ' + exn);
      } else if (horas < this.hrsJornadaNocturna) {
        console.log('jornada nocturna no completo ' + horas);
      }
      //jornada diurna con extras mixtas y nocturnas
    } else if (
      entrada >= this.diurnaI &&
      entrada < this.mixtaIa &&
      (salida > this.nocturnaI || salida <= this.reset)
    ) {
      a = moment.duration(this.diurnaO.diff(entrada)).asHours();
      b = moment.duration(salida.diff(this.diurnaI)).asHours();
      if (dia == 'Sabado') {
        if (salida > this.nocturnaI && salida <= this.mixtaOc) {
          if (horas < this.hrsJornadaDiurna) {
            exd = a - 4;
            exm = moment.duration(salida.diff(this.diurnaO)).asHours();
            this.totalExtrasDiurnas = this.totalExtrasDiurnas + exd;
            this.totalExtrasMixtas = this.totalExtrasMixtas + exm;
            console.log(
              'jornada diurna ' +
                horas +
                ' extras diurnas ' +
                exd +
                ' extras mixtas ' +
                exm
            );
          } else {
            exd = a - 4;
            exm = moment.duration(salida.diff(this.diurnaO)).asHours();
            this.totalExtrasDiurnas = this.totalExtrasDiurnas + exd;
            this.totalExtrasMixtas = this.totalExtrasMixtas + exm;
            console.log(
              'jornada diurna ' +
                horas +
                ' extras diurnas ' +
                exd +
                ' extras mixtas ' +
                exm
            );
          }
        } else if (salida > this.mixtaOc || salida <= this.reset) {
          if (b > 0) {
            exd = a - this.hrsJornadaDiurna;
            exn = moment.duration(salida.diff(this.nocturnaI)).asHours();
            this.totalExtrasDiurnas = this.totalExtrasDiurnas + exd;
            this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
            console.log(
              'jornada diurna ' +
                horas +
                ' extras diurnas ' +
                exd +
                ' extras nocturnas ' +
                exn
            );
          } else {
            exd = a - this.hrsJornadaDiurna;
            exn = moment.duration(salida.diff(this.nocturnaI)).asHours() + 24;
            this.totalExtrasDiurnas = this.totalExtrasDiurnas + exd;
            this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
            console.log(
              'jornada diurna ' +
                horas +
                ' extras diurnas ' +
                exd +
                ' extras nocturnas ' +
                exn
            );
          }
        }
      } else if (a < this.hrsJornadaDiurna) {
        if (salida > this.nocturnaI && salida <= this.mixtaOc) {
          exm = horas - this.hrsJornadaDiurna;
          this.totalExtrasMixtas = this.totalExtrasMixtas + exm;
          console.log('jornada diurna ' + horas + ' extras mixtas ' + exm);
        } else if (salida > this.mixtaOc && salida <= this.reset) {
          exn = horas - this.hrsJornadaNocturna;
          this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
          console.log('jornada nocturna ' + horas + ' extras nocturnas ' + exn);
        }
      } else if (a >= this.hrsJornadaDiurna) {
        if (salida > this.nocturnaI && salida <= this.mixtaOc) {
          exd = a - this.hrsJornadaDiurna;
          exm = moment.duration(salida.diff(this.diurnaO)).asHours();
          this.totalExtrasDiurnas = this.totalExtrasDiurnas + exd;
          this.totalExtrasMixtas = this.totalExtrasMixtas + exm;
          console.log(
            'jornada diurna ' +
              horas +
              ' extras diurnas ' +
              exd +
              ' extras mixtas ' +
              exm
          );
        } else if (salida > this.mixtaOc || salida <= this.reset) {
          if (b > 0) {
            exd = a - this.hrsJornadaDiurna;
            exn = moment.duration(salida.diff(this.nocturnaI)).asHours();
            this.totalExtrasDiurnas = this.totalExtrasDiurnas + exd;
            this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
            console.log(
              'jornada diurna ' +
                horas +
                ' extras diurnas ' +
                exd +
                ' extras nocturnas ' +
                exn
            );
          } else {
            exd = a - this.hrsJornadaDiurna;
            exn = moment.duration(salida.diff(this.nocturnaI)).asHours() + 24;
            this.totalExtrasDiurnas = this.totalExtrasDiurnas + exd;
            this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
            console.log(
              'jornada diurna ' +
                horas +
                ' extras diurnas ' +
                exd +
                ' extras nocturnas ' +
                exn
            );
          }
        }
      } else if (a < this.hrsJornadaDiurna) {
        if (salida > this.nocturnaI && salida <= this.mixtaOc) {
          exm = horas - this.hrsJornadaDiurna;
          this.totalExtrasMixtas = this.totalExtrasMixtas + exm;
          console.log('jornada diurna ' + horas + ' extras mixtas ' + exm);
        } else if (salida > this.mixtaOc && salida <= this.reset) {
          exn = horas - this.hrsJornadaNocturna;
          this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
          console.log('jornada nocturna ' + horas + ' extras nocturnas ' + exn);
        }
      }
      //jornada mixta extras mixtas y nocturnas
    } else if (
      entrada >= this.mixtaIa &&
      entrada <= this.mixtaIc &&
      (salida <= this.diurnaI || salida >= this.diurnaO)
    ) {
      if (salida > this.mixtaOc || salida <= this.diurnaI) {
        jornada = moment.duration(this.mixtaOc.diff(entrada)).asHours();
        exm = jornada - this.hrsJornadaMixta;
        exn = moment.duration(salida.diff(this.mixtaOc)).asHours();
        if (exn < 0) {
          exn = exn + 24;
          this.totalExtrasMixtas = this.totalExtrasMixtas + exm;
          this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
          console.log(
            'jornada mixta ' + 'extras mixtas ' + exm + ' extra nocturna ' + exn
          );
        } else {
          this.totalExtrasMixtas = this.totalExtrasMixtas + exm;
          this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
          console.log(
            'jornada mixta ' + 'extras mixtas ' + exm + ' extra nocturna ' + exn
          );
        }
      } else if (salida > this.diurnaO && salida <= this.mixtaOc) {
        if (horas >= this.hrsJornadaMixta) {
          exm = horas - this.hrsJornadaMixta;
          this.totalExtrasMixtas = this.totalExtrasMixtas + exm;
          this.totalExtrasNocturas = this.totalExtrasNocturas + exn;
          console.log('jornada mixta ' + 'extras mixtas ' + exm);
        } else {
          console.log('jornada mixta no completo ' + horas);
        }
      }
    } else {
      if (this.isVisibleInvalidas == false) {
        this.invalidas();
        if (dia == 'Lunes') {
          this.descriForm.get('lunesSelect').setValue('');
        } else if (dia == 'Martes') {
          this.descriForm.get('martesSelect').setValue('');
        } else if (dia == 'Miercoles') {
          this.descriForm.get('miercolesSelect').setValue('');
        } else if (dia == 'Jueves') {
          this.descriForm.get('juevesSelect').setValue('');
        } else if (dia == 'Viernes') {
          this.descriForm.get('viernesSelect').setValue('');
        } else if (dia == 'Sabado') {
          this.descriForm.get('sabadoSelect').setValue('');
        } else if (dia == 'Domingo') {
          this.descriForm.get('domingoSelect').setValue('');
        }
      }
    }
    // totalTrabNormales: number = 0;
    // totalTrabDiurnas: number = 0;
    // totalTrabNocturnas: number = 0;
    // totalTrabMixtas: number = 0;
    // totalExtrasDiurnas: number = 0;
    // totalExtrasNocturas: number = 0;
    // totalExtrasMixtas: number = 0;
  }
  incapacidad() {
    if (this.incapacidadpub > 3) {
      this.extraForm.get('incpub').enable();
    } else {
      this.extraForm.get('incpub').disable();
    }
    // var horasExtras=this.totalExtrasDiurnas+this.totalExtrasMixtas+this.totalExtrasNocturas
    // var valorCompletar=this.incapacidadpriv
    // var hrstrab
    // var prom=hrstrab/44*48
    // console.log(
    // "extra diurnas ",this.totalExtrasDiurnas,
    // "extra nocturnas ",this.totalExtrasNocturas,
    // "extra mixtas ",this.totalExtrasMixtas)
    // if (this.extraForm.get('incpub').value == '' && this.incapacidadpub <= 3) {
    //   console.log('hacer la lista con valores existentes');
    //   this.handleCancel();
    // } else {
    //   console.log('hacer la lista con sumatoria incluida');
    //   this.handleCancel();
    // }
  }
  resetObservacion() {
    this.feriado = 0;
    this.incapacidadpub = 0;
    this.incapacidadpriv = 0;
    this.septimo = 0;
    this.vacacion = 0;
    this.falta = 0;
    this.abandono = 0;
    this.totalTrabDiurnas = 0;
    this.totalTrabMixtas = 0;
    this.totalTrabNocturnas = 0;
    this.totalExtrasDiurnas = 0;
    this.totalExtrasMixtas = 0;
    this.totalExtrasNocturas = 0;
    this.extrasSabados = 0;
  }
  showModal(): void {
    this.modal.confirm({
      nzCentered: true,
      nzTitle: 'CONFIRMACIÓN',
      nzContent:
        '<b style="color: red;">¿Esta seguro de haber ingresado las horas correctas?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.calcular(),
      nzCancelText: 'No',
      nzOnCancel: () => this.handleCancel(),
    });
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
      this.horasForm.get('luIControl').setValue('');
      this.horasForm.get('luOControl').setValue('');
      console.log(this.luI, this.luO);
    } else {
      this.horasForm.get('luIControl').setValue('');
      this.horasForm.get('luOControl').setValue('');
      this.horasForm.get('luIControl').enable();
      this.horasForm.get('luOControl').enable();
    }
  }
  onChangeMartes(value) {
    console.log(value);
    if (this.descriForm.get('martesSelect').value == value && value != '') {
      this.horasForm.get('maIControl').disable();
      this.horasForm.get('maOControl').disable();
      this.horasForm.get('maIControl').setValue('');
      this.horasForm.get('maOControl').setValue('');
      console.log(this.maI, this.maO);
    } else {
      this.horasForm.get('maIControl').setValue('');
      this.horasForm.get('maOControl').setValue('');
      this.horasForm.get('maIControl').enable();
      this.horasForm.get('maOControl').enable();
    }
  }
  onChangeMiercoles(value) {
    console.log(value);
    if (this.descriForm.get('miercolesSelect').value == value && value != '') {
      this.horasForm.get('miIControl').disable();
      this.horasForm.get('miOControl').disable();
      this.horasForm.get('miIControl').setValue('');
      this.horasForm.get('miOControl').setValue('');
      console.log(this.miI, this.miO);
    } else {
      this.horasForm.get('miIControl').setValue('');
      this.horasForm.get('miOControl').setValue('');
      this.horasForm.get('miIControl').enable();
      this.horasForm.get('miOControl').enable();
    }
  }
  onChangeJueves(value) {
    console.log(value);
    if (this.descriForm.get('juevesSelect').value == value && value != '') {
      this.horasForm.get('juIControl').disable();
      this.horasForm.get('juOControl').disable();
      this.horasForm.get('juIControl').setValue('');
      this.horasForm.get('juOControl').setValue('');
      console.log(this.juI, this.juO);
    } else {
      this.horasForm.get('juIControl').setValue('');
      this.horasForm.get('juOControl').setValue('');
      this.horasForm.get('juIControl').enable();
      this.horasForm.get('juOControl').enable();
    }
  }
  onChangeViernes(value) {
    console.log(value);
    if (this.descriForm.get('viernesSelect').value == value && value != '') {
      this.horasForm.get('viIControl').disable();
      this.horasForm.get('viOControl').disable();
      this.horasForm.get('viIControl').setValue('');
      this.horasForm.get('viOControl').setValue('');
      console.log(this.viI, this.viO);
    } else {
      this.horasForm.get('viIControl').setValue('');
      this.horasForm.get('viOControl').setValue('');
      this.horasForm.get('viIControl').enable();
      this.horasForm.get('viOControl').enable();
    }
  }
  onChangeSabado(value) {
    console.log(value);
    if (this.descriForm.get('sabadoSelect').value == value && value != '') {
      this.horasForm.get('saIControl').disable();
      this.horasForm.get('saOControl').disable();
      this.horasForm.get('saIControl').setValue('');
      this.horasForm.get('saOControl').setValue('');
      console.log(this.saI, this.saO);
    } else {
      this.horasForm.get('saIControl').setValue('');
      this.horasForm.get('saOControl').setValue('');
      this.horasForm.get('saIControl').enable();
      this.horasForm.get('saOControl').enable();
    }
  }
  onChangeDomingo(value) {
    console.log(value);
    if (this.descriForm.get('domingoSelect').value == value && value != '') {
      this.horasForm.get('doIControl').disable();
      this.horasForm.get('doOControl').disable();
      this.horasForm.get('doIControl').setValue('');
      this.horasForm.get('doOControl').setValue('');
      console.log(this.doI, this.doO);
    } else {
      this.horasForm.get('doIControl').setValue('');
      this.horasForm.get('doOControl').setValue('');
      this.horasForm.get('doIControl').enable();
      this.horasForm.get('doOControl').enable();
    }
  }
}
