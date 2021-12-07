import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import {
  filter,
  catchError,
  share
} from 'rxjs/operators';

interface Quote {
  quote: string;
  createdAt: string;
  created_at: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  quote: Quote;

  constructor(private _httpClient: HttpClient) {}

  ngOnInit() {
    const regex = /^(https:\/\/)app-([^-.]+)([^\/]*).*$/gm;
    const subst = `$1api-$2-1337$3`;
    const url = window.location.href;
    const apiUrl = url.replace(regex, subst);
    this._httpClient
      .post<Quote>(
        `${apiUrl}/quotes`,
        {
          quote: '„New features incoming to Zerops soon“'
        }
      )
      .pipe(
        catchError(() => EMPTY),
        filter((d) => !!d),
        share()
      ).subscribe((d) => this.quote = d);
  }

}
