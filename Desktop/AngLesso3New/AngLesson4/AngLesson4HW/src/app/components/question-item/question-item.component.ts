import { Component, input, Input } from '@angular/core';
import { Question } from '../../shared/question';

@Component({
  selector: 'app-question-item',
  imports: [],
  templateUrl: './question-item.component.html',
  styleUrl: './question-item.component.scss',
})
export class QuestionItemComponent {
@Input() questionData!: Question;}
