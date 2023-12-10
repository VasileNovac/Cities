import '/src/app/globals.css' ;
import Link from 'next/link' ;

const getFavorit = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/cities", {
      cache: "no-store",
    });
    if(!res.ok) {
      throw new Error ("Failed to fetch Cities");
    }
    return res.json();
  }
  catch (error) {
    console.log("Error loading Cities: ", error)
  }
}

export default async function FavoritList() {
  const {cities} = await getFavorit();

  return (
    <div>
      {cities.map((x, index) => (
        <div key={x.idx} className="poza">
          <img src={x.foto}></img>
          <p>{x.nume}
{/*
            <span> - </span>
            <span><Link href={{pathname: '/cityPageF', query: {id: x.idx, name: x.nume, latitude: x.lat, longitude: x.long} }}>Read more...</Link></span>
*/}
          </p>
        </div>
      ))}
    </div>
  );
}