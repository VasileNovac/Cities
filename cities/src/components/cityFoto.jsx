import React, { Component, useState, useEffect } from 'react' ;
import '/src/app/globals.css' ;

export default function CityFoto(nameCity) {
  const [data, setData] = useState("");
    
  useEffect( () => {
    fetch(`https://api.teleport.org/api/urban_areas/slug:${nameCity.trim().toLowerCase()}/images/`)
      .then( res => res.json() )
      .then( data => setData({
        foto: data.photos[0].image.web
      }))
      .catch(error => console.error('Error fetching CityFoto: ', error));
  }, []);
  
  return ( data.foto )
}
  