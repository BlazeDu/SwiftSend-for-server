new Vue({
    el: '#Send',
    data: {
        showAlert: false
    },
    methods: {
        async Send() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            await new Promise(resolve => {
                fileInput.addEventListener('change', (event) => {
                    resolve(event.target.files[0]);
                });
                fileInput.click();
            });
            if (!fileInput.files.length)
                return;
            try
            {
                const response = await fetch('/api/CheckFileSize');
                const data = await response.json();
                if (data.CheckFileSize) {
                    const maxFileSizeResponse = await fetch('/api/MaxFileSize');
                    const maxFileSizeData = await maxFileSizeResponse.json();
                    const MaxFileSize = maxFileSizeData.MaxFileSize;
                    if (fileInput.files[0].size > MaxFileSize * 1024 * 1024 * 1024)
                        this.Title = `文件过大，已超过${MaxFileSize}GB`;
                    else
                    {
                        const formData = new FormData();
                        formData.append('file', fileInput.files[0]);
                        const uploadResponse = await fetch('/upload', {
                            method: 'POST',
                            body: formData,
                        });
                        const uploadData = await uploadResponse.json();
                        this.Title = "上传成功";
                        this.Body = "验证码:" + uploadData.verificationCode;
                    }
                }
                else
                {
                    const formData = new FormData();
                    formData.append('file', fileInput.files[0]);
                    const uploadResponse = await fetch('/upload', {
                        method: 'POST',
                        body: formData,
                    });
                    const uploadData = await uploadResponse.json();
                    this.Title = "上传成功";
                    this.Body = "验证码:" + uploadData.verificationCode;
                }
            }
            catch (error)
            {
                this.Title = "Error";
                this.Body = "无法获取配置";
            }
            finally
            {
                this.showAlert = true;
            }
        }
    }
});