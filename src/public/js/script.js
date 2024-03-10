const menuBar = document.querySelector(".menu-bar")
menuBar.addEventListener("click",function(){
    menuBar.classList.toggle("active")
    document.querySelector(".menu-items").classList.toggle("active")
})
const toP = document.querySelector(".top")
window.addEventListener("scroll",function() {
    const x = this.pageYOffset;
    if (x>50) {toP.classList.add("active")}
    else{toP.classList.remove("active")}
})

