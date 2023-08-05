function Upload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // 获取最大文件大小配置
            fetch('/api/CheckFileSize')
                .then(response => response.json())
                .then(data => {
                    const CheckFileSize = data.CheckFileSize;
                    if (CheckFileSize) {
                        fetch('/api/MaxFileSize')
                            .then(response => response.json())
                            .then(data => {
                                const MaxFileSize = data.MaxFileSize;
                                if (selectedFile.size > MaxFileSize * 1024 * 1024 * 1024) {
                                    alert(`文件过大，已超过${MaxFileSize}GB`);
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
                                alert("无法获取配置");
                            });
                    } else {
                        // 如果后端不检查文件大小，则直接上传文件
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
                    }
                })
                .catch(() => {
                    alert("无法获取配置");
                });
        }
    });
    fileInput.click();
}