# SwiftSend

🔥 一個免費且開源的網頁傳輸工具。

繁体中文 | [简体中文](./README_CH.md) | [English](./README.md)

# 簡介
## SwiftSend是一個高效的Web傳輸工具
- SwiftSend無需客戶端，無需帳號，即可快速傳輸文件
- SwiftSend可以配置文件超時後自動刪除，有效防止攻擊者惡意向伺服器傳輸大量大文件，將伺服器硬盤佔滿
- 管理員可以通過SwiftSend配置文件，高效管理服務
- SwiftSend支持對文件大小進行限制，防止硬盤空間不足

## 使用場景
### 你想給同事傳一份文件，又不想加對方QQ，則可以將文件上傳到SwiftSend，告訴對方驗證碼就可以實現傳輸文件

# 配置文件
- 打開 `server_config.json` 文件
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
- `Port` 設置端口
- `Path` 設置文件上傳路徑
- `AutoDelete` 是否開啟文件自動刪除，true為開啟，false為關閉
- `AutoDeleteTime` 設置自動刪除文件的時間
- `CheckFileSize` 是否開啟文件大小檢測，true為開啟，false為關閉
- `MaxFileSize` 設置文件最大大小
- `MaxRequestNumber` 設置用戶1分鐘最大請求次數
可以根據實際情況更改

# 部署
- 安裝 `Node.JS`
```shell
brew install node
```
- 創建一個文件夾，用來存放代碼
```shell
mkdir SwiftSend
```
- 進入文件夾
```shell
cd SwiftSend
```
- 克隆倉庫
```shell
git clone https://github.com/TechnologyWGJ/SwiftSend.git
```
- `npm` 初始化
```shell
npm init
```
- 安裝依賴
```shell
npm install express multer express-rate-limit
```
- 運行 `app.js`
```shell
node app.js
```
- 打開 `localhost:xxx`
