import { Component } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NzSelectModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

}
