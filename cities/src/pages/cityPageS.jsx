import React, { Component, useState, useEffect } from 'react' ;
import '/src/app/globals.css' ;
import Navbar from "@/components/navbar" ;
import CityFoto from "@/components/cityFoto" ;
import CityMeteo from "@/components/cityMeteo" ;
import CityGeo from   "@/components/cityGeo" ;
import {useRouter} from 'next/router' ;

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export function CityFotoS() {
  const { query: {name} } = useRouter() ;
  const props = {name} ;
  const image = CityFoto(props.name);

  return (
    <div className="poza">
      <img src={image} alt="Nu exista imagine"></img>
    </div>
  )
}

export function CityGeoS() {
  const { query: {id} } = useRouter() ;
  const props = {id} ;
  const geo = CityGeo(props.id);

  return (
    <div>
      <table>
        <caption>Informatii GEOGRAFICE</caption>
        <tbody>
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
            <td>{geo.name}</td>
            <td>{geo.country}</td>
            <td>{geo.country_code}</td>
            <td>{geo.latitude}</td>
            <td>{geo.longitude}</td>
            <td>{geo.admin1}</td>
            <td>{geo.admin2}</td>
            <td>{geo.timezone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function CityMeteoS() {
  const { query: {name, latitude, longitude,} } = useRouter() ;
  const props = {name, latitude, longitude,} ;
  const meteo = CityMeteo(props.latitude, props.longitude);

  return (
    <div>
      <table>
        <caption>Informatii METEO</caption>
        <tbody>
          <tr>
            <th>Data si Ora </th>
            <th>Temperatura [{meteo.unitTemperatura}]</th>
            <th>Umiditate [{meteo.unitUmiditate}]</th>
            <th>Precipitatii [{meteo.unitPrecipitatie}]</th>
            <th>Presiune [{meteo.unitPresiune}]</th>
            <th>Viteza vant [{meteo.unitVitezaVant}]</th>
          </tr>
          <tr>
            <td>{meteo.dataOra} {meteo.timeZone}</td>
            <td>{meteo.temperatura}</td>
            <td>{meteo.umiditate}</td>
            <td>{meteo.precipitatie}</td>
            <td>{meteo.presiune}</td>
            <td>{meteo.vitezaVant}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function MyCityS() {
  const { query: {id, name, latitude, longitude, sfoto} } = useRouter() ;
  const props = {id, name, latitude, longitude, sfoto} ;
  const [idx, setIdx] = useState(props.id);
  const [nume, setNume] = useState(props.name);
  const [lat, setLat] = useState(props.latitude);
  const [long, setLong] = useState(props.longitude);
  const [foto, setFoto] = useState(props.sfoto);
  const [nota, setNota] = useState("");
  const [comm, setComm] = useState("");

  const handleChange = (e) => {
    e.preventDefault() ;
  }

  // adaugare in baza de date
  const handleSubmitAdd = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/cities`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({idx, nume, lat, long, foto, nota, comm}),
      });
      if (res.ok) {
        alert("City added to Favorit");
//        Router.push("/");
      } else {
        throw new Error("Failed to add City");
      }
//      return res.json();
    } 
    catch (error) {
      console.log("Error loading Cities", error);
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitAdd}>
          <input type='hidden' onChange={handleChange} value={props.id} />
          <input type='hidden' onChange={handleChange} value={props.name} />
          <input type='hidden' onChange={handleChange} value={props.latitude} />
          <input type='hidden' onChange={handleChange} value={props.longitude} />
          <input type='hidden' onChange={handleChange} value={props.sfoto} />
          <input type='hidden' onChange={handleChange} value=" " />
          <input type='hidden' onChange={handleChange} value=" " />
          <button type='submit'>Add Favorit</button>
        </form>
      </div>
    </div>
  )
}

export default function CityPageS() {

  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <Header title="Display city page" />
    </div>

    <CityFotoS />
    <CityGeoS />
    <CityMeteoS />
    <MyCityS />
    <Navbar />
  </main>
  );
}