export const getPrototypesOf = (obj: Object, root: Object) => {
    const prototypes = [];
    let current = obj;
    while (current !== root) {
        // current.__proto__
        current = Object.getPrototypeOf(current);
        prototypes.push(current);
    }
    return prototypes;
}

export const getOwnPropertyDescriptors = (prototypes: any[]) => {
    const descriptors: any = {};
    prototypes.forEach((prototype) => {
        Object.assign(descriptors, Object.getOwnPropertyDescriptors(prototype));
    });
    // correction constructor
    descriptors.constructor = Object.getOwnPropertyDescriptors(prototypes[0]).constructor;
    return descriptors;
}

export interface DispatchOptions {
    fName: string;
    arg: any[];
    target: Object;
}
export type Dispatch = (options: DispatchOptions) => void; 

export const observe = (target: Object, root: Object, dispatch: Dispatch) => {
    const prototypes = getPrototypesOf(target, root);
    const descriptors = getOwnPropertyDescriptors(prototypes);
    Object.keys(descriptors).forEach((fName) => {
        const descriptor = descriptors[fName];
        if (typeof descriptor !== 'undefined' && /^\$/.test(fName) && typeof descriptor.value === 'function') {
            // __proto__ function to this
            Object.defineProperty(target, fName, {
                ...descriptor,
                value: function(...arg: any[]) {
                    dispatch({
                        fName,
                        arg,
                        target
                    });
                    return descriptor.value.apply(target, arg);
                }
            })
        }
    });
}