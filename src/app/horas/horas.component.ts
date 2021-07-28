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
  timea: Date | null = null;
  timeb: Date | null = null;

  constructor() {}

  ngOnInit(): void {}

  time = new Date();
  calculo() {
    var lunesDesde = moment(this.luI, 'HH:mm a');
    var lunesHasta = moment(this.luO, 'HH:mm a');

    if (lunesDesde > lunesHasta) {
      var difLunes = moment
        .duration(lunesHasta.diff(lunesDesde))
        .add(24, 'hours');
      var hoursLunes = difLunes.asHours();
    } else {
      var difLunes = moment.duration(lunesHasta.diff(lunesDesde));
      var hoursLunes = difLunes.asHours();
    }
    console.log(hoursLunes);
  }

  horasLunI(value: Time): void {
    this.luI = value;
    console.log(value);
  }
  horasLunO(value: Time): void {
    this.luO = value;
    console.log(value);
  }
}
