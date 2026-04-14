import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionItemComponent } from './components/question-item/question-item.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';

@Component({
  selector: 'app-root',
  imports: [AddQuestionComponent,QuestionListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngLesson4HW');
}
