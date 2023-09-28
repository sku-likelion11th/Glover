// 버튼 요소 가져오기
var submitButton = document.querySelector(".submit");
var deleteButton = document.querySelector('.del');
var hamburgerCheckbox = document.querySelector(".checkbox");


// 버튼 클릭 이벤트 핸들러 등록
submitButton.addEventListener("click", function(event) {
    event.preventDefault(); // 버튼의 기본 동작 방지

    // 여기에서 POST 요청을 보내고 백엔드에서 응답을 받아 모달에 표시합니다.

    // 모달 창 열기
    document.getElementById("fir_modal").style.display = "block";

    // 모달-cont에 블러 효과를 추가
    var modalCont = document.querySelector(".modal-cont");
    modalCont.classList.add('blur-effect');

    // 햄버거 메뉴가 열려 있으면 버튼 비활성화
    if (hamburgerCheckbox.checked) {
        submitButton.disabled = true;
        deleteButton.disabled = true;
    }
});

// 모달 닫기 버튼 클릭 이벤트 핸들러 등록
var closeModalButton = document.querySelector(".bi-x");
closeModalButton.addEventListener("click", function() {
    // 모달 창 닫기
    document.getElementById("fir_modal").style.display = "none";

    // modal-cont에서 블러 효과 제거
    var modalCont = document.querySelector(".modal-cont");
    modalCont.classList.remove('blur-effect');

    // 모달이 닫힐 때 버튼 활성화
    submitButton.disabled = false;
    deleteButton.disabled = false;
});

// 햄버거 메뉴 체크박스 상태 변경 이벤트 핸들러 등록
hamburgerCheckbox.addEventListener("change", function() {
    // 체크박스 상태에 따라 블러 효과를 추가 또는 제거
    if (hamburgerCheckbox.checked) {
        var modalCont = document.querySelector(".modal-cont");
        modalCont.classList.add('blur-effect');

        // 버튼 비활성화
        submitButton.disabled = true;
        deleteButton.disabled = true;
    } else {
        var modalCont = document.querySelector(".modal-cont");
        modalCont.classList.remove('blur-effect');

        // 버튼 활성화
        submitButton.disabled = false;
        deleteButton.disabled = false;
    }
});

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



// // 폼 내부 버튼에 따른 모달창 제공
// var submitButton = document.getElementById("submit");  // 폼 내부의 저장 버튼
// var deleteButton = document.querySelector('.del');  // 폼 내부의 삭제 버튼 
// var close = document.querySelector(".bi-x")          // 폼 내부의 'X' 버튼

// var firstModal = document.getElementById("fir_modal");     // 첫 번째 모달창 (저장)
// var secModal = document.getElementById("sec_modal");     // 두 번째 모달창 (삭제)
// var thiModal = document.getElementById("thi_modal");     // 세 번째 모달창 ('X')


// // 저장 눌렀을 때 실행되며, 이에 맞는 모달이 나타남
// submitButton.addEventListener("click", function(event) {
//     event.preventDefault(); // 버튼의 기본 동작 방지

//     // 여기에서 POST 요청을 보내고 백엔드에서 응답을 받아 모달에 표시합니다.
    
//     // 모달 창 열기
//     document.getElementById("fir_modal").style.display = "block";
// });


// // 삭제 눌렀을 때 실행되며, 이에 맞는 모달이 나타남
// function delModal() {
//     document.getElementById("sec_modal").style.display = 'block';
// }
// deleteButton.addEventListener('click', delModal);


// // ('X') 눌렀을 때 실행되며, 이에 맞는 모달이 나타남
// function noneModal() {
//     document.getElementById("thi_modal").style.display = 'block';
// }
// close.addEventListener('click', noneModal);

