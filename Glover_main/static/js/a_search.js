// 원본 체크박스 요소와 따라가는 체크박스 요소 선택
var checkboxes = document.querySelectorAll('input[type="checkbox"][id^="cb_"]');
var hiddenInputs = document.querySelectorAll('input[type="hidden"][id^="hiddenInput_"]');

for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    var hiddenInput = hiddenInputs[i];

    // 이벤트 리스너 함수 내부에서 hiddenInput 변수를 유지
    checkbox.addEventListener("change", function (currentHiddenInput) {
        return function () {
            if (this.checked) {
                currentHiddenInput.value = "True";
            } else {
                currentHiddenInput.value = "False";
            }
        };
    }(hiddenInput)); // 즉시 실행 함수를 사용하여 클로저 생성
}

document.getElementById("check-submit").addEventListener("click", function() {
    // 폼을 JavaScript로 제출
    document.getElementById("check").submit();
});