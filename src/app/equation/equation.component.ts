import { Component, OnInit } from '@angular/core';
enum userAnswer {
  failed = 'Incorrect',
  passed = 'Correct',
}

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss'],
})
export class EquationComponent implements OnInit {
  number1!: number;
  number2!: number;
  answer: number | undefined | string;
  startTime!: number;
  endTime!: number;
  timeDiff: number[] = [];
  answerStatus: userAnswer | null = null;

  constructor() {}

  ngOnInit(): void {
    this.setRandomNumbers();
    this.startTime = new Date().getTime();
  }

  getRandomArbitrary(min: number = 0, max: number = 9) {
    return Math.round(Math.random() * (max - min) + min);
  }
  setRandomNumbers() {
    this.number1 = this.getRandomArbitrary();
    this.number2 = this.getRandomArbitrary();
  }

  handleSum(e: number | string | undefined) {
    if (!e) {
      this.answerStatus = null;
    } else if (Number(e) === this.number1 + this.number2) {
      this.answerStatus = userAnswer.passed;
      this.answer = '';
      this.calculateTime();
      this.setRandomNumbers();
    } else {
      this.answerStatus = userAnswer.failed;
    }
  }
  calculateTime() {
    this.endTime = new Date().getTime();
    const diff = this.endTime - this.startTime;
    this.timeDiff.push(diff / 1000);
    this.startTime = new Date().getTime();
  }
  calculateAvgTime() {
    if (this.timeDiff.length === 0) {
      return '0';
    }
    var timeSum = 0;
    for (var i = 0; i < this.timeDiff.length; i++) {
      timeSum += this.timeDiff[i];
    }
    return (timeSum / this.timeDiff.length).toFixed(1);
  }
}
