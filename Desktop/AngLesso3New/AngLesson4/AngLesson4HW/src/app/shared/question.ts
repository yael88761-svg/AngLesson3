export class Question {
  constructor(
    public question: string,
    public answers: string[],
    public correctAnswer: number,
    public id?: number | string
  ) {}

  isCorrect(userAnswer: string): boolean {
    return userAnswer === this.answers[this.correctAnswer];
  }
}