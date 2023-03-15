import {makeAutoObservable} from 'mobx';
import {SizeType} from 'antd/es/config-provider/SizeContext';

export class ScreenStore {
    private isMobile: boolean = false;
    private currentWidth: number = 1000;

    constructor() {
        makeAutoObservable(this);
        this.initApp();
    }

    getIsMobile() {
        return this.isMobile;
    }

    getCurrentWidth() {
        return this.currentWidth;
    }

    getSize = (): SizeType => this.isMobile ? 'large' : 'large';

    private setIsMobile(isMobile: boolean) {
        this.isMobile = isMobile;
    }

    private setCurrentWidth(currentWidth: number) {
        this.currentWidth = currentWidth;
    }

    private initApp = () => {
        window.addEventListener('resize', (_) => {
            this.setCurrentWidth(window.innerWidth);
            const isMobile: boolean = (this.currentWidth < 768) ?? false;
            this.setIsMobile(isMobile);
        });
        window.dispatchEvent(new Event('resize'));
    }
}