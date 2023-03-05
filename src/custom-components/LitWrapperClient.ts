import { defineComponent, onMounted } from "vue";

export default defineComponent({
    setup(props, ctx) {

        onMounted(() => {
            // this.$el?.removeAttribute("defer-hydration");
        });
        return () => (ctx as any).slots.default?.()?.[0]?.children[0];
    }
})