import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
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
export class ProductComponent implements OnInit, OnChanges {
  
  server: string;
  progressbar: any;
  lastupdate: number;
  _money: number;
  timeleft: number;
  product: Product;
  _qtmulti: string;
  prixp: number;
  rate: string;
  coutActuel: number;
  revenu: number;
  //var timeleftS=Math.floor(this.product.timeleft/60000) % 60;
  //timeleftS=Math.floor(this.product.timeleft/60000) % 60;
  
  @ViewChild('bar') progressBarItem;
  

  constructor() {}

  ngOnInit() {

    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement, {
      strokeWidth: 4,
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

    setInterval(() => { this.calcScore()}, 100);
    this.revenu=this.product.revenu;
    this.coutActuel=this.product.cout;

    //this.progressbar.animate(1, { duration: this.product.vitesse });
    //this.progressbar.set(0.5);
    
    }
 
  ngOnChanges(changes: SimpleChanges): void{
    if(changes._qtmulti){
      if(this._qtmulti=="Max"){
        this.rate=this.calcMaxCanBuy().toString();
      }
      else{
        //this.rate=changes._qtmulti.currentValue;
      }
    }
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

  @Input()
  set money(value: number) {
    this._money = value;
    //console.log("argentinitiale"+ value);
    if(this._money && this.product){
      //this.calcMaxCanBuy();
      this.calcCout();
    }
    }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyAchat: EventEmitter<number> = new EventEmitter<number>();

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
        if(this.product.managerUnlocked){
          this.startFabrication(this.progressbar,this.timeleft,this.lastupdate)
        }
      } 
    }else if(this.product.managerUnlocked && this.product.timeleft == 0){
      this.startFabrication(this.progressbar,this.timeleft,this.lastupdate)
    }
  }



  calcMaxCanBuy(){//calcule la quantité max que peut acheter le joueur. 
    var q=this.product.croissance;
    var c=this.product.cout;
    var s=this._money;
    //console.log("money"+ this._money);
    const qtmax=(Math.log(1- ( (s* (1-q) ) / c ))) / Math.log(q);
    //console.log("qtmax"+ qtmax);
    return Math.trunc(qtmax);
  }

  
  @Input()
 set qtmulti(value: string) {
    this._qtmulti = value;
    this.calcCout();
  }

  acheter(){
    if(this._money > this.product.cout){
      var cost=this.product.cout*(((1-Math.pow(this.product.croissance,parseInt(this.rate)))/(1-this.product.croissance)));
      console.log("cout"+cost );
      this.product.quantite+=parseInt(this.rate);
      this.notifyAchat.emit(cost);
      //this.revenu=this.revenu*this.product.quantite;
      this.product.cout=this.product.cout*(Math.pow(this.product.croissance,this.product.quantite));
  }}
  
  calcCout(){
    var ct=this.product.cout;
    var cr=this.product.croissance;
    var coutP = 0;

    if(this._qtmulti == "Max"){
      coutP= ct*(((1-Math.pow(cr,this.calcMaxCanBuy())))/(1-cr));
      this.coutActuel=coutP;
      //console.log("calc" + this.calcMaxCanBuy());
      this.rate=this.calcMaxCanBuy().toString();
    }
    if (this._qtmulti == "x1"){
      coutP= ct*(((1-Math.pow(cr,1)))/(1-cr));
      this.coutActuel=coutP;
      this.rate = "1";
    }
    if (this._qtmulti == "x10"){
      coutP= ct*(((1-Math.pow(cr,10)))/(1-cr));
      this.coutActuel=coutP;
      this.rate = "10";
    }
    if (this._qtmulti == "x100"){
      coutP= ct*(((1-Math.pow(cr,100)))/(1-cr));
      this.coutActuel=coutP;
      this.rate = "100";
    }
  }
}

