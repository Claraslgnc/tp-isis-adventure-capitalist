/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isis.adventureISIServer.demo;

import generated.World;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

/**
 *
 * @author csalagna
 */
public class Services {
    
   
    
    World readWorldFromXml(){
        InputStream input = getClass().getClassLoader().getResourceAsStream("world.xml");
        
         JAXBContext cont;
        try {
            
            cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            World world = (World) u.unmarshal(input);
            return world;
            
        } catch (JAXBException ex) {
            Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
        }
       return null;
    }
    
            
    void saveWorldToXml(World world){
        
        JAXBContext cont = null;
        try {
            cont = JAXBContext.newInstance(World.class);
            OutputStream output = new FileOutputStream("world.xml");
            Marshaller m=cont.createMarshaller();
            m.marshal(world, output);
            
        } catch (FileNotFoundException ex) {
            Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JAXBException ex) {
            Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    
    public World getWorld(){
        return readWorldFromXml();
    }
            
            
}
