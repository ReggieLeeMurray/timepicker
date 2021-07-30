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
    const lunesDesde = moment(this.luI, 'HH:mm a');
    const lunesHasta = moment(this.luO, 'HH:mm a');
    const martesDesde = moment(this.maI, 'HH:mm a');
    const martesHasta = moment(this.maO, 'HH:mm a');
    const miercolesDesde = moment(this.miI, 'HH:mm a');
    const miercolesHasta = moment(this.miO, 'HH:mm a');
    const juevesDesde = moment(this.juI, 'HH:mm a');
    const juevesHasta = moment(this.juO, 'HH:mm a');
    const viernesDesde = moment(this.viI, 'HH:mm a');
    const viernesHasta = moment(this.viO, 'HH:mm a');
    const sabadoDesde = moment(this.saI, 'HH:mm a');
    const sabadoHasta = moment(this.saO, 'HH:mm a');
    const domingoDesde = moment(this.doI, 'HH:mm a');
    const domingoHasta = moment(this.doO, 'HH:mm a');

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
  }
  selectedValue = 'lucy';

  listOfGroupOption = [
    { label: 'Jack', value: 'jack', groupLabel: 'Manager' },
    { label: 'Lucy', value: 'lucy', groupLabel: 'Manager' },
    { label: 'Tom', value: 'tom', groupLabel: 'Engineer' },
  ];
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
  changelabel(value) {
    console.log(value);
    switch (value) {
      case '1':
        return this.horasForm.get('role').setValue('Admin');
      case '2':
        return this.horasForm.get('role').setValue('Digitador');
      case '3':
        return this.horasForm.get('role').setValue('Usuario');
      case '0':
        break;
    }
  }
}
