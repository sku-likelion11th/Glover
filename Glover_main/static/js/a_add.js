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

function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

// 폼 제출 후 로딩 창을 숨기는 함수 (예: 폼 제출 후 서버 응답 받은 후)
function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
}

// 폼 제출 버튼 클릭 시 로딩 창을 표시
document.getElementById('add-form').addEventListener('submit', function() {
    showLoading();
});