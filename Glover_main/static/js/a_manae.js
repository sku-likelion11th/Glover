const stampButtons = document.querySelectorAll(".stampBtn");
const modal = document.querySelector(".modal_cont");
const modalName = document.querySelector(".modal_name p");
const modalInfo = document.querySelector(".modal_detail p");
const modalStart = document.querySelector(".modal_start");
const modalEnd = document.querySelector(".modal_finish");
const modalClose = document.querySelector(".bi-x");

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
    return `${year}-${month}-${day}`;
}

function init() {
    stampButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const name = button.getAttribute("data-name");
            const info = button.getAttribute("data-info");
            const startDate = formatDate(button.getAttribute("data-start"));
            const endDate = formatDate(button.getAttribute("data-end"));

            modalName.textContent = name;
            modalInfo.textContent = info;
            modalStart.textContent = startDate;
            modalEnd.textContent = endDate;
            modal.classList.remove("hidden");
        });
    });

    modalClose.addEventListener("click", function () {
        modal.classList.add("hidden");
    });
}

init();