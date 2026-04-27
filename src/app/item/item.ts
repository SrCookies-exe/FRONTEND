import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-item',
  templateUrl: './app-item.html'
})
export class Item {

  @Input() tarefa!: Tarefa;

  @Output() remover = new EventEmitter<Tarefa>();
  @Output() modificaTarefa = new EventEmitter<Tarefa>();

  onCheckboxChange(event: any) {
    this.tarefa.statusRealizada = event.target.checked;
    this.modificaTarefa.emit(this.tarefa);
  }
}