// const template = `
//     <div class="stamp1-set">
//         <button class="stamp1">
//             <img src="../../img/stamp1.png" alt="빈 스탬프 이미지">
//         </button>
//         <button class="stamp2">
//             <img src="../../img/stamp1.png" alt="빈 스탬프 이미지">
//         </button>
//         <button class="stamp3">
//             <img src="../../img/stamp1.png" alt="빈 스탬프 이미지">
//         </button>
//     </div>
//     <div class="stamp2-set">
//         <button class="stamp4">
//             <img src="../../img/stamp1.png" alt="빈 스탬프 이미지">
//         </button>
//         <button class="stamp5">
//             <img src="../../img/stamp1.png" alt="빈 스탬프 이미지">
//         </button>
//         <button class="stamp6">
//             <img src="../../img/stamp1.png" alt="빈 스탬프 이미지">
//         </button>
//     </div>
// `;
// $(".stampset").append(template);


const open=document.querySelector(".stamp1");
const modal=document.querySelector(".modal-cont");
const close=document.querySelector(".bi-x");

function init(){
    open.addEventListener("click",function(){
        document.querySelector(".modal-bg").classList.remove("hidden"); // 어두운 배경도 표시
        modal.classList.remove("hidden");
    });
    close.addEventListener("click",function(){
        document.querySelector(".modal-bg").classList.add("hidden"); // 어두운 배경도 숨김
        modal.classList.add("hidden");
    });
}

init();




// chatGPT의 의견
/* const open = document.querySelector(".stamp1");
const firstModal = document.querySelector(".modal-cont");
const closeFirstModal = document.querySelector(".bi-x");

// 두 번째 모달 창 관련 요소 선택
const secondModal = document.querySelector(".modal_save");
const closeSecondModal = document.querySelector(".noBtn");

function init() {
    open.addEventListener("click", function () {
        document.querySelector(".modal-bg").classList.remove("hidden"); // 어두운 배경도 표시
        firstModal.classList.remove("hidden");
    });

    closeFirstModal.addEventListener("click", function () {
        document.querySelector(".modal-bg").classList.add("hidden"); // 어두운 배경도 숨김
        firstModal.classList.add("hidden");
    });

    // 첫 번째 모달의 저장 버튼 클릭 시 두 번째 모달 표시
    const saveButton = document.querySelector(".submit");
    saveButton.addEventListener("click", function () {
        // 첫 번째 모달 숨기기
        firstModal.classList.add("hidden");

        // 두 번째 모달 표시
        document.querySelector(".modal_savebg").classList.remove("hidden");
        secondModal.classList.remove("hidden");
    });

    // 두 번째 모달의 닫기 버튼 클릭 시 두 번째 모달 숨기기
    closeSecondModal.addEventListener("click", function () {
        document.querySelector(".modal_savebg").classList.add("hidden");
        secondModal.classList.add("hidden");
    });
}

init(); */



// 내가 고안한 두번째 모달 팝업
/* const yes = document.getElementById('submit');
const modal_saveBtn = document.getElementById('modal_save');
const no = document.getElementById('no');

yes.onclick = function() {
    modal_saveBtn.style.display = 'block';
}
no.onclick = function() {
    modal_saveBtn.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal_saveBtn) {
    modal_saveBtn.style.display = "none";
  }
} */
