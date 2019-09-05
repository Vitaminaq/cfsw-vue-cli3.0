import Vue, { VueConstructor } from 'vue';

export const isNotPro: boolean = process.env.NODE_ENV !== 'production';

export const hasObservable = (localVue:  VueConstructor<Vue>) => {
    const v = localVue.version.split('.');
    return Number(v[0]) > 1 && Number(v[1]) > 5;
}