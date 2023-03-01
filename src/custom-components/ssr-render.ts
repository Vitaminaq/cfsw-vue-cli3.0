
import { defineComponent, onServerPrefetch, getCurrentInstance, h, ref } from 'vue';
import "@lit-labs/ssr/lib/render-lit-html.js";
import { html } from "lit";
import { render } from "@lit-labs/ssr";
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';

export default defineComponent({
    setup() {
        const instance = getCurrentInstance();
        if (!instance) return;

        const slot = instance.slots.default?.()?.[0];

        const litElementStr = ref("");

        const litElementTagName = slot?.type as string;

        onServerPrefetch(async () => {
            const result = render(html`<my-element></my-element>`);
            litElementStr.value = await collectResult(result);
        });

        return () => {
            if (!litElementTagName) return;

            if (import.meta.env.SSR) return h(litElementTagName, {
                innerHTML: litElementStr.value,
                "defer-hydration": true
            });
            return slot;
        }
    }
})