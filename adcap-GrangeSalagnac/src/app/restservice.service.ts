import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { World, Pallier, Product } from './world';



@Injectable({
  providedIn: 'root'
})
export class RestserviceService {
    server = "http://localhost:8080/"
    application = "adventureisis/"
    user = "";
  
    constructor(private http: HttpClient) {
     }
    
     getUser(): string {
       return this.user;
     }

     setUser(user){
       this.user = user;

     }

    getServer(): string {
      return this.server;
    }

    setServer(server){
      this.server = server;

    }


     private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
      }
      getWorld(): Promise<World> {
      return this.http.get(this.server + this.application + "generic/world")
      .toPromise().then(response =>response).catch(this.handleError);
      };

   
}
