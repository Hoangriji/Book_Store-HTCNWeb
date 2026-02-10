const minInput = document.getElementById("minPrice");
const maxInput = document.getElementById("maxPrice");
const progress = document.createElement("div");

progress.classList.add("range-progress");
document.querySelector(".range-slider").appendChild(progress);

function updateRange() {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    const percentMin = (min / minInput.max) * 100;
    const percentMax = (max / maxInput.max) * 100;

    progress.style.left = percentMin + "%";
    progress.style.width = (percentMax - percentMin) + "%";
}

minInput.addEventListener("input", updateRange);
maxInput.addEventListener("input", updateRange);

updateRange();
