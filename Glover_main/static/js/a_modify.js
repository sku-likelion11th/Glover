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