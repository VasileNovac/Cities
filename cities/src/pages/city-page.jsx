import React, { Component, useState, useEffect } from 'react'
import '/src/app/globals.css'
import Navbar from "/src/app/components/navbar"
import Link from 'next/link'
//import { getStaticProps, getServerSideProps, getInitialProps } from 'next'
import {useRouter} from 'next/router' ;

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export function MyCity() {
  const { query: {id, name, latitude, longitude} } = useRouter() ;
  const props = {id, name, latitude, longitude} ;
  const [idx, setIdx] = useState(props.id);
  const [nume, setNume] = useState(props.name);
  const [lat, setLat] = useState(props.latitude);
  const [long, setLong] = useState(props.longitude);
  const [foto, setFoto] = useState("");

// adaugare in baza de date
  const handleSubmitAdd = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:3000/api/cities", {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({idx, nume, lat, long, foto}),
      });
      if (res.ok) {
        alert("City added to Favorit");
//        Router.push("/");
      } else {
        throw new Error("Failed to add City");
      }
      return res.json();
    } 
    catch (error) {
      console.log("Error loading Cities", error);
    }
  }
// stergere din baza de date
  const handleSubmitDel = async (e) => {
    e.preventDefault()
    const confirmed = confirm("Are you sure ?") ;
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/cities?idx=${idx}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert ("City deleted from Favorit");
      }
      else {
        alert ("City not deleted from Favorit");
      }
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitAdd}>
          <input type='hidden' value={props.id} />
          <input type='hidden' value={props.name} />
          <input type='hidden' value={props.latitude} />
          <input type='hidden' value={props.longitude} />
          <input type='hidden' value={foto} />
          <button type='submit'>Add Favorit</button>
        </form>
      </div>

      <div>
      <form onSubmit={handleSubmitDel}>
        <input type='hidden' value={props.id} />
        <input type='hidden' value={props.name} />
        <input type='hidden' value={props.latitude} />
        <input type='hidden' value={props.longitude} />
        <input type='hidden' value={foto} />
        <button type='submit'>Del Favorit</button>
      </form>
    </div>
  </div>
  )
}

export function CityFoto() {
  const [data, setData] = useState("");

  const { query: {name} } = useRouter() ;
  const props = {name} ;
  
  useEffect(() => {
    fetch('https://api.teleport.org/api/urban_areas/slug:'+props.name.trim().toLowerCase()+'/images/')
      .then( res => res.json() )
      .then( data => setData({
        foto: data.photos[0].image.web
      }))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <img src={data.foto}></img>
    </div>
  )
}

export function CityMeteo() {
  const [data, setData] = useState("");

  const { query: {name, latitude, longitude,} } = useRouter() ;
  const props = {name, latitude, longitude,} ;
  
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude='+props.latitude+'&longitude='+props.longitude+'&current=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,wind_speed_10m&forecast_days=1')
      .then( res => res.json() )
      .then( data => setData({
        dataOra: data.current.time,
        timeZone: data.timezone,
        temperatura: data.current.temperature_2m,
        unitTemperatura: data.current_units.temperature_2m,
        umiditate: data.current.relative_humidity_2m,
        unitUmiditate: data.current_units.relative_humidity_2m,
        precipitatie: data.current.precipitation,
        unitPrecipitatie: data.current_units.precipitation,
        presiune: data.current.surface_pressure,
        unitPresiune: data.current_units.surface_pressure,
        vitezaVant: data.current.wind_speed_10m,
        unitVitezaVant: data.current_units.wind_speed_10m
      }))
      .catch(error => console.error('Error fetching data:', error));
    }, []);

  return (
    <div>
      <table>
        <caption>Informatii METEO</caption>
        <tr>
          <th>Data si Ora </th>
          <th>Temperatura [{data.unitTemperatura}]</th>
          <th>Umiditate [{data.unitUmiditate}]</th>
          <th>Precipitatii [{data.unitPrecipitatie}]</th>
          <th>Presiune [{data.unitPresiune}]</th>
          <th>Viteza vant [{data.unitVitezaVant}]</th>
        </tr>
        <tr>
          <td>{data.dataOra} {data.timeZone}</td>
          <td>{data.temperatura}</td>
          <td>{data.umiditate}</td>
          <td>{data.precipitatie}</td>
          <td>{data.presiune}</td>
          <td>{data.vitezaVant}</td>
        </tr>
      </table>
    </div>
  )
}

export function CityAfis() {
  const { query: {id, name, country, country_code, latitude, longitude, admin1, admin2, timezone} } = useRouter() ;
  const props = {id, name, country, country_code, latitude, longitude, admin1, admin2, timezone} ;

  return (
    <div>
      <table>
        <caption>Informatii GEOGRAFICE</caption>
        <tr>
          <th>Denumire</th>
          <th>Tara</th>
          <th>Cod tara</th>
          <th>Latitudine</th>
          <th>Longitudine</th>
          <th>Zona</th>
          <th>Zona</th>
          <th>Ora locala</th>
        </tr>
        <tr>
          <td>{props.name}</td>
          <td>{props.country}</td>
          <td>{props.country_code}</td>
          <td>{props.latitude}</td>
          <td>{props.longitude}</td>
          <td>{props.admin1}</td>
          <td>{props.admin2}</td>
          <td>{props.timezone}</td>
        </tr>
      </table>
    </div>
  )
}

export default function CityPage() {

  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <Header title="Display city page" />
    </div>

    <CityFoto />
    <CityAfis />
    <CityMeteo />

    <MyCity />
    <Navbar />
    
  </main>
  );
}