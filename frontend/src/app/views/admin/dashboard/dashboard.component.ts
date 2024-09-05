import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedserviceService } from 'src/app/service/sharedservice.service';
import { Chart, registerables } from 'chart.js';
import { CrudService } from 'src/app/service/crud.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  authenticated: boolean = false;
  chartt: any;
  config: any;
  configg:any;
  commandes: any[] = [];
  totalmonth:any=0;
  totalannual:any=0;
  list: number[] = Array(12).fill(0); // Initialize list with zeros for all 12 months
  clients:any=[];
  nbclients:any=0;
  nbcommandes:any=0;
  chart:any;
  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedserviceService,
    private router: Router,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.checkAdminAuth();
    const today = new Date();
    const monthIndex = today.getMonth();
    const monthNumber = monthIndex + 1;
    this.crudService.getCommandess().subscribe((res: any) => {
      this.commandes = res.data;
      this.commandes.forEach(command => {
        const dateString = command.created_at;
        const date = new Date(dateString);
        const month = date.getMonth();
        this.list[month] += command.total_price;
        
      });
      this.nbcommandes = this.commandes.length;
      for(let i=0;i<this.list.length;i++){
        this.totalannual+=this.list[i];
      }
      this.totalmonth = this.list[monthNumber-1];
      this.createChart();
      this.createChart1(); // Create the chart after data is processed
    });
    this.crudService.getClients().subscribe((res:any)=>{
      this.clients = res.data;
      this.nbclients=this.clients.length;
    })
  }
  createChart() {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const data = {
      labels: labels,
      datasets: [{
        label: 'Total revenue per month',
        data: this.list, // Assuming this.list contains your data
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',  // January
          'rgba(255, 159, 64, 0.2)',  // February
          'rgba(255, 205, 86, 0.2)',  // March
          'rgba(75, 192, 192, 0.2)',  // April
          'rgba(54, 162, 235, 0.2)',  // May
          'rgba(153, 102, 255, 0.2)', // June
          'rgba(201, 203, 207, 0.2)', // July
          'rgba(255, 99, 132, 0.2)',  // August
          'rgba(54, 162, 235, 0.2)',  // September
          'rgba(153, 102, 255, 0.2)', // October
          'rgba(255, 159, 64, 0.2)',  // November
          'rgba(75, 192, 192, 0.2)',  // December
        ],
        borderColor: [
          'rgb(255, 99, 132)',   // January
          'rgb(255, 159, 64)',   // February
          'rgb(255, 205, 86)',   // March
          'rgb(75, 192, 192)',   // April
          'rgb(54, 162, 235)',   // May
          'rgb(153, 102, 255)',  // June
          'rgb(201, 203, 207)',  // July
          'rgb(255, 99, 132)',   // August
          'rgb(54, 162, 235)',   // September
          'rgb(153, 102, 255)',  // October
          'rgb(255, 159, 64)',   // November
          'rgb(75, 192, 192)',   // December
        ],
        borderWidth: 1
      }]
    };
  
    this.configg = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,  // Ensure responsiveness
        maintainAspectRatio: false  // Disable aspect ratio to allow flexible resizing
      }
    };
  
    const chartElement = document.getElementById('myChartt') as HTMLCanvasElement;
    if (chartElement) {
      this.chart = new Chart(chartElement, this.configg);
    } else {
      console.error('Chart element not found');
    }
  }
  createChart1() {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
      labels: labels,
      datasets: [{
        label: 'Total Revenue by Month',
        data: this.list,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.config = {
      type: 'line',
      data: data
    };

    const chartElement = document.getElementById('myChart') as HTMLCanvasElement;
    if (chartElement) {
      this.chartt = new Chart(chartElement, this.config);
    } else {
      console.error('Chart element not found');
    }
  }

  checkAdminAuth() {
    this.httpClient.get('http://localhost:8000/api/admin', { withCredentials: true }).subscribe(
      (res: any) => {
        this.authenticated = true;
        this.sharedService.setAuthStatus(true);
        this.sharedService.setClientId(res.id);
        console.log(res);
        console.log("mahran");
      },
      err => {
        this.sharedService.setAuthStatus(false);
        this.router.navigate(['admin/login']);
      }
    );
  }
}
