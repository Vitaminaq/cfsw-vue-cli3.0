import MyPupop from './my-pupop.vue';

export interface ConfirmOptions {
	message?: string;
	bgOpacity?: number;
	buttons?: CreateMyPupupButton[];
	callback?: () => any;
}

export interface AlertOptions {
	message?: string;
	bgOpacity?: number;
	btnText?: string;
	btnColor?: string;
	callback?: () => any;
}

export interface LoadingOptions {
	icon?: string;
	message?: string;
	bgOpacity?: number;
	duration?: number;
	callback?: () => any;
}

export interface ToastOptions {
	icon?: string;
	message?: string;
	duration?: number;
}

export interface CreateMyPupupButton {
	text: string;
	color?: string;
	callback?: () => any;
}

const hasCallback = (propsData: any) => {
	return new Promise((reject: any, resolve: any) => {
		const vm = new MyPupop({
			propsData
		});
		const dom = vm.$mount().$el;
		vm.$on('close', (r: any) => {
			reject && reject(r);
			if (!document.contains(dom)) return;
			document.body.removeChild(dom);
		});
		if (document.contains(dom)) resolve('该弹窗已经存在');
		document.body.appendChild(dom);
	});
};

export const confirm = (options: ConfirmOptions): Promise<any> => {
	const { buttons } = options;
	if (!buttons || !buttons.length) {
		options.buttons = [
			{
				text: '确定',
				color: 'orange'
			},
			{
				text: '取消'
			}
		];
	}
	return hasCallback({ ...options, type: 'confirm' });
};

export const alert = (options: AlertOptions): Promise<any> => {
	const { btnText } = options;
	if (!btnText) {
		options.btnText = '确定';
	}
	return hasCallback({ ...options, type: 'alert' });
};

export const loading = (options: ToastOptions): Promise<any> => {
	return hasCallback({ ...options, type: 'loading' });
};

export const toast = (
	options: ToastOptions | string,
	duration?: number
): any => {
	let propsData: any = {
		type: 'toast'
	};
	if (typeof options === 'string') {
		propsData.message = options;
		propsData.bgOpacity = 0;
		duration && (propsData.duration = duration);
	} else {
		Object.assign(propsData, options);
	}
	const vm = new MyPupop({
		propsData
	});
	const dom = vm.$mount().$el;
	vm.$on('close', () => {
		if (!document.contains(dom)) return;
		document.body.removeChild(dom);
	});
	if (document.contains(dom)) return;
	document.body.appendChild(dom);
};

export default {
	confirm,
	alert,
	loading,
	toast
};
