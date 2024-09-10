import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService, Machine } from '../../services/state.service'; // Adjust the path as needed

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  imports: [CommonModule],
  providers: [DatePipe]
})
export class NavigationComponent implements OnInit {

  public now: Date = new Date();
  public operatorName = 'Operator';
  public machines: Machine[] = []; // Store machines data

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    // Fetch machines data on component initialization
    this.loadMachines();

    // Update time every second
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  // Function to load machines from the service
  private loadMachines(): void {
    this.stateService.getMachines().subscribe({
      next: (data: Machine[]) => {
        this.machines = data; // Assign data to machines array
      },
      error: (error) => {
        console.error('Error fetching machines:', error); // Handle error
      }
    });
  }
}