import { css as a, LitElement as i, html as c } from "lit";
import { property as l, customElement as m } from "lit/decorators.js";
var v = Object.defineProperty, h = Object.getOwnPropertyDescriptor, y = (e, n, o, p) => {
  for (var t = p > 1 ? void 0 : p ? h(n, o) : n, s = e.length - 1, u; s >= 0; s--)
    (u = e[s]) && (t = (p ? u(n, o, t) : u(t)) || t);
  return p && t && v(n, o, t), t;
};
let r = class extends i {
  constructor() {
    super(...arguments), this.value = "";
  }
  render() {
    return c`
     <input .value=${this.value} @input=${this._onInput} />
    `;
  }
  _onInput(e) {
    return console.log(e, "yyyyyyyyyyyyyyy"), this.change(e.target.value);
  }
};
r.styles = a`
    :host {
      max-width: 100px;
      margin: 0 auto;
      padding: 2rem;
    }
  `;
y([
  l({ type: String })
], r.prototype, "value", 2);
y([
  l({ type: Function })
], r.prototype, "change", 2);
r = y([
  m("wc-input")
], r);
export {
  r as WcInput
};
