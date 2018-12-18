import { Vue, Component, Watch } from 'vue-property-decorator';
import ArticList from '@src/components/artic-list/artic-list.vue';

// let items: any = null;

class ContactElement extends HTMLElement {
	connectedCallback() {
		if (this.shadowRoot) {
			return;
		}
		// console.log(items);
		console.log((this as any)._contact);
		this.attachShadow({ mode: 'open' }).appendChild(
			new ArticList((this as any).contact).$mount().$el
		);
	}
	get contact() {
		return (this as any)._contact;
	}
	set contact(contact) {
		if (contact !== (this as any)._contact) {
			(this as any)._contact = contact;
			// this._render();
		}
	}
}
customElements.define('contact-element', ContactElement);

// export default class InsertListItem {
// 	constructor(item: any) {
// 		items = item;
// 		customElements.define('contact-element', ContactElement);
// 	}
// }
