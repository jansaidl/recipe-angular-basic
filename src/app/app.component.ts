import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import {
  filter,
  catchError,
  share
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface Quote {
  quote: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  quote: string;

  constructor(private _httpClient: HttpClient) {}

  ngOnInit() {
    this._httpClient
      .post<Quote>(
        `${environment.apiUrl}/quotes`,
        {
          quote: 'Zerops has beautiful user interface :)'
        }
      )
      .pipe(
        catchError(() => EMPTY),
        filter((d) => !!d),
        share()
      ).subscribe((d) => this.quote = d.quote);
  }

}
