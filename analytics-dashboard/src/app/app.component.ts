import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Remova DashboardComponent
  template: `
    <router-outlet></router-outlet> <!-- Somente a saída das rotas -->
  `,
})
export class AppComponent {}
