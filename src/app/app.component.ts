import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Hello World!!';

  setTitle() {
    new Promise((resolve, reject) => {
      resolve('New Title')
    }).then((str: string) => {
      this.title = str;
    });
  }
}
