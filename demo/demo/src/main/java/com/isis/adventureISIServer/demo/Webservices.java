/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isis.adventureISIServer.demo;

import com.google.gson.Gson;
import generated.ProductType;
import generated.World;
import org.springframework.http.HttpRequest;

import javax.ws.rs.*;
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
    public Response getWorld() {
        return Response.ok(services.getWorld()).build();
    }

    @PUT
    @Path("product")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Response setProduct(String produit) {
        ProductType product = new Gson().fromJson(produit,ProductType.class);
        World w = services.getWorld();
        ProductType productToUpdate = w.getProducts().getProduct().get(product.getId()-1);
        if(product.getQuantite()-productToUpdate.getQuantite()>0){
            //Achat produit
        }else{
            w.setMoney(w.getMoney()+product.getQuantite()*productToUpdate.getRevenu());
        }
        services.saveWorldToXml(w);
        return Response.ok().build();
    }
    
}
