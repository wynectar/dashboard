// 自适应大屏方案
class AdaptiveScreen {
    constructor(container, options = {}) {
        this.container = typeof container === 'string'
            ? document.querySelector(container)
            : container;
        this.options = Object.assign({
            designWidth: 1920,
            designHeight: 1080,
            baseFont: 16, // 设置rem基准
            scaleMode: 'fit', // 'fit' | 'fill' | 'cover' | 'contain'
            minScale: 0.5,
            maxScale: 2.0,
            preserveAspectRatio: true,
            centerContent: true,
            onScale: null
        }, options);

        this.ticking = false;
    }


    applyMixed() {
        // 混合方案：布局用vw/vh，字体用rem，整体用scale限制
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        const { designWidth, designHeight, baseFont, minScale } = this.options
        const scaleX = width / designWidth;
        const scaleY = height / designHeight;

        // 1. 设置rem基准
        const scale = Math.max(
            minScale,
            Math.min(scaleX, scaleY)
        );
        console.log(scale, 'scale')
        document.documentElement.style.fontSize = `${baseFont * scale}px`;

        // 2. 设置CSS变量
        document.documentElement.style.setProperty('--design-width', designWidth);
        document.documentElement.style.setProperty('--design-height', designHeight);
        document.documentElement.style.setProperty('--design-rem-size', baseFont);
    }

    // 使用requestAnimationFrame优化
    rAFResizeHandler = () => {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                console.log(123)
                this.applyMixed();
                this.ticking = false;
            });
            this.ticking = true;
        }
    };

    // 响应式切换
    init() {
        this.rAFResizeHandler()
        window.addEventListener('resize', this.rAFResizeHandler);
    }
}

export default AdaptiveScreen