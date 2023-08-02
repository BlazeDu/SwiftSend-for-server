# Airdrop
一个免费开源的Web传输工具

# 简介
## Airdrop是一个高效的Web传输工具
- Airdrop无需客户端,无需账号,即可快速传输文件
- Airdrop可以配置文件超时后自动删除,有效防止攻击者恶意向服务器传输大量大文件,将服务器硬盘占满
## 使用场景
### 你想给同事传一份文件,又不想加对方QQ,则可以将文件上传到Airdrop,告诉对方验证码就可以实现传输文件

# 配置文件
- 打开server_config.json文件
```json
{
    "Port": 3000, // 设置端口
    "File": {
        "Path": "File/", // 上传的文件存储路径
        "AutoDelete": true, // 是否开启文件超时自动删除,true为开启,false为关闭
        "AutoDeleteTime": 10 // 设置文件超时的时长,单位:min(分)
    }
}
```
- 可以根据实际情况更改

# 部署
- 安装Node.JS
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
- Node.JS初始化
```shell
node init
```
- 安装依赖
```shell
npm install express
npm install multer
```
- 运行app.js
```shell
node app.js
```
- 打开localhost:xxx
