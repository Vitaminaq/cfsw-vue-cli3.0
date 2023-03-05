import { css as n, LitElement as g, html as h } from "lit";
import { property as d, state as m, customElement as j } from "lit/decorators.js";
const b = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjI1LjYiIGhlaWdodD0iMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIHZpZXdCb3g9IjAgMCAyNTYgMzIwIj48cGF0aCBmaWxsPSIjMDBFOEZGIiBkPSJtNjQgMTkybDI1LjkyNi00NC43MjdsMzguMjMzLTE5LjExNGw2My45NzQgNjMuOTc0bDEwLjgzMyA2MS43NTRMMTkyIDMyMGwtNjQtNjRsLTM4LjA3NC0yNS42MTV6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzI4MzE5OCIgZD0iTTEyOCAyNTZWMTI4bDY0LTY0djEyOGwtNjQgNjRaTTAgMjU2bDY0IDY0bDkuMjAyLTYwLjYwMkw2NCAxOTJsLTM3LjU0MiAyMy43MUwwIDI1NloiPjwvcGF0aD48cGF0aCBmaWxsPSIjMzI0RkZGIiBkPSJNNjQgMTkyVjY0bDY0LTY0djEyOGwtNjQgNjRabTEyOCAxMjhWMTkybDY0LTY0djEyOGwtNjQgNjRaTTAgMjU2VjEyOGw2NCA2NGwtNjQgNjRaIj48L3BhdGg+PHBhdGggZmlsbD0iIzBGRiIgZD0iTTY0IDMyMFYxOTJsNjQgNjR6Ij48L3BhdGg+PC9zdmc+";
var p = Object.defineProperty, u = Object.getOwnPropertyDescriptor, a = (e, i, s, r) => {
  for (var t = r > 1 ? void 0 : r ? u(i, s) : i, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (t = (r ? c(i, s, t) : c(t)) || t);
  return r && t && p(i, s, t), t;
};
let o = class extends g {
  constructor() {
    super(...arguments), this.docsHint = "Click on the Vite and Lit logos to learn more", this.count = 0, this.total = 0;
  }
  render() {
    return h`
      <div>
        <a href="https://lit.dev" target="_blank">
          <img src=${b} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <div>============== slot start ===========</div>
      <slot></slot>
      <div>============== slot end ===========</div>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
      <div>total: ${this.total}</div>
      <div>============== slot-bottom start ===========</div>
      <slot name="bottom"></slot>
      <div>============== slot-bottom end ===========</div>
    `;
  }
  async connectedCallback() {
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww');
    super.connectedCallback(), this.total = await new Promise((e) => {
      setTimeout(() => {
        e(10);
      }, 1e3);
    });
  }
  _onClick() {
    this.count++;
  }
};
o.styles = n`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
a([
  d()
], o.prototype, "docsHint", 2);
a([
  d({ type: Number })
], o.prototype, "count", 2);
a([
  m()
], o.prototype, "total", 2);
o = a([
  j("wc-element")
], o);
export {
  o as WcElement
};
