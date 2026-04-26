import { Component, signal } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas = signal<Tarefa[]>([]);

  apiURL: string = 'https://apitarefasgui252862otav253525-25ph.onrender.com';

  constructor(private http: HttpClient) {
    this.READ_tarefa();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);

    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa)
      .subscribe(resultado => {
        console.log(resultado);
        this.READ_tarefa();
      });
  }

  READ_tarefa() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`)
      .subscribe(resultado => this.arrayDeTarefas.set(resultado));
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    const indice = this.arrayDeTarefas().indexOf(tarefaAserRemovida);
    const id = this.arrayDeTarefas()[indice]._id;

    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`)
      .subscribe(resultado => {
        console.log(resultado);
        this.READ_tarefa();
      });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
    const id = this.arrayDeTarefas()[indice]._id;

    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada)
      .subscribe(resultado => {
        console.log(resultado);
        this.READ_tarefa();
      });
  }
}