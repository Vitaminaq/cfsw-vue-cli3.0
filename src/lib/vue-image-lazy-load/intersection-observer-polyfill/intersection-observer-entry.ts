/**
 * 构造IntersectionObserverEntry类
 */
export default class IntersectionObserverEntry {
  time: any;
  target: any;
  rootBounds: any;
  boundingClientRect: any;
  intersectionRect: any;
  isIntersecting: any;
  intersectionRatio: any;
  constructor(entry: any) {
    this.init(entry);
  }
  init(entry: any) {
    this.time = entry.time;
    this.target = entry.target;
    this.rootBounds = entry.rootBounds;
    this.boundingClientRect = entry.boundingClientRect;
    this.intersectionRect = entry.intersectionRect || {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
    };
    this.isIntersecting = !!entry.intersectionRect;

    const targetRect = this.boundingClientRect;
    const targetArea = targetRect.width * targetRect.height;
    const intersectionRect = this.intersectionRect;
    const intersectionArea = intersectionRect.width * intersectionRect.height;

    if (targetArea) {
      this.intersectionRatio = intersectionArea / targetArea;
    } else {
      this.intersectionRatio = this.isIntersecting ? 1 : 0;
    }
  }
}
