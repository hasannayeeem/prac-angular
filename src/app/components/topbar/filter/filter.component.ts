import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NzSelectModule, 
    CommonModule,
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<{ limit: number, sortOrder: 'asc' | 'desc' }>();

  selectedLimit = 0;
  selectedSortOrder: 'asc' | 'desc' = 'asc';

  onLimitChange(value: number) {
    this.selectedLimit = value;
    this.emitChange();
  }

  onSortOrderChange(value: 'asc' | 'desc') {
    this.selectedSortOrder = value;
    this.emitChange();
  }

  private emitChange() {
    this.filterChanged.emit({
      limit: this.selectedLimit,
      sortOrder: this.selectedSortOrder
    });
  }
}
