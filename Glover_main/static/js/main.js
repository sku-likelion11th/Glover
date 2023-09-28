const element = document.querySelector('.navbar'); // 요소 선택
element.classList.remove('blur-effect'); // "blur" 클래스 제거

// 버튼 요소 가져오기
var submitButton = document.querySelector(".submit");

// 버튼 클릭 이벤트 핸들러 등록
submitButton.addEventListener("click", function() {
    // 여기에서 POST 요청을 보내고 백엔드에서 응답을 받아 모달에 표시합니다.

    // 모달 창 열기
    modal.style.display = "block";
    element.classList.add('blur-effect'); // "blur" 클래스 추가
});


// 첫 번째 모달창 닫기 버튼 
var closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function() {
    
    modal.style.display = "none"; // 모달 닫기
    element.classList.remove('blur-effect'); // "blur" 클래스 제거
});