import { Component, signal } from '@angular/core';
import { ListItem } from './components/list-item/list-item';

@Component({
  selector: 'app-root',
  imports: [ListItem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngLesson3');
}
