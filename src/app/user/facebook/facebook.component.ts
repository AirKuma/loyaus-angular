import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  constructor(private titleService: Title) {
      setTimeout(() => {
           this.titleService.setTitle("Loyaus 社群設置");
      });
   }

  ngOnInit() {
  }

}
