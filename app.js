const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('./server_config.json');
const fs = require('fs');
const app = express();

// 生成验证码
function generateVerificationCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
}

// 设置文件上传路径
const upload = multer({
    dest: config.File.Path,
    limits: {
        fileSize: 1024 * 1024 * 1024 * config.File.MaxFileSize, // 1GB限制
    }
});

const uploadedFiles = {};

// 自动删除函数
function deleteFileAfterTimeout(verificationCode, timeout) {
    setTimeout(() => {
        const fileInfo = uploadedFiles[verificationCode];
        if (fileInfo) {
            const { storedFilename } = fileInfo;
            const filePath = `${config.File.Path}/${storedFilename}`;

            fs.unlink(filePath, (err) => {
                if (err)
                    console.error('删除文件出错:', err);
                else
                {
                    console.log(`文件 ${storedFilename} 在超时后被自动删除。`);
                    delete uploadedFiles[verificationCode];
                }
            });
        }
    }, timeout);
}

// 设置网站静态目录
app.use(express.static('web'));

app.get('/api/getMaxFileSize', (req, res) => {
    const filePath = path.join(__dirname, 'server_config.json');
    res.sendFile(filePath);
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: '没有文件上传' });
        return;
    }

    if (req.file.size > config.File.MaxFileSize * 1024 * 1024 * 1024) {
        fs.unlinkSync(req.file.path);
        res.status(400).json({ error: `文件大小不能超过${config.File.MaxFileSize}GB` });
        return;
    }
    const verificationCode = generateVerificationCode();
    const originalFilename = req.file.originalname;
    const storedFilename = `${verificationCode}_${originalFilename}`;
    const filePath = `${config.File.Path}/${storedFilename}`;
    fs.renameSync(req.file.path, filePath);
    uploadedFiles[verificationCode] = { storedFilename, originalFilename };
    res.json({ message: '上传成功', verificationCode });
    console.log("上传成功");
    // 自动删除
    if (config.File.AutoDelete) {
        deleteFileAfterTimeout(verificationCode, config.File.AutoDeleteTime * 60000);
    }
});

app.get('/download', (req, res) => {
    const verificationCode = req.query.verificationCode;
    const fileInfo = uploadedFiles[verificationCode];

    if (!fileInfo) {
        res.status(404).json({ error: '验证码无效' });
        return;
    }

    const { storedFilename, originalFilename } = fileInfo;
    const filePath = `${config.File.Path}/${storedFilename}`;
    res.download(filePath, originalFilename, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).json({ error: '下载失败' });
        }
        else
            console.log('下载成功');
    });
});

app.delete('/delete', (req, res) => {
    const verificationCode = req.query.verificationCode;
    const fileInfo = uploadedFiles[verificationCode];

    if (!fileInfo) {
        res.status(404).json({ error: '验证码无效' });
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