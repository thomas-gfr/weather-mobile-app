import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-text-form',
  templateUrl: './input-text-form.component.html',
  styleUrls: ['./input-text-form.component.scss']
})
export class InputTextFormComponent implements OnInit {
    @Input() label: string = ''
    @Output() emitOnKeyPress = new EventEmitter()

    constructor() { }

    ngOnInit(): void {
    }

    public onKeyPress(event: any) {
        this.emitOnKeyPress.emit(event.target.value)
    }
}
