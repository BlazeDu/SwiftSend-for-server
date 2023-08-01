const express = require('express');
const multer = require('multer');
const config = require('./server_config.json');
const fs = require('fs');
const app = express();

// 生成6位纯数字验证码函数
function generateVerificationCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
}

const upload = multer({
    dest: config.File.Path,
});

// 文件信息存储对象
const uploadedFiles = {};

app.use(express.static('web'));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "没有文件上传" });
        return;
    }
    const verificationCode = generateVerificationCode();
    const originalFilename = req.file.originalname;
    const storedFilename = `${verificationCode}_${originalFilename}`;

    // 在这里可以处理上传的文件，比如将其存储到数据库或服务器的特定目录
    const filePath = `${config.File.Path}/${storedFilename}`;
    fs.renameSync(req.file.path, filePath);
    uploadedFiles[verificationCode] = { storedFilename, originalFilename };

    res.json({ message: '文件上传成功', verificationCode });
});

app.get('/download', (req, res) => {
    const verificationCode = req.query.verificationCode;
    const fileInfo = uploadedFiles[verificationCode];

    if (!fileInfo) {
        res.status(404).json({ error: '文件不存在或验证码无效' });
        return;
    }

    const { storedFilename, originalFilename } = fileInfo;
    const filePath = `${config.File.Path}/${storedFilename}`;
    console.log('Download');

    // 使用 res.download() 将文件发送给客户端进行下载
    res.download(filePath, originalFilename, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).json({ error: '文件下载失败' });
        } else {
            console.log('文件下载成功');
        }
    });
});

app.delete('/delete', (req, res) => {
    const verificationCode = req.query.verificationCode;
    const fileInfo = uploadedFiles[verificationCode];

    if (!fileInfo) {
        res.status(404).json({ error: '文件不存在或验证码无效' });
        return;
    }

    const { storedFilename } = fileInfo;
    const filePath = `${config.File.Path}/${storedFilename}`;

    // 删除文件
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            res.status(500).json({ error: '文件删除失败' });
        } else {
            delete uploadedFiles[verificationCode];
            res.sendStatus(200);
        }
    });
});

app.listen(config.Port, () => {
    console.log(`服务已启动\nlocalhost:${config.Port}`);
});