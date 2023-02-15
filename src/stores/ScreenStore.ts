import {makeAutoObservable} from 'mobx';
import {SizeType} from 'antd/es/config-provider/SizeContext';

export class ScreenStore {
    private isMobile: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.initApp();
    }

    getIsMobile() {
        return this.isMobile;
    }

    getSize = (): SizeType => this.isMobile ? 'middle' : 'large';

    setIsMobile(isMobile: boolean) {
        this.isMobile = isMobile;
    }

    private initApp = () => {
        window.addEventListener('resize', (_) => {
            const isMobile: boolean = (window.innerWidth < 768) ?? false;
            this.setIsMobile(isMobile);
        })
    }
}