function Upload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // 获取最大文件大小配置
            fetch('/api/getMaxFileSize')
                .then(response => response.json())
                .then(config => {
                    if (config.File.CheckFileSize)
                        if (selectedFile.size > config.File.MaxFileSize * 1024 * 1024 * 1024) {
                            alert(`文件过大，已超过${config.File.MaxFileSize}GB`);
                            return;
                        }
                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    fetch('/upload', {
                        method: 'POST',
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            alert('上传成功，验证码为: ' + data.verificationCode);
                        })
                        .catch(() => {
                            alert('上传失败');
                        });
                })
                .catch(() => {
                    alert("请求过于频繁");
                });
        }
    });
    fileInput.click();
}