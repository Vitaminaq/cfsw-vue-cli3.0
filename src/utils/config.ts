const configs = {
	develop: {
		baseURL: 'https://www.vitaminaq.cn'
	},
	beta: {
		baseURL: 'https://www.vitaminaq.cn'
	},
	production: {
		baseURL: 'https://www.vitaminaq.cn'
	}
};

export const config = configs['production'];

// 是否为csr模式
export const isCsr = /csr$/.test(import.meta.env.MODE);
