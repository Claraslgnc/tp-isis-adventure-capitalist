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
  _qtmulti: string;
  prixp: number;
  cout: any;

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

    setInterval(() => { this.calcScore(); this.calcQuantite()}, 100);
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

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyAchat: EventEmitter<Product> = new EventEmitter<Product>();

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



  calcMaxCanBuy(): any{//calcule la quantité max que peut acheter le joueur. 
    var x=this.product.cout;
    var c=this.product.croissance;
    var coutP = 0;
    if(this._qtmulti == "Max"){
      var quantite=0;
      while(coutP < this.money){
        coutP = coutP + x*(Math.pow(c,quantite+1))
        quantite+=1
      }
      return [quantite, coutP];
    //var quantite = (Math.log((1/c)-( ( a*(1-c)/(x*c) ))))/Math.log(c);
    }
    else if (this._qtmulti == "x1"){
      coutP=x*c;
      return [this._qtmulti, coutP];
    }
    else if (this._qtmulti == "x10"){
      coutP= x*((c*(1-Math.pow(c,10)))/(1-c));
      return [this._qtmulti,coutP];
    }
    else{
      coutP= x*((c*(1-Math.pow(c,100)))/(1-c));
      return [this._qtmulti,coutP];
    }
    }    
  
  calcQuantite(){
    this._qtmulti = this.calcMaxCanBuy()[0];
    this.cout=this.calcMaxCanBuy()[1];
  }

 
  @Input()
 set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product){
      this._qtmulti=this.calcMaxCanBuy()[0];
      this.cout=this.calcMaxCanBuy()[1];


      /* if(this.qtmulti == "x1"){
        this.money -= this.product.cout * this.product.croissance
      }
      else if (this.qtmulti == "x10"){
        this.money -= 10*(this.product.cout * this.product.croissance)
      }
      else if (this.qtmulti == "x100"){
        this.money = 100*(this.product.cout * this.product.croissance)
      }
      else if (this.qtmulti == "Max"){
        //this.money = 
      }
      else{
        //this.calcMaxCanBuy();
      } */
    }
  }

  acheter(){
    var qte=this.calcMaxCanBuy()[0];
    this.product.quantite+=qte;
    this.notifyAchat.emit(this.cout);
  }
  
  



}

