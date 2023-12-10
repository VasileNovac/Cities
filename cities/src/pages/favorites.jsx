import React, { Component, useState, useEffect } from 'react' ;
import '/src/app/globals.css' ;
import Navbar from "/src/app/components/navbar" ;
import Link from 'next/link' ;

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

class MySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      items: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

/*
  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      submit: this.state.input
    });
  }
*/
  async handleFetch(e)  {
    e.preventDefault()
    this.setState({
      submit: this.state.input
    })
    await fetch('http://localhost:3000/api/cities')
      .then(res => res.json())
      .then(data => 
        this.setState({
        items: data.cities.map((x, index) => 
          <div key={x.idx} className="poza">
            <img src={x.foto}></img>
            <p>{x.nume}
            <span> - </span>
            <span><Link href={{pathname: '/cityPageF', query: {id: x.idx, name: x.nume, latitude: x.lat, longitude: x.long} }}>Read more...</Link></span>
            </p>
          </div>
        )
        })
      )
      .catch(error => console.error('Error fetching data:', error));      
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFetch}>
          <input
            type="hidden"
            name="search"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button type='submit'>Click for Select</button>
        </form>
        <div>{this.state.items}</div>
      </div>
    );
  }
}

export default function Search() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
  
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <Header title="Select favorit city from DB" />
    </div>

    <MySearch />
    <Navbar />
  </main>
  )
}