import imgPlacholder from '../img/img-placeholder.png'
import { genres } from '../data/data-source'
import '../component/content.js'
import '../component/sidebar.js'

function main () {
  const contentElemet = document.querySelector('conten-component')
  const cartFilmElement = document.querySelector('#daftar')

  let page = 0
  let year = new Date().getFullYear()
  let genreId = ''

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTFmNzc0MTUzYmIxZmUxNGNhNDlkMWU5MzdlOTUzOSIsIm5iZiI6MTcyMDIyMDU3Ny4zOTQxODIsInN1YiI6IjY2ODg3ODc2ZWI4ZTBjYWY4ZmUwMDVjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NLUb7dLRDp4R05aZ2qpqTVyJzgwYK5OSMf20_RwqYR4'
    }
  }

  let url = 'https://api.themoviedb.org/3/discover/movie'
  url += '?certification=US'
  url += '&certification.lte=PG-12'
  url += '&language=en-US'

  const getBook = async () => {
    try {
      page++
      const response = await fetch(`${url}&page=${page}&primary_release_year=${year}&sort_by=popularity.desc&with_genres=${genreId}`, options)
      const responseJson = await response.json()
      if (responseJson.error) {
        showResponseMessage(responseJson.message)
      } else {
        renderAllFilms(responseJson.results)
      }
    } catch (error) {
      showResponseMessage(error)
    }
  }

  const updateCartFilm = () => {
    if (localStorage.getItem('film')) {
      const cartfilm = JSON.parse(localStorage.getItem('film'))
      cartfilm.forEach(film => {
        const filmObj = JSON.parse(film)
        cartFilmElement.innerHTML += `
          <li><a class="pointer">${filmObj.dataArr[1]}, Tahun: ${filmObj.dataArr[2]}</li>
        `
      })
    } else {
      cartFilmElement.innerHTML += `
          <li><a class="pointer">Belum Ada Film</a></li>
        `
    }
  }

  const emptyButton = () => {
    const emptyElement = document.querySelector('#empty')
    emptyElement.innerHTML += `
      <a class="header components pointer ms-3 text-white bg-pink">Hapus Daftar Film</a>
    `
    emptyElement.addEventListener('click', emptyCartFilm)
  }

  const emptyCartFilm = () => {
    if (localStorage.getItem('film')) {
      localStorage.removeItem('film')
      cartFilmElement.innerHTML = ''
      updateCartFilm()
    }
  }

  const handleLoadMoreClick = () => {
    console.log(page)
    getBook()
  }

  const changedYear = () => {
    const filmElementList = document.querySelector('#film')
    filmElementList.innerHTML = ''

    year = contentElemet.value
    page = 0
    getBook()
  }

  const changedGenre = () => {
    const filmElementList = document.querySelector('#film')
    filmElementList.innerHTML = ''

    genreId = contentElemet.genre
    page = 0
    getBook()
  }

  const saveChange = (e) => {
    if (e.target.nodeName === 'SPAN') {
      const data = e.target.getAttribute('value')
      const dataArr = data.split(',')
      const dataObj = { dataArr }
      const stringObj = JSON.stringify(dataObj)
      let cart = []
      let stringCart = ''

      if (!localStorage.getItem('film')) {
        cart.push(stringObj)
        stringCart = JSON.stringify(cart)
        localStorage.setItem('film', stringCart)
      } else {
        cart = JSON.parse(localStorage.getItem('film'))
        const isExist = cart.some(film => JSON.parse(film).dataArr[0] === dataArr[0])
        if (!isExist) {
          cart.push(stringObj)
          localStorage.setItem('film', JSON.stringify(cart))
          showResponseMessage('Film berhasil ditambahkan.')
        } else {
          showResponseMessage('Film sudah ada di daftar.')
        }
      }
      cartFilmElement.innerHTML = ''
      updateCartFilm()
    } else {
      return false
    }
  }

  const renderAllFilms = results => {
    const filmElementList = document.querySelector('#film')

    results.forEach(film => {
      const getImage = () => {
        if (film.poster_path) {
          return `https://image.tmdb.org/t/p/w342${film.poster_path}`
        } else {
          return imgPlacholder
        }
      }

      const getYear = () => {
        return new Date(film.release_date).getFullYear()
      }

      const getTitle = () => {
        if (film.title.length >= 10) {
          return `${film.title.substring(0, 10)} ...`
        } else {
          return film.title
        }
      }

      const getOverview = () => {
        if (film.overview.length >= 20) {
          return `${film.overview.substring(0, 70)} ....baca selengkapnya`
        } else {
          return film.overwiew
        }
      }

      const getGenre = () => {
        const movieGenre = []
        genres.forEach((genre) => {
          if (film.genre_ids.includes(genre.id)) {
            movieGenre.push(genre.name)
          }
        })

        return movieGenre.map((genre) => {
          return ` ${genre} `
        }).join('|')
      }

      const isMovieInCart = localStorage.getItem('film') ? JSON.parse(localStorage.getItem('film')).some(f => JSON.parse(f).dataArr[0] === film.id.toString()) : false

      filmElementList.innerHTML += `
        <div class='movie-container col-6 col-md-4 col-xl-3 mb-5'>
            <img src="${getImage()}" class="w-100 h-200 img-thumbnail"></img>
            <div class="d-flex justify-content-between">
                <p class="badge bg-secondary text-sm">${getYear()}</p>
                <p class='badge bg-danger text-sm'>${film.vote_average}</p>
            </div>
            <div class='movie-info'>
                <h4 class="text-center">${getTitle()}</h4>
                <p class="text-underline-hover pointer" data-bs-toggle="modal" data-bs-target="#modal${film.id.toString()}">
                  ${getOverview()} 
                </p>
                <p class="bg-success p-1 text-white genre">
                  ${getGenre()}
                </p>
            </div>
        </div>
        <div class="modal fade p-0" id="modal${film.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog text-black  modal-md modal-dialog-centered modal-fullscreen-lg-down">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${film.title}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <img style="float: left" src="${getImage()}" class="me-3 w-50">
                            <p id="save-change${film.id}">Tahun Release: ${getYear()}</p>
                            <p>Rating: ${film.vote_average}</p>
                            <p>Genre: ${getGenre()}</p>
                            <p>${film.overview}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        ${!isMovieInCart
                        ? `
                            <span class="save btn btn-info" data-bs-dismiss="modal" value="${film.id},${film.title},${getYear()}">Save</span>
                          `
                        : `
                          <span class="save btn btn-netral">Save</span>
                        `}
                    </div>
                </div>
            </div>
        </div>
      `
    })
    filmElementList.addEventListener('click', saveChange)
  }

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message)
  }

  document.addEventListener('DOMContentLoaded', () => {
    getBook()
    updateCartFilm()
    emptyButton()
  })

  contentElemet.clickEvent = handleLoadMoreClick
  contentElemet.changeEvent = changedYear
  contentElemet.changeGenreEvent = changedGenre
}

export default main
