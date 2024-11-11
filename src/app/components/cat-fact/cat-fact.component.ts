import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-cat-fact',
  standalone: true,
  imports: [],
  templateUrl: './cat-fact.component.html',
  styleUrl: './cat-fact.component.scss'
})
export class CatFactComponent {
  public header: string = 'Random fact'
  @Input() fact!: string;
}
