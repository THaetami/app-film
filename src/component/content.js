import './head.js'
import { genres, tahun } from '../data/data-source'
class ContenComponent extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  /**
     * @param {any} event
     */
  // eslint-disable-next-line accessor-pairs
  set clickEvent (event) {
    this._clickEvent = event
    this.render()
  }

  /**
     * @param {any} event
     */
  // eslint-disable-next-line accessor-pairs
  set changeEvent (event) {
    this._changeEvent = event
    this.render()
  }

  /**
     * @param {any} event
     */
  // eslint-disable-next-line accessor-pairs
  set changeGenreEvent (event) {
    this._changeGenreEvent = event
    this.render()
  }

  get value () {
    return this.querySelector('#year').value
  }

  get genre () {
    return this.querySelector('#genre').value
  }

  render () {
    this.innerHTML = `
        <style>
        </style>
        <div id="content">
            <head-component></head-component>
            <div class="container text-white">
                <div id="navi" class="row">
                    <div class="col d-none d-md-flex align-items-center">
                        <small>powered by themoviedb.org</small>
                    </div>
                
                    <div class="col col-md-3 d-flex">
                        <div class="me-2">
                            <label htmlFor="year" class="form-label">Year</label>
                            <select id="year" class="pointer form-select" value='year'>
                                                
                            </select>
                        </div>
                        <div>
                            <label htmlFor="genre" class="pointer form-label">Genre</label>
                            <select id="genre" class="form-select" value='genre'>
                                
                            </select>
                        </div>
                    </div>
                    <h2 class="py-4 text-black text-center">
                        Best Movie
                    </h2>
                </div>
                <div id="film" class="row"></div>
                <div id="load" class="mb-5 mt-0 row">
                    <div class="col text-center">
                        <button class="btn btn-dark mt-0" id="btnLoad">
                            Load More...
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
        
    `

    const yearElement = document.querySelector('#year')
    tahun.forEach(thn => {
      yearElement.innerHTML += `
            <option value='${thn}'>${thn}</option>
        `
    })

    const genretElement = document.querySelector('#genre')
    genres.forEach(genre => {
      genretElement.innerHTML += `
            <option class="option" value='${genre.id}'>${genre.name}</option>
        `
    })

    const btnLoader = document.querySelector('#btnLoad')
    btnLoader.addEventListener('click', this._clickEvent)
    yearElement.addEventListener('change', this._changeEvent)
    genretElement.addEventListener('change', this._changeGenreEvent)
  }
}

customElements.define('conten-component', ContenComponent)
