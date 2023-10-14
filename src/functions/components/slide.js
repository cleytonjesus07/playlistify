export const handleSlide = (slider, left, right) => {
    /*  slider.addEventListener("scroll", ({ target }) => {
         if (target.scrollLeft > 0) {
             left.style.display = "flex";
             right.style.display = "none";
             return;
         }
         if (target.scrollLeft <= target.clientWidth + 100) {
             right.style.display = "flex";
             left.style.display = "none";
             return;
         }
     }) */
    left.addEventListener("click", () => {
        let toLeft = slider.clientWidth / 3;
        slider.scrollLeft -= toLeft;
    })
    right.addEventListener("click", () => {
        let toRight = slider.offsetWidth / 3;
        slider.scrollLeft += toRight;
    })
}