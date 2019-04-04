/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isis.adventureISIServer.demo;

import com.google.gson.Gson;
import generated.PallierType;
import generated.ProductType;
import generated.World;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpRequest;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
/**
 *
 * @author csalagna
 */
@Path("generic")

public class Webservices {
    Services services;
    public Webservices() {
        services = new Services();
    }
    @GET
    @Path("world")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response getXml(@Context HttpServletRequest request) {
        String username=request.getHeader("X-user");
        System.out.println(username);
        return Response.ok(services.getWorld(username)).build();
    }

    @PUT
    @Path("product")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response setProduct(@Context HttpServletRequest request,String produit) {
        ProductType product = new Gson().fromJson(produit,ProductType.class);
        World w = services.getWorld(request.getHeader("X-user"));
        
        ProductType productToUpdate = w.getProducts().getProduct().get(product.getId()-1);
        if(product.getQuantite()-productToUpdate.getQuantite()>0){
            //Achat produit
        }else{
            w.setMoney(w.getMoney()+product.getQuantite()*productToUpdate.getRevenu());
        }
        services.saveWorldToXml(w,request.getHeader("X-user"));
        return Response.ok().build();
    }
    
    @PUT
    @Path("manager")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response setManager(@Context HttpServletRequest request,String manager) {
        PallierType man = new Gson().fromJson(manager,PallierType.class);
        World w = services.getWorld(request.getHeader("X-user"));
        
        PallierType manToUpdate = w.getManagers().getPallier().get(man.getIdcible()-1);
        ProductType productToUpdate = w.getProducts().getProduct().get(man.getIdcible()-1);
        if(!man.isUnlocked()){
//            if(productToUpdate.getTimeleft()!=0 && productToUpdate.getTimeleft()<w.getLastupdate()){
//                w.setMoney(w.getMoney()+productToUpdate.getQuantite()*productToUpdate.getRevenu());
//            }
//            else{
//                productToUpdate.setTimeleft((w.getLastupdate()-productToUpdate.getTimeleft())/productToUpdate.getVitesse());
//                System.out.println(productToUpdate.getTimeleft());
//            }
        }else{
            
            manToUpdate.setUnlocked(true);
            productToUpdate.setManagerUnlocked(true);
            w.setMoney((w.getMoney()-manToUpdate.getSeuil()));
            //productToUpdate.setTimeleft(w.getLastupdate()-productToUpdate.getTimeleft());
            
//            if(manToUpdate.getSeuil()>w.getMoney()){
//                w.setMoney(0);
//            }
//            else{
//                manToUpdate.setUnlocked(true);
//                productToUpdate.setManagerUnlocked(true);
//                w.setMoney((w.getMoney()-manToUpdate.getSeuil()));
//                //productToUpdate.setTimeleft(w.getLastupdate()-productToUpdate.getTimeleft());
//            }
           
        }
        services.saveWorldToXml(w,request.getHeader("X-user"));
        return Response.ok().build();
    }
    
    
    
}
