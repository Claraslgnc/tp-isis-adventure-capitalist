import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier} from './world';

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

constructor(private service: RestserviceService) {
this.server = service.getServer();
service.getWorld().then(world => {
  console.log("juste avant getWorld");
  console.log(world);
  this.world = world;
  });
}

onProductionDone(p: Product){
  this.world.money += p.revenu * p.quantite;
  this.world.score += p.revenu * p.quantite;

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
    button.disabled = true
    this.world.products.product[manager.idcible-1].managerUnlocked = true
    this.world.managers.pallier[manager.idcible-1].unlocked = true
  }

}