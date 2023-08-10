# Stardrop
🔥 A free and open-source web transfer tool.

English | [简体中文](./README_CH.md) | [繁体中文](./README_CH_Hant.md)

# Introduction
## Stardrop is an efficient web transfer tool with the following features:
- Stardrop allows quick file transfer without the need for a client or account.
- Stardrop can be configured to automatically delete files after a timeout, effectively preventing attackers from maliciously transferring large files to fill up the server's hard disk.
- Administrators can efficiently manage the service using Stardrop's configuration file.
- Stardrop supports file size limitation to prevent insufficient disk space.

## 🔮 Use Cases
### When you want to send a file to a colleague without adding them on a messaging platform, you can upload the file to Stardrop and share the verification code for easy file transfer.

# ⚙️ Configuration File
- 📁 Open the `server_config.json` file.
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
- Port: Set the port number.
- Path: Set the file upload path.
- AutoDelete: Enable or disable automatic file deletion. Set to true to enable and false to disable.
- AutoDeleteTime: Set the time for automatic file deletion.
- CheckFileSize: Enable or disable file size checking. Set to true to enable and false to disable.
- MaxFileSize: Set the maximum file size.
- MaxRequestNumber: Set the maximum number of requests per minute for each user.
- You can modify these values based on your specific needs.

# 🛠️ Deployment
- Install `Node.js`
```shell
brew install node
```
- Create a folder to store the code.
```shell
mkdir Stardrop
```
- Enter the folder.
```shell
cd Stardrop
```
- Clone the repository.
```shell
git clone https://github.com/TechnologyWGJ/Stardrop.git
```
- Initialize `Node.js`
```shell
node init
```
- Install dependencies
```shell
npm install express multer express-rate-limit
```
- Run `app.js`
```shell
node app.js
```
- Open `localhost:xxx` in your web browser.
