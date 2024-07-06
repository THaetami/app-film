class Header extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
        <header class="text-white py-5">
            <div class="container">
                <div class="row">
                    <div class="col-12 mt-15">
                        <h1 class="display-1">NETKLIK Indonesia</h1>
                        <h3 class="lead mb-0 d-none d-md-block">Top Best Movie</h3>
                    </div>
                </div>
            </div>
        </header>
    `
  }
}

customElements.define('head-component', Header)
