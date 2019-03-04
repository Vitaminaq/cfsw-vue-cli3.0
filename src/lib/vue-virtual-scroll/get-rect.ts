import Vue, { VNode, VueConstructor } from 'vue';
import { DirectiveBinding, DirectiveOptions } from 'vue/types/options';
export default {
    bind: (el: Element, binding: DirectiveBinding, vnode: VNode) => {
        console.log(el);
    },
    inserted: (el: Element, binding: DirectiveBinding, vnode: VNode) => {
        console.log(el);
    },
    update: (el: Element, binding: DirectiveBinding, vnode: VNode) => {
        console.log(el);
    },
    componentUpdated: (el: Element, binding: DirectiveBinding, vnode: VNode) => {
        console.log(el);
    },
    unbind: (el: Element, binding: DirectiveBinding, vnode: VNode) => {
        console.log(el);
    },
}
