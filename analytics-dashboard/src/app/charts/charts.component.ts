import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js'; // Importe ChartConfiguration

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent {
  // Defina os dados do gráfico corretamente
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { data: [10, 20, 30, 40, 50], label: 'Vendas' }
    ],
  };

  // Defina as opções do gráfico
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  // Defina o tipo do gráfico explicitamente como "bar"
  public barChartType: 'bar' = 'bar'; // Tipo explícito
}