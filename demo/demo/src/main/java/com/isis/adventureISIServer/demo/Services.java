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
    
   
    
    World readWorldFromXml(String username){
        System.out.println("enter");
        File world_xml = new File("world_"+username+".xml");
        if(world_xml.exists()){
            System.out.println("enter exist");
            JAXBContext cont;
            try {
                cont = JAXBContext.newInstance(World.class);
                Unmarshaller u = cont.createUnmarshaller();
                World world = (World) u.unmarshal(world_xml);
                return world;

            } catch (JAXBException ex) {
                Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
                return null;
            }
        }else{
            System.out.println("enter not exist");//création du monde
            InputStream input = getClass().getClassLoader().getResourceAsStream("world.xml");
            JAXBContext cont = null;
            try {
                cont = JAXBContext.newInstance(World.class);
                Unmarshaller u = cont.createUnmarshaller();
                World world_base = (World) u.unmarshal(input);

                Marshaller m = cont.createMarshaller();
                m.marshal(world_base, new File("world_"+username+".xml"));
            } catch (JAXBException e) {
                e.printStackTrace();
            }

            JAXBContext cont2 = null;//retourne le monde que l'on a créé
            try {
                cont2 = JAXBContext.newInstance(World.class);
                Unmarshaller u2 = cont2.createUnmarshaller();
                World world = (World) u2.unmarshal(world_xml);
                return world;

            } catch (JAXBException ex) {
                Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
                return null;
            }

        }


    }
    
            
    void saveWorldToXml(World world,String username){
        try{
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Marshaller m = cont.createMarshaller();
            m.marshal(world, new File("world_"+username+".xml"));
        }catch (Exception e){

        }
}
    
    public World getWorld(String username){
        return readWorldFromXml(username);
    }
            
            
}
