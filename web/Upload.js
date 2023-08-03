function Upload() {
    // 创建文件上传输入框
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    // 监听文件选择事件
    fileInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // 创建 FormData 对象并将选中的文件添加到其中
            const formData = new FormData();
            formData.append('file', selectedFile);
            // 使用 Fetch API 发送文件上传请求
            fetch('/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    alert('上传成功，验证码为: ' + data.verificationCode);
                })
                .catch((error) => {
                    console.error('错误:', error);
                    alert('上传失败：' + error.message);
                });
        }
    });
    fileInput.click();
}
