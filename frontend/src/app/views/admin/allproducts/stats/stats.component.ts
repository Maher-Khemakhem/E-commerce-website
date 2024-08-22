import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{
  myForm: any;
  Ratings: any = [];
  one: number = 0;
  two: number = 0;
  three: number = 0;
  four: number = 0;
  five: number = 0;
  chart: any;
  chartt:any;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<StatsComponent>,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.crudService.getRating().subscribe(res => {
      this.Ratings = res.data;
      this.countRatings();
      this.createChart1();
      this.createChart2();
    });
  }

  countRatings(): void {
    for (let i = 0; i < this.Ratings.length; i++) {
      if (this.Ratings[i].article_id == this.data.article_id) {
        switch (this.Ratings[i].note) {
          case 1:
            this.one++;
            break;
          case 2:
            this.two++;
            break;
          case 3:
            this.three++;
            break;
          case 4:
            this.four++;
            break;
          case 5:
            this.five++;
            break;
        }
      }
    }
  }
  c1:any;
  c2:any;
  createChart1(): void {
    const labels = ['One star', 'Two stars', 'Three stars', 'Four stars', 'Five stars'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Ratings Distribution',
        data: [this.one, this.two, this.three, this.four, this.five],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }]
    };

    this.c1 = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    setTimeout(() => {
      const ctx = document.getElementById('MyChart') as HTMLCanvasElement;
      if (ctx) {
        this.chart = new Chart(ctx, this.c1);
      }
    });
  }
  createChart2():void{
    const data = {
      labels: [
        'One star',
        'Two stars',
        'Three stars',
        'Four stars',
        'Five stars'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [this.one, this.two, this.three, this.four, this.five],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        //hoverOffset: 4
      }]
    };
    this.c2 = {
      type: 'doughnut',
      data: data,
    };
    setTimeout(() => {
      const ctx = document.getElementById('Chartt') as HTMLCanvasElement;
      if (ctx) {
        this.chart = new Chart(ctx, this.c2);
      }
    });
  }
}
