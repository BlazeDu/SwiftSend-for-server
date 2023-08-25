const Alert = Vue.createApp({
    data() {
        return {
            showAlert: false
        }
    },
    methods: {
        Copy() {
            navigator.clipboard.writeText(this.VCode);
        },
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
                        formData.append('fileName', fileInput.files[0].name);
                        formData.append('fileSize', fileInput.files[0].size);
                        const uploadResponse = await fetch('/upload', {
                            method: 'POST',
                            body: formData,
                        });
                        const uploadData = await uploadResponse.json();
                        this.Title = "上传成功";
                        this.VCode = uploadData.verificationCode;
                    }
                }
                else
                {
                    const formData = new FormData();
                    formData.append('file', fileInput.files[0]);
                    formData.append('fileName', fileInput.files[0].name);
                    formData.append('fileSize', fileInput.files[0].size);
                    const uploadResponse = await fetch('/upload', {
                        method: 'POST',
                        body: formData,
                    });
                    const uploadData = await uploadResponse.json();
                    this.Title = "上传成功";
                    this.VCode = uploadData.verificationCode;
                }
            }
            catch (error)
            {
                this.Title = "Error";
                this.VCode = "无法获取配置";
            }
            finally
            {
                this.showAlert = true;
            }
        }
    }
}).mount('#Send');


const Mode = Vue.createApp({
    data() {
        return {
            mode: false
        }
    },
    methods: {
        lightMode() {
            document.body.style.backgroundColor = '#333';
            this.mode = false;
        },
        darkMode() {
            document.body.style.backgroundColor = 'white';
            this.mode = true;
        }
    }
}).mount("#Mode");

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape")
        Alert.showAlert = false;
    if (Alert.showAlert && (event.metaKey || event.ctrlKey) && event.key === "c")
        navigator.clipboard.writeText(Alert.VCode);
});