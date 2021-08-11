import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

moment.locale('es');

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.css'],
})
export class HorasComponent implements OnInit {
  horasForm: FormGroup;
  descriForm: FormGroup;
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

  constructor(private fb: FormBuilder) {
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
    this.horasForm.get('luIControl').setValue('');
    this.horasForm.get('luOControl').setValue('');
    this.horasForm.get('maIControl').setValue('');
    this.horasForm.get('maOControl').setValue('');
    this.horasForm.get('miIControl').setValue('');
    this.horasForm.get('miOControl').setValue('');
    this.horasForm.get('juIControl').setValue('');
    this.horasForm.get('juOControl').setValue('');
    this.horasForm.get('viIControl').setValue('');
    this.horasForm.get('viOControl').setValue('');
    this.horasForm.get('saIControl').setValue('');
    this.horasForm.get('saOControl').setValue('');
    this.horasForm.get('doIControl').setValue('');
    this.horasForm.get('doOControl').setValue('');
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

    if (lunesDesde > lunesHasta) {
      var difLunes = moment
        .duration(lunesHasta.diff(lunesDesde))
        .add(24, 'hours');
      var hoursLunes = difLunes.asHours();
    } else {
      var difLunes = moment.duration(lunesHasta.diff(lunesDesde));
      var hoursLunes = difLunes.asHours();
    }
    if (martesDesde > martesHasta) {
      var difMartes = moment
        .duration(martesHasta.diff(martesDesde))
        .add(24, 'hours');
      var hoursMartes = difMartes.asHours();
    } else {
      var difMartes = moment.duration(martesHasta.diff(martesDesde));
      var hoursMartes = difMartes.asHours();
    }
    if (miercolesDesde > miercolesHasta) {
      var difMiercoles = moment
        .duration(miercolesHasta.diff(miercolesDesde))
        .add(24, 'hours');
      var hoursMiercoles = difMiercoles.asHours();
    } else {
      var difMiercoles = moment.duration(miercolesHasta.diff(miercolesDesde));
      var hoursMiercoles = difMiercoles.asHours();
    }
    if (juevesDesde > juevesHasta) {
      var difJueves = moment
        .duration(juevesHasta.diff(juevesDesde))
        .add(24, 'hours');
      var hoursJueves = difJueves.asHours();
    } else {
      var difJueves = moment.duration(juevesHasta.diff(juevesDesde));
      var hoursJueves = difJueves.asHours();
    }
    if (viernesDesde > viernesHasta) {
      var difViernes = moment
        .duration(viernesHasta.diff(viernesDesde))
        .add(24, 'hours');
      var hoursViernes = difViernes.asHours();
    } else {
      var difViernes = moment.duration(viernesHasta.diff(viernesDesde));
      var hoursViernes = difViernes.asHours();
    }
    if (sabadoDesde > sabadoHasta) {
      var difSabado = moment
        .duration(sabadoHasta.diff(sabadoDesde))
        .add(24, 'hours');
      var hoursSabado = difSabado.asHours();
    } else {
      var difSabado = moment.duration(sabadoHasta.diff(sabadoDesde));
      var hoursSabado = difSabado.asHours();
    }
    if (domingoDesde > domingoHasta) {
      var difDomingo = moment
        .duration(domingoHasta.diff(domingoDesde))
        .add(24, 'hours');
      var hoursDomingo = difDomingo.asHours();
    } else {
      var difDomingo = moment.duration(domingoHasta.diff(domingoDesde));
      var hoursDomingo = difDomingo.asHours();
    }
    console.log('Horas trabajadas día Lunes: ' + hoursLunes);
    console.log('Horas trabajadas día Martes: ' + hoursMartes);
    console.log('Horas trabajadas día Miercoles: ' + hoursMiercoles);
    console.log('Horas trabajadas día Jueves: ' + hoursJueves);
    console.log('Horas trabajadas día Viernes: ' + hoursViernes);
    console.log('Horas trabajadas día Sabado: ' + hoursSabado);
    console.log('Horas trabajadas día Domingo: ' + hoursDomingo);

    if (lunesDesde >= this.diurnaI && lunesHasta <= this.diurnaO && lunesHasta > this.diurnaI && lunesHasta > lunesDesde) {
      if (hoursLunes >= this.hrsJornadaDiurna) {
        var extras = hoursLunes - this.hrsJornadaDiurna;
        console.log('jornada diurna '+'extras diurnas ' + extras);
      } else if(hoursLunes < this.hrsJornadaDiurna){
        console.log('jornada diurna no completo ' + hoursLunes);
      }
  } else if ((lunesDesde >= this.diurnaI && lunesDesde<=this.diurnaO) && (lunesHasta>this.nocturnaI || lunesHasta<=this.diurnaO) && (lunesHasta<lunesDesde)) {
    var a = (moment.duration(this.diurnaO.diff(lunesDesde)).asHours());
    var b = (moment.duration(lunesHasta.diff(this.diurnaI)).asHours());
    if (b>0){
      var sum=a+b
      if (sum>=this.hrsJornadaDiurna){
        var exd=sum-this.hrsJornadaDiurna
        var exn=hoursLunes-sum
        console.log("jornada diurna "+hoursLunes+" extras diurnas "+exd+" extras nocturnas "+exn)
      }else{
        var exn=hoursLunes-sum-this.hrsJornadaNocturna
        console.log("jornada nocturna "+hoursLunes+" extras diurnas "+sum+" extras nocturnas "+exn)
      }
    } else {
      if (a>=this.hrsJornadaDiurna){
        var exd=a-this.hrsJornadaDiurna
        var exn=hoursLunes-a
        console.log("jornada diurna "+hoursLunes+" extras diurnas "+exd+" extras nocturnas "+exn)
      } else {
        var faltante=hoursLunes-a
        if (faltante>=this.hrsJornadaNocturna){
          var exn=hoursLunes-a-this.hrsJornadaNocturna
          console.log("jornada nocturna "+hoursLunes+" extras diurnas "+a+" extras nocturnas "+exn)
        } else if(faltante<this.hrsJornadaNocturna){        
          var exd=hoursLunes-this.hrsJornadaNocturna
          console.log("jornada nocturna "+hoursLunes+" extras diurnas "+exd)
        }
      }
    }
  } else if ((lunesDesde >= this.diurnaI && lunesDesde<=this.diurnaO) && (lunesHasta>this.nocturnaI && lunesHasta<=this.reset)) {
    var a = (moment.duration(this.diurnaO.diff(lunesDesde)).asHours());
    var b = (moment.duration(lunesHasta.diff(this.diurnaO)).asHours());
    if (a>=this.hrsJornadaDiurna){
        if(lunesHasta>this.nocturnaI && lunesHasta<=this.mixtaOc){
        var exd=a-this.hrsJornadaDiurna
        var exm = (moment.duration(lunesHasta.diff(this.diurnaO)).asHours());
        console.log("jornada diurna "+hoursLunes+" extras diurnas "+exd+" extras mixtas "+exm)}
        else if (lunesHasta>this.mixtaOc && lunesHasta<=this.reset){
        var exd=a-this.hrsJornadaDiurna
        var exn = (moment.duration(lunesHasta.diff(this.nocturnaI)).asHours());
        console.log("jornada diurna "+hoursLunes+" extras diurnas "+exd+" extras nocturnas "+exn)}
    } else if (a<this.hrsJornadaDiurna){
      if(lunesHasta>this.nocturnaI && lunesHasta<=this.mixtaOc){
        var exm=hoursLunes-this.hrsJornadaDiurna
        console.log("jornada diurna "+hoursLunes+" extras mixtas "+exm)}
        else if (lunesHasta>this.mixtaOc && lunesHasta<=this.reset){
        var exn=hoursLunes-this.hrsJornadaDiurna
        console.log("jornada diurna "+hoursLunes+" extras nocturnas "+exn)}
    }
  } else if ((lunesDesde >= this.nocturnaI || lunesDesde < this.nocturnaO) && (lunesHasta <= this.diurnaI || lunesHasta >= this.diurnaO)) {
    if(hoursLunes>10){
      if(lunesHasta>=this.diurnaO && lunesHasta<=this.mixtaOc){      
        const exd=6
        var exn = (moment.duration(this.diurnaI.diff(lunesDesde)).asHours());
        var exm = (moment.duration(lunesHasta.diff(this.diurnaO)).asHours());
        console.log("jornada diurna "+ hoursLunes+" extras diurnas "+exd+" extras nocturnas "+exn+" extras mixtas "+exm)
      } else if (lunesHasta>this.mixtaOc && lunesHasta<this.reset){
        const exd=6
        var a = (moment.duration(this.diurnaI.diff(lunesDesde)).asHours());
        var b = (moment.duration(lunesHasta.diff(this.nocturnaI)).asHours());
        var exn=a+b
        console.log("jornada diurna "+ hoursLunes+" extras diurnas "+exd+" extras nocturnas "+exn)
      }} else if (hoursLunes >= this.hrsJornadaNocturna && hoursLunes<10) {
        var extras = hoursLunes - this.hrsJornadaNocturna;
        console.log('jornada nocturna '+'extras nocturnas ' + extras);
      } else {
        console.log('jornada nocturna no completo ' + hoursLunes);
      }
  } else if (lunesDesde >= this.mixtaIa && lunesDesde <= this.mixtaIc && (lunesHasta <= this.diurnaI || lunesHasta >= this.diurnaO)) {
      if (lunesHasta > this.mixtaOc || lunesHasta <= this.diurnaI) {
        var jornada = (moment.duration(this.mixtaOc.diff(lunesDesde)).asHours());
        var extras=jornada-this.hrsJornadaMixta
        var hoursdif = (moment.duration(lunesHasta.diff(this.mixtaOc)).asHours());
        if (hoursdif < 0) {
          hoursdif = hoursdif + 24;
          console.log('jornada mixta '+'extras mixtas ' + extras + ' extra nocturna ' + hoursdif);
        } else {
          console.log('jornada mixta '+'extras mixtas ' + extras + ' extra nocturna ' + hoursdif);
        }
      } else if (lunesHasta > this.diurnaO && lunesHasta <= this.mixtaOc) {
        if(hoursLunes>=this.hrsJornadaMixta){
          var exm=hoursLunes-this.hrsJornadaMixta
          console.log('jornada mixta '+'extras mixtas ' + exm);
        } else {
          console.log('jornada diurna no completo ' + hoursLunes);
        }
      }
  } else if (lunesDesde >= this.nocturnaI || (lunesDesde <= this.diurnaI && lunesHasta <= this.nocturnaI)) {
      var hoursDiurna = (moment.duration(lunesHasta.diff(this.diurnaI)).asHours());
      var hoursNocturna = hoursLunes - hoursDiurna;
      if (hoursDiurna > hoursNocturna) {
        console.log(hoursDiurna, hoursNocturna);
        if (hoursLunes < this.hrsJornadaDiurna) {
          console.log('jornada diurna no completo ' + hoursLunes);
        } else if (hoursLunes >= this.hrsJornadaDiurna) {
          if (hoursDiurna > this.hrsJornadaDiurna) {
            var extra = hoursDiurna - this.hrsJornadaDiurna;
            console.log('jornada diurna ' +hoursLunes +' extras diurnas ' +extra +' extra nocturna ' +hoursNocturna);
          } else if (hoursDiurna < this.hrsJornadaDiurna) {
            var completar = this.hrsJornadaDiurna - hoursDiurna;
            var xnocturna = hoursNocturna - completar;
            console.log('jornada diurna ' + hoursLunes + ' extra nocturna ' + xnocturna);
          } else if (hoursDiurna == this.hrsJornadaDiurna) {
            console.log('jornada diurna ' +hoursLunes +' extra nocturna ' +hoursNocturna);
          }
        }
      } else {
        console.log(hoursDiurna, hoursNocturna);
        if (hoursLunes < this.hrsJornadaNocturna) {
          console.log('jornada nocturna no completo ' + hoursLunes);
        } else if (hoursLunes >= this.hrsJornadaNocturna) {
          if (hoursNocturna > this.hrsJornadaNocturna) {
            var extra = hoursNocturna - this.hrsJornadaNocturna;
            console.log('jornada nocturna ' +hoursLunes +' extras nocturna ' +extra +' extra diurna ' +hoursDiurna);
          } else if (hoursNocturna < this.hrsJornadaNocturna) {
            var completar = this.hrsJornadaNocturna - hoursNocturna;
            var xdiurna = hoursDiurna - completar;
            console.log('jornada nocturna ' + hoursLunes + ' extra diurnas ' + xdiurna);
          } else if (hoursNocturna == this.hrsJornadaNocturna) {
            console.log('jornada nocturna ' + hoursLunes + ' extra diurna ' + hoursDiurna);
          }
        }
      }
    }
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
