const innerHTML = {
    beforeMount: (el: any, binding: any) => {
        el.innerHTML = binding.value;
    }
}

const directive = {
    install: (app: any) => {
        app.directive('innerHTML', innerHTML)
    }
}

export default directive;
