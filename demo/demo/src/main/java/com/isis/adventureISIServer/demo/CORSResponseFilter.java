/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isis.adventureISIServer.demo;

import java.io.IOException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author csalagna
 */
@Provider
public class CORSResponseFilter implements ContainerResponseFilter {
    public void filter(ContainerRequestContext requestContext,ContainerResponseContext responseContext)
                throws IOException {
        System.out.println("filter");
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, DELETE,PUT, OPTIONS");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "X-Requested-With,Content-Type, X-Codingpedia, authorization,X-User");
    }
}
