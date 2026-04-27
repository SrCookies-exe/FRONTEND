import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-item',
  templateUrl: './item.html' 
})
export class Item {

  @Input() tarefa!: Tarefa;

  @Output() remover = new EventEmitter<Tarefa>();
  @Output() modificaTarefa = new EventEmitter<Tarefa>();

  emEdicao: boolean = false;
}