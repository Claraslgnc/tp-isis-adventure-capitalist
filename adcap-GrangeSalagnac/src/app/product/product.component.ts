import { Component, OnInit } from '@angular/core';
import { Product, World } from 'src/app/world';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';

declare var require;
const ProgressBar = require("progressbar.js");



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  server: string;

  progressbar: any;
  @ViewChild('bar') progressBarItem;
  constructor() { }

  ngOnInit() {
/*
    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement, { strokeWidth: 50, color:'#00ff00' });
    this.progressbar.animate(1, { duration: this.product.vitesse });
    this.progressbar.set(0); */

  }

  product: Product;

  @Input()
  set prod(value: Product) {
    this.product = value;
    console.log(this.product);
  }

  @Input()
    set serv(value: string) {
      this.server = value;
      console.log(this.server);
      }
  
/*
  startFabrication(progressbar: any){
    var bar = new ProgressBar.Line('#bar', {easing: 'easeInOut'});
    bar.animate(1);
  }*/

}


