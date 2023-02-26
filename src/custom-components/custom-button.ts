export default class WebCTitle extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.render()
    }

    render() {
        if (!this.shadowRoot) return;
        const template = document.createElement('template')

        template.innerHTML = `
          <div class="title">Hello!</div>
      `
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

customElements.define('custom-button', WebCTitle)