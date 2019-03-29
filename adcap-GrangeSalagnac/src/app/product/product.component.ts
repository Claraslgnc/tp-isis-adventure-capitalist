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
  lastupdate: number;
  money: number;
  timeleft: number;
  product: Product;
  _qtmulti: number;

  @ViewChild('bar') progressBarItem;
  

  constructor() { }

  ngOnInit() {

    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement, {strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      color: '#f69594',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      from: {color: '#483D37'},
      to: {color: '#f69594'},
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }});

    setInterval(() => { this.calcScore(); }, 100);
    //this.progressbar.animate(1, { duration: this.product.vitesse });
    //this.progressbar.set(0.5);



  }
 

  


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

  @Output() 
  notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();

  startFabrication(progressbar: any, timeleft: any, lastupdate: any){
    this.progressbar.set(0);
    this.progressbar.animate(1, { duration: this.product.vitesse, easing: 'easeInOut' });
    this.product.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();
  }

  calcScore(): void {
    let now=Date.now();
    let elapseTime = now - this.lastupdate;
    this.lastupdate = now;
    if (this.product.timeleft != 0) {
      this.product.timeleft = this.product.timeleft - elapseTime;
      if (this.product.timeleft <= 0){
        console.log("fini");
        this.product.timeleft = 0;
        this.progressbar.set(0);
        //on prévient le parent que ce produit a généré son revenu.
        this.notifyProduction.emit(this.product);
      } 
    }
  }



  calcMaxCanBuy(): any{
    var x=this.product.cout;
    var c=this.product.croissance;
    var a = this.money;
    this.money = (Math.log((1/c)-( ( a*(1-c)/(x*c) ))))/Math.log(c);
    return this.money;
    
  }

 
  @Input()
 set qtmulti(value: number) {
    this._qtmulti = value;
    if (this._qtmulti && this.product){
      if(this.qtmulti == 1){
        //this. -= this.product.cout * this.product.croissance
      }
      else if (this.qtmulti == 10){
        //this.money -= this.product.cout * this.product.croissance
      }
      else if (this.qtmulti == 100){
        //this.money = 
      }
      else{
        //this.calcMaxCanBuy();
      }
    }
  } 



}
