import { inject, Injectable } from '@angular/core';
import { Question } from './question';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionsApiService {
    private readonly baseURL = 'http://localhost:3000/questions'; // כתובת ה-API שלנו
    private readonly getUrl = 'https://adi-teacher-api.onrender.com/quizzes?user=yael';
    private readonly postUrl = 'https://adi-teacher-api.onrender.com/quizzes';
  // סרוויס שמור באנגולר שניתן לגשת איתו לשרת
  private readonly http = inject(HttpClient);

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.getUrl);
  }
  
  addQuestion(q: Question) {
    return this.http.post<Question>(this.postUrl, q);
  }

}
