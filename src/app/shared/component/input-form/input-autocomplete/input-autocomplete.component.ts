import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements OnInit {
    @Input() label: string = ''
    @Input() options: string[] = [];
    @Input() myControl = new FormControl('');
    // @Output() emitOnKeyPress = new EventEmitter()

    filteredOptions: Observable<string[]>;
  
    public ngOnInit() {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        map(value => this._filter(value || '')),
      );
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
}
