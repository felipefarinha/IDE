const navbar_lista = document.querySelectorAll('.navbar_lista')

// navbar-menu backgorund color
function remove_class_active() {
    navbar_lista.forEach(function (item, _) {
        item.classList.remove("active")
    })
}
//clique no menu
navbar_lista.forEach(item => {
    item.addEventListener('click', () => {
        remove_class_active()
        item.classList.add("active")
    })
})

// ABAS do navbar-menu
/*frist active item*/
document.getElementsByClassName('section')[0].style.display = "block"

const section_list = document.querySelectorAll('.section')

navbar_lista.forEach(function (item, i) {
    item.addEventListener('click', () => {
        section_list.forEach(item => {
            item.style.display = "none";
        })
        document.getElementsByClassName('section')[i].style.display = "block"
    })
})