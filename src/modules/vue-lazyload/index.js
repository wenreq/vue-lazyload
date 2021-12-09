import Lazyload from './Lazyload'

const VueLazyLoad = {
  install(Vue, options) { 

    const LazyClass = Lazyload(Vue)
    const lazyload = new LazyClass(options)

    Vue.directive('lazy', {
      bind: lazyload.bindLazy.bind(lazyload)
    });
  }
}

export default VueLazyLoad;