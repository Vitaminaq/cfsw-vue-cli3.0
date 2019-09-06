import Vue, { VueConstructor } from 'vue';

export const isNotPro: boolean = process.env.NODE_ENV !== 'production';

export const hasObservable = (localVue: VueConstructor<Vue>) => {
	const v = localVue.version.split('.');
	return Number(v[0]) > 1 && Number(v[1]) > 5;
};

export const mergeStore = (p: any, c: any) => {
	// if (c != null) {
	// 	let to = Object(s);
	// 	for (let key in c) {
	// 		if (Object.prototype.hasOwnProperty.call(c, key)) {
    //             console.log(to[key], c[key], 'lllllllllllllllllllllllllll')
	// 			to[key] = c[key];
	// 		}
	// 	}
	// 	return to;
    // }
};

// if (Object.merge ||typeof Object.merge != 'function') {
//     // Must be writable: true, enumerable: false, configurable: true
//     Object.defineProperty(Object, "assign", {
//       value: function assign(target: any, varArgs: any) { // .length of function is 2
//         'use strict';
//         if (target == null) { // TypeError if undefined or null
//           throw new TypeError('Cannot convert undefined or null to object');
//         }

//         let to = Object(target);

//         for (var index = 1; index < arguments.length; index++) {
//           var nextSource = arguments[index];

//           if (nextSource != null) { // Skip over if undefined or null
//             for (let nextKey in nextSource) {
//               // Avoid bugs when hasOwnProperty is shadowed
//               if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
//                 to[nextKey] = nextSource[nextKey];
//               }
//             }
//           }
//         }
//         return to;
//       },
//       writable: true,
//       configurable: true
//     });
//   }
