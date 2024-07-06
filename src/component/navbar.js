class Navbar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
      <navbar navbar-expand-lg">
          <div class="container-fluid">
              <button type="button" id="sidebarCollapse" class="btn btn-info">
                  <i class="fas fa-align-left"></i>
                  <span>Daftar Tontonan</span>
              </button>
              
          </div>
      </navbar>
    `
  }
}

customElements.define('nav-bar', Navbar)
