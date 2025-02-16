import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface SalesData {
  produto: string;
  quantidade: number;
  valor: number;
}

const ELEMENT_DATA: SalesData[] = [
  { produto: 'Notebook', quantidade: 10, valor: 5000 },
  { produto: 'Mouse', quantidade: 30, valor: 150 },
  { produto: 'Keyboard', quantidade: 20, valor: 300 },
];

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent {
  displayedColumns: string[] = ['product', 'quantity', 'value'];
  dataSource = ELEMENT_DATA;
}