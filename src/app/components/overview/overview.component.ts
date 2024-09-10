import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService, Machine } from '../../services/state.service';

@Component({
  selector: 'app-overview',  // Updated selector
  standalone: true,
  templateUrl: './overview.component.html',  // Updated template path
  styleUrls: ['./overview.component.css'],  // Updated stylesheet path
  imports: [CommonModule],
})
export class OverviewComponent implements OnInit {

  public machines: Machine[] = []; // Store machines data

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.loadMachines();
  }

  loadMachines(): void {
    this.stateService.getMachines().subscribe({
      next: (data: Machine[]) => {
        this.machines = data;
      },
      error: (error) => {
        console.error('Error fetching machines:', error);
      }
    });
  }
}
