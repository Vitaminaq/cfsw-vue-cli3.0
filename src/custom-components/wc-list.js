import { css as n, LitElement as u, html as c } from "lit";
import { property as f, customElement as h } from "lit/decorators.js";
var v = Object.defineProperty, w = Object.getOwnPropertyDescriptor, m = (e, r, i, s) => {
  for (var t = s > 1 ? void 0 : s ? w(r, i) : r, p = e.length - 1, o; p >= 0; p--)
    (o = e[p]) && (t = (s ? o(r, i, t) : o(t)) || t);
  return s && t && v(r, i, t), t;
};
let l = class extends u {
  constructor() {
    super(...arguments), this.list = [];
  }
  render() {
    return c`
     <ul>${this.list.map((e) => c`<li class="wc-list-item">${e}</li>`)}</ul>
    `;
  }
};
l.styles = n`
    .wc-list-item {
        width: 200px;
        height: 50px;
    }
  `;
m([
  f({ type: String })
], l.prototype, "list", 2);
l = m([
  h("wc-list")
], l);
export {
  l as WcList
};
