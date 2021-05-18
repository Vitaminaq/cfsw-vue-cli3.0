import { reactive } from 'vue';
/**
 * 音频管理器
 */
export interface VoiceManageOptions {
	key: string;
	el: any;
	isPlaying?: boolean;
}

class VoiceManage {
	public subList: VoiceManageOptions[] = [];

	public get len() {
		return this.subList.length;
	}

	public getItem(key: string) {
		return this.subList.filter((i) => i.key === key);
	}
	public setItem(key: string) {
		for (let i = 0; i < this.len; i++) {
			if (this.subList[i].key === key) {
				this.subList[i].isPlaying = false;
				break;
			}
		}
	}
	public setNextItem(key: string, mode: 'none' | 'loop' | 'next' | 'next-loop') {
		for (let i = 0; i < this.len; i++) {
			if (this.subList[i].key === key) {
				const next = this.subList[i+1];
				if (next) {
                    this.toggle(next.key);
					break;
				}
                if (!next && mode === 'next-loop') {
					this.toggle(this.subList[0].key);
					break;
				}
			}
		}
	}
	/**
	 * 订阅
	 */
	public subscribe({ key, el }: VoiceManageOptions) {
		if (el.autoplay) {
			this.subList.forEach((item) => {
				item.el.pause();
			});
		}
		this.subList.push({
			key,
			el,
			isPlaying: el.autoplay
		});
	}

	/**
	 * 暂停 / 播放
	 */
	public toggle(key: string) {
		this.subList = this.subList.map((item) => {
			if (item.key !== key) {
				item.el.pause();
				item.isPlaying = false;
			} else {
				!item.isPlaying ? item.el.play() : item.el.pause();
				item.isPlaying = !item.isPlaying;
			}
			return item;
		});
	}

	/**
	 * 取消订阅
	 */
	public cancel(key: string) {
		for (let i = 0; i < this.len; i++) {
			if (this.subList[i].key === key) {
				this.subList.splice(i, 1);
				break;
			}
		}
	}
}

export default reactive(new VoiceManage());
