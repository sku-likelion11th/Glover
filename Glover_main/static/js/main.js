const element = document.querySelector('.navbar'); // 요소 선택
element.classList.remove('blur-effect'); // "blur" 클래스 제거

var studentMajorValue = document.getElementById("major")
var studentIdInput = document.getElementById("student_id"); // 학번 입력 필드
var consentStatus = document.getElementById("consent_status");  // 동의 여부를 표시할 엘리먼트

// 버튼 요소 가져오기
var submitButton = document.querySelector(".submit");

// 버튼 클릭 이벤트 핸들러 등록
submitButton.addEventListener("click", async function(event) {
    event.preventDefault();
    var is_consented = '';
    var not_blur = '';
    var studentIdValue = studentIdInput.value;
    var studentMajorValue = studentMajorValue.value;

    try {
        const response0 = await fetch(`search/${studentIdValue}`)
        const response = await fetch(`search/${studentIdValue}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        is_consented = data.flag ? 'none' : 'block';
        not_blur = data.flag ? 'blur-effect' : 'blur-effect';
        
        console.log(typeof data.flag);
        console.log(is_consented)
        console.log(not_blur)

        // 나머지 로직 수행
        if (data.flag){
            document.getElementById('login').submit();
        }
        var agreeBtn = document.getElementById('agree_Btn');
        agreeBtn.addEventListener("click", function() {
            document.getElementById('login').submit();
        })
        modal.style.display = is_consented;
        element.classList.add(not_blur); // "blur" 클래스 추가
    } catch (error) {
         console.error("Error:", error);
    }
});


// 첫 번째 모달창 닫기 버튼 
var closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function() {
    
    modal.style.display = "none"; // 모달 닫기
    element.classList.remove('blur-effect'); // "blur" 클래스 제거
});