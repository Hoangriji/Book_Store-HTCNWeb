const minInput = document.getElementById("minPrice");
const maxInput = document.getElementById("maxPrice");
const rangeText = document.getElementById("priceRangeText");

const progress = document.createElement("div");
progress.classList.add("range-progress");
document.querySelector(".range-slider").appendChild(progress);

function updateRange() {
    let min = parseInt(minInput.value);
    let max = parseInt(maxInput.value);

    if (min > max - 1) {
        min = max - 1;
        minInput.value = min;
    }

    if (max < min + 1) {
        max = min + 1;
        maxInput.value = max;
    }

    const percentMin = (min / minInput.max) * 100;
    const percentMax = (max / maxInput.max) * 100;

    progress.style.left = percentMin + "%";
    progress.style.width = (percentMax - percentMin) + "%";

    rangeText.textContent = `$${min} - $${max}`;
}

minInput.addEventListener("input", updateRange);
maxInput.addEventListener("input", updateRange);

updateRange();
