function handleFileUpload() {
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

function handleFileDownload() {
    // 获取用户输入的验证码
    const verificationCode = prompt('请输入6位验证码:');
    if (verificationCode && verificationCode.length === 6) {
        // 使用 Fetch API 发送带有验证码的文件下载请求
        fetch(`/download?verificationCode=${verificationCode}`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('文件下载失败');
                }

                // 从响应头中提取文件名
                const contentDisposition = response.headers.get('content-disposition');
                const filename = contentDisposition
                    ? contentDisposition.split('filename=')[1]
                    : 'unknown';

                // 将响应内容转换为blob
                return response.blob().then((blob) => ({ blob, filename }));
            })
            .then((data) => {
                // 创建临时链接并模拟点击下载
                const downloadLink = document.createElement('a');
                const url = URL.createObjectURL(data.blob);
                downloadLink.href = url;
                downloadLink.download = data.filename;
                downloadLink.click();

                // 释放链接资源
                URL.revokeObjectURL(url);

                // 删除该文件
                fetch(`/delete?verificationCode=${verificationCode}`, {
                    method: 'DELETE',
                }).then(() => {
                    alert('文件下载成功并已删除！');
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('文件下载失败：' + error.message);
            });
    } else {
        alert('请输入有效的6位验证码！');
    }
}