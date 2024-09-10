import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiUrl = 'assets/machines.json'; 

  constructor(private http: HttpClient) { }

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.apiUrl).pipe(
      map(machines => machines.map(machine => ({
        ...machine,
        name: machine.name,
        color: this.getColor(machine.status),
        logo: this.getLogo(machine.status),
        logoColor: this.getLogoColor(machine.status),
        textColor: this.getTextColor(machine.status),
        machineLogo: this.getMachineLogo(machine.name),
      })))
    );
  }

  private getColor(status: string): string {
    switch (status) {
      case 'Warning': return '#ff9704';
      case 'Alarm': return '#fe3736';
      default: return '#dcdcdc';
    }
  }

  private getLogoColor(status: string): string {
    switch (status) {
      case 'Running': return '#82ac16';
      default: return '#ffffff';
    }
  }

  private getTextColor(status: string): string {
    switch (status) {
      case 'Running': return '#000';
      default: return '#fff';
    }
  }

  private getLogo(status: string): string {
    switch (status) {
      case 'Warning': return 'warning';
      case 'Alarm': return 'error';
      default: return 'settings_backup_restore';
    }
  }

  private getMachineLogo(name: string): string {
    switch (name) {
      case 'Scale': return 'system_update_alt';
      case 'Attacher': return 'chrome_reader_mode';
      case 'Packer': return 'indeterminate_check_box';
      case 'Closer': return 'grid_on';
      default: return 'error_med';
    }
  }


}

export interface Machine {
    name: string;
    status: string;
    color?: string;
    logo?: string;
    logoColor?: string;
    textColor?: string;
    machineLogo?: string;
  }