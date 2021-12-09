import Lazyimg from "./LazyImage";
import { getScrollParent } from "./utils";

export default function Lazyload(Vue) {
  return class Lazy { 
    constructor(options) { 
      this.options = options
      this.isAddScrollListener = false
      this.lazyImgPool = []
    }

    bindLazy(el, bindings, vnode) { 
      Vue.nextTick(() => { 
        // 获取父级节点 overflow 有 scroll || auto 属性的元素 
        const scrollParent = getScrollParent(el)
        if (scrollParent && !this.isAddScrollListener) {
          // 添加 scroll 监听事件
          scrollParent.addEventListener(
            'scroll',
            this.handleScroll.bind(this),
            false
          );
        }
        // 构造一个图片的实例
        const lazyImg = new Lazyimg({
          el,
          src: bindings.value,
          options: this.options,
          imgRender: this.imgRender.bind(this)
        })
        // 添加到池子里面
        this.lazyImgPool.push(lazyImg)
        // 初始化事件
        this.handleScroll()
      });
    }

    handleScroll() { 
      let isVisible = false
      // 循环池子中的图片
      this.lazyImgPool.forEach(lazyImg => { 
        // 图片在可视区域内 去更新状态和设置图片属性
        if (!lazyImg.loaded) { 
          isVisible = lazyImg.checkIsVisible()
          isVisible && lazyImg.loadImg();
        }
      })
    }
    
    imgRender(lazyImg,state) {
      const {
        el,
        options
      } = lazyImg
      const { loading, error } = options
      let src = ''

      switch (state) {
        case 'loading':
          src = loading || ''
          break;
        case 'error':
          src = error || ''
          break;
        default:
          src = lazyImg.src
          break;
      }

      el.setAttribute('src',src)
    }
  }
}