import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier} from './world';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adcap-GrangeSalagnac';

facteurMulti=[1,10,100];
multi: number=0;

qtmulti: any;
world: World = new World();
server: string;
toasterService: ToasterService;
New: string="";

constructor(private service: RestserviceService, toasterService: ToasterService) {
this.server = service.getServer();
this.toasterService=toasterService;
service.getWorld().then(world => {
  console.log("juste avant getWorld");
  console.log(world);
  this.world = world;
  });
this.notifyNew();
}

onProductionDone(p: Product){
  this.world.money += p.revenu * p.quantite;
  this.world.score += p.revenu * p.quantite;
  this.notifyNew();
}


onClickBuy(){
  if(this.multi == this.facteurMulti.length-1){
    this.multi=0;
  }
  else{
    this.multi+=1;
  }
}

  hireManager(manager:Pallier){
    let button = <HTMLInputElement> document.getElementById("hireButton-"+manager.idcible+"")
    if (this.world.score>=manager.seuil){
      button.disabled = true
      this.world.products.product[manager.idcible-1].managerUnlocked = true
      this.world.managers.pallier[manager.idcible-1].unlocked = true
      this.world.money-= manager.seuil;
      button.innerHTML="Already hired !";
      this.toasterService.pop('success', 'Manager hired ! ', manager.name);
      this.notifyNew();

    }
    else{
      button.disabled=false;
      //this.toasterService.pop('error', 'Reset failed ! ', reason.status)
    }
  }


  notifyNew(){
    this.New="";
    for (let manager of this.world.managers.pallier) {
      if (this.world.money >= manager.seuil && !manager.unlocked) {
        this.New = "NEW !";
      }
    }
  }

}