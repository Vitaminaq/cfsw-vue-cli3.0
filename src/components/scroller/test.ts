let listItem = {};
let components: any;
class ContactElement extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		if (this.shadowRoot) {
			return;
		}
		console.log(this, (this as any)._item, this.dataset);
		// (window as any).vs = this;
		this.attachShadow({ mode: 'open' }).innerHTML = `<div id="vs"></div>`;
		this._render();
	}
	get item() {
		return (this as any)._item;
	}
	set item(item) {
		if (item !== (this as any)._item) {
			(this as any)._item = item;
		}
	}
	_render() {
		if (!this.shadowRoot) return;
		new components({
			propsData: {
				item: listItem
			}
		}).$mount((this as any).shadowRoot.querySelector('#vs'));
	}
}
// customElements.define('contact-element', ContactElement);

class InsertListItem {
	constructor() {
		customElements.define('contact-element', ContactElement);
	}
	propData(component: any) {
		components = component;
	}
}

export default new InsertListItem();
