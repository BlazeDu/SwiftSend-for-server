# Airdrop
🔥 一个免费开源的Web传输工具

简体中文 | [繁体中文](./README_CH_Hant.md) | [English](./README.md)

# 简介
## Airdrop是一个高效的Web传输工具
- Airdrop无需客户端,无需账号,即可快速传输文件
- Airdrop可以配置文件超时后自动删除,有效防止攻击者恶意向服务器传输大量大文件,将服务器硬盘占满
- 管理员可以通过Airdrop配置文件,高效管理服务
- Airdrop支持对文件大小进行限制,防止硬盘空间不足
## 🔮 使用场景
### 你想给同事传一份文件,又不想加对方QQ,则可以将文件上传到Airdrop,告诉对方验证码就可以实现传输文件

# ⚙️ 配置文件
- 📁 打开`server_config.json`文件
```json
{
    "Port": 3000,
    "File": {
        "Path": "File/",
        "AutoDelete": true,
        "AutoDeleteTime": 10,
        "CheckFileSize": false,
        "MaxFileSize": 1
    },
    "ServerSafe": {
        "MaxRequestNumber": 10
    }
}
```
- Port 设置端口
- Path 设置文件上传路径
- AutoDelete 是否开启文件自动删除,true为开启,false为关闭
- AutoDeleteTime 设置自动删除文件的时间
- CheckFileSize 是否开启文件大小检测,true为开启,false为关闭
- MaxFileSize 设置文件最大大小
- MaxRequestNumber 设置用户1分钟最大请求次数
- 可以根据实际情况更改

# 🛠️ 部署
- 安装`Node.JS`
```shell
brew install node
```
- 创建一个文件夹,用来存放代码
```shell
mkdir Airdrop
```
- 进入文件夹
```shell
cd Airdrop
```
- 克隆仓库
```shell
git clone https://github.com/TechnologyWGJ/Airdrop.git
```
- `Node.JS`初始化
```shell
node init
```
- 安装依赖
```shell
npm install express multer express-rate-limit
```
- 运行`app.js`
```shell
node app.js
```
- 打开`localhost:xxx`
