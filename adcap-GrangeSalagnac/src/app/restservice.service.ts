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
      let httpOptions = {
        headers: new HttpHeaders(
          {'X-User':localStorage.getItem("username")}
        )
      }

      return this.http.get(this.server + this.application + "generic/world",httpOptions)
      .toPromise().then(response =>response).catch(this.handleError);
    };

    sendProductDone(p:Product){
      let httpOptions = {
        headers: new HttpHeaders(
          {'X-User':localStorage.getItem("username")}
        )
      }
      return this.http.put(this.server + this.application + "generic/product",p,httpOptions)
      .toPromise().then(response =>response).catch(this.handleError);
    }

    sendManagerHire(manager:Pallier){
      let httpOptions = {
        headers: new HttpHeaders(
          {'X-User':localStorage.getItem("username")}
        )
      }
      return this.http.put(this.server + this.application + "generic/manager",manager,httpOptions)
      .toPromise().then(response =>response).catch(this.handleError);
    }

    private setHeaders(user : string) : Headers { 
      var headers = new Headers(); 
      headers.append("X-User",user);
      return headers;
    }

  

   
}
