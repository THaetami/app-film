class Sidebar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
        <div id="sidebar" class="active bg-info text-black">
            <div class="sidebar-header">
                <h6>....</h6>
            </div>
            <h3 class="pt-3 ps-3 pb-0 header components">Daftar Tontonan</h3>
            <ul class="daftar list-unstyled components ">
                <div id="daftar">
                    
                </div>
                            
            </ul>
            <span id="empty"></span>
        </div>
    `
  }
}

customElements.define('side-bar', Sidebar)
