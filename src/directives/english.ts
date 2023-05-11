import { Directive } from "vue";

const english:Directive = {
    mounted(el, binding) {
        el.oninput = () => {
            el.value = el.value.replace(/[^A-z]/,'');
            if (binding.value) {
                el.value = el.value.slice(0, binding.value)
            }
        }
    }
}

export default english;