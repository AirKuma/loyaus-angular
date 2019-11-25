import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private titleService: Title) {
      setTimeout(() => {
           this.titleService.setTitle("Loyaus 找不到此頁面！");
      });
   }

  ngOnInit() {
  }

}
