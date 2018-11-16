export const State = (moduleName: string) => {
	return (target: any, name: any, descriptor: any) => {
		console.log(moduleName);
		console.log(target);
		console.log(name);
		console.log(descriptor);
	};
};
