export default {
    install: (app) => {
        const fun = function (e,vm){
            let target = e.target
            if (target.nodename === 'SPAN'){
                target = e.target.parentNode
            }
            vm.$nextTick(()=>{
                console.log(target.name)
                target.blur()
            })
        }
        app.directive('btn', {
            mounted(el,binding,vnode){
                const vm = binding.instance
                el.addEventListener('focus',(e)=>{fun(e,vm)})
            },
            unmounted(el){
                el.removeEventListener('focus',(e)=>{fun(e,vm)})
            }
        })
    }
}