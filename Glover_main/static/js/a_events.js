const stampButtons = document.querySelectorAll(".stampBtn");
const modal = document.querySelector(".modal-cont");
const modalName = document.querySelector(".name_input");
const modaloriName = document.querySelector(".modal_ori_name");
const modalInfo = document.querySelector(".detail");
const modalStart = document.querySelector(".modal_start");
const modalEnd = document.querySelector(".modal_finish");
const modalClose = document.querySelector(".bi-x");
const imgElement = document.getElementById("preview_after");

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear().toString(); // Get the last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
    return `${year}-${month}-${day}`;
}

function init() {
    stampButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const name = button.getAttribute("data-name");
            const ori_name = button.getAttribute("data-name");
            const info = button.getAttribute("data-info");
            const startDate = formatDate(button.getAttribute("data-start"));
            const endDate = formatDate(button.getAttribute("data-end"));
            const stampImg = button.getAttribute("data-image");

            // modaloriName.textContent = ori_name;
            // modalName.textContent = name;
            // modalInfo.textContent = info;
            modalStart.textContent = startDate;
            modalEnd.textContent = endDate;

            modaloriName.value = ori_name;
            modalName.value = name;
            modalInfo.value = info;
            modalStart.value = startDate;
            modalEnd.value = endDate;
            modal.classList.remove("hidden");
            imgElement.setAttribute("src", stampImg);
        });
    });

    modalClose.addEventListener("click", function () {
        modal.classList.add("hidden");
    });
}

// form에서 이미지 업로드시 미리보기
function readURL(input, previewId) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(previewId).src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById(previewId).src = "";
    }
}

// 이미지 미리보기 상자를 클릭하면 파일 업로드 창 생성
const imgBoxes = document.querySelectorAll('.img-box');

imgBoxes.forEach(function(imgBox) {
imgBox.addEventListener('click', function() {
    const fileInput = imgBox.closest('.file-box').querySelector('input[type="file"]');
    fileInput.click();
});
});
init();