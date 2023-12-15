import React, { Component, useState, useEffect } from 'react' ;
import '/src/app/globals.css' ;
import Navbar from "/src/app/components/navbar" ;
import CityFoto from "/src/app/components/cityFoto" ;
import CityMeteo from "/src/app/components/cityMeteo" ;
import CityGeo from   "/src/app/components/cityGeo" ;
import Link from 'next/link' ;
//import { getStaticProps, getServerSideProps, getInitialProps } from 'next' ;
import {useRouter} from 'next/router' ;

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export function CityFotoF() {
  const { query: {name} } = useRouter() ;
  const props = {name} ;
  const image = CityFoto(props.name);
  
  return (
    <div className="poza">
      <img src={image} alt="Nu exista imagine"></img>
    </div>
  )
}

export function CityGeoF() {
  const { query: {id} } = useRouter() ;
  const props = {id} ;
  const geo = CityGeo(props.id);

  return (
    <div>
      <table>
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

export function CityMeteoF() {
  const { query: {id, name, latitude, longitude} } = useRouter() ;
  const props = {id, name, latitude, longitude} ;
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

export function MyCityF() {
  const { query: {id, name, latitude, longitude, sfoto, fnota, fcomm} } = useRouter() ;
  const props = {id, name, latitude, longitude, sfoto, fnota, fcomm} ;
  const [idx, setIdx] = useState(props.id);
  const [nume, setNume] = useState(props.name);
  const [lat, setLat] = useState(props.latitude);
  const [long, setLong] = useState(props.longitude);
  const [foto, setFoto] = useState(props.sfoto);
  const [nota, setNota] = useState(props.fnota);
  const [comm, setComm] = useState(props.fcomm);
  const [newNume, setNewNume] = useState(props.name);
  const [newLat, setNewLat] = useState(props.latitude);
  const [newLong, setNewLong] = useState(props.longitude);
  const [newFoto, setNewFoto] = useState(props.sfoto);
  const [newNota, setNewNota] = useState(props.fnota);
  const [newComm, setNewComm] = useState(props.fcomm);

  const handleChange = (e) => {
    e.preventDefault() ;
  }

// modificare in baza de date
  const handleSubmitUpd = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:3000/api/cities?idx=${idx}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({newNume, newLat, newLong, newFoto, newNota, newComm}),
      });
      if (res.ok) {
        alert("City UpDated to Favorit");
//        router.refresh();
//        router.push("/");
      } else {
        throw new Error("Failed to UpDate City");
      }
//      return res.json();
    } 
    catch (error) {
      console.log("Error loading City", error);
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

  const handleNota = (e) => {
    e.preventDefault()
    alert("Nota si Comentariu au fost validate");
  }

  return (
    <div>
      <div className="poza">
        <form onSubmit={handleNota}>
          <div>
              <textarea className="inline" id="xcom" placeholder="Comentariu" name="comm" maxLength="100" required onChange={(e) => setNewComm(e.target.value)} defaultValue={props.fcomm} />
              <label htmlFor="xcom"> &#129094; Comentariu ( maxim 100 caractere )</label>
          </div>
          <div>
            <div className="flex justify-between gap-5 items-start">
              <div className="nota">
                <input type="radio" className="inline" id="r1" name="nota" value="1" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "1"} />
                <label htmlFor="r1">&#129094; Nota 1 ; </label>
                <input type="radio" className="inline" id="r2" name="nota" value="2" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "2"} />
                <label htmlFor="r2">&#129094; Nota 2 ; </label>
                <input type="radio" className="inline" id="r3" name="nota" value="3" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "3"} />
                <label htmlFor="r3">&#129094; Nota 3 ; </label>
                <input type="radio" className="inline" id="r4" name="nota" value="4" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "4"} />
                <label htmlFor="r4">&#129094; Nota 4 ; </label>
                <input type="radio" className="inline" id="r5" name="nota" value="5" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "5"} />
                <label htmlFor="r5">&#129094; Nota 5 ; </label>
              </div>
              <div className="flex">
                <input type="submit" value="Votează nota" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>
        <form onSubmit={handleSubmitUpd}>
          <input type='hidden' onChange={handleChange} value={props.id} />
          <button type='submit'>Update Favorit</button>
        </form>
      </div>

      <div>
        <form onSubmit={handleSubmitDel}>
          <input type='hidden' onChange={handleChange} value={props.id} />
          <button type='submit'>Del Favorit</button>
        </form>
      </div>
    </div>
  )
}

export default function CityPageF() {
  
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <Header title="Display favorit city page" />
    </div>
 
    <CityFotoF />
    <CityGeoF />
    <CityMeteoF />
    <MyCityF />
    <Navbar />
  </main>
  );
}