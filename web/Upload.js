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
                    // 处理来自服务器的响应
                    console.log(data);
                    // 弹窗显示验证码
                    alert('文件上传成功，验证码为: ' + data.verificationCode);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('文件上传失败：' + error.message);
                });
        }
    });

    // 触发文件选择
    fileInput.click();
}