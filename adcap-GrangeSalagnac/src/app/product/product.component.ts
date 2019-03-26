import { Component, OnInit } from '@angular/core';
import { Product, World } from 'src/app/world';
import { Input, Output, EventEmitter } from '@angular/core';
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
  tpsr: any;
  timeleft: any;

  @ViewChild('bar') progressBarItem;
  lastupdate: any;
  constructor() { }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();

  ngOnInit() {

    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement, {strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      color: '#f69594',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      from: {color: '#FFEA82'},
      to: {color: '#f69594'},
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }});

    setInterval(() => { this.calcScore(this.progressbar, this.timeleft, this.lastupdate, this.tpsr); }, 100);
    //this.progressbar.animate(1, { duration: this.product.vitesse });
    //this.progressbar.set(0.5);



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
  

  startFabrication(progressbar: any, timeleft: any, lastupdate: any){
    this.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();
    this.progressbar.animate(1, { duration: this.product.vitesse });
  }

  calcScore(progressbar: any, timeleft: any, lastupdate: any, tpsr: any){
    
    if (this.timeleft != 0) {
      tpsr = (Date.now() - this.lastupdate)
      timeleft = timeleft - tpsr;

      if (this.timeleft = 0){
        this.progressbar.set(0)
      }
      if(this.timeleft<0){
        // on prévient le composant parent que ce produit a généré son revenu.
        this.notifyProduction.emit(this.product);
        this.progressbar.set(0)
      }
    }
  }

}


