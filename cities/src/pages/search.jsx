import React, { Component, useState, useEffect } from 'react'
import '/src/app/globals.css'
import Link from 'next/link'
import Navbar from "/src/components/navbar"

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

class MySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: '',
      items: [],
      pageCity: []
    };
    this.handleChange = this.handleChange.bind(this);
//    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value.trim()
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

    await fetch('https://geocoding-api.open-meteo.com/v1/search?name='+this.state.input+'&count=10&language=en&format=json')
      .then(res => res.json())
      .then(data => 
        this.setState({   
//          pageCity: data.results[0].name,
          items: data.results.map((x, index) => 
            <table>
              <tr>
                <td><Link href={{pathname: '/city-page', query: data.results[index]}}> {x.name} </Link></td>
                <td>{x.country}</td>
                <td>{x.country_code}</td>
                <td>{x.admin1}</td>
                <td>{x.admin2}</td>
              </tr>
            </table>
        )})
      )
      .catch(error => console.error('Error fetching data:', error));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFetch}>
          <input
            type="text"
            name="search"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button type='submit'>Search</button>
        </form>
{/*
        <p>{JSON.stringify(this.state.items)}</p>
*/}
        <div>{this.state.items}</div>
      </div>
    );
  }
}

export default function Search() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
  
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <Header title="Search city" />
    </div>

    <MySearch />
    <Navbar />
  </main>
  )
}