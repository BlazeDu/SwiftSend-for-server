@echo off

where git >nul 2>nul
if %errorlevel% == 0 (
    git clone https://github.com/TechnologyWGJ/Airdrop.git
    color 2
    echo Clone successful
    cd Airdrop
    where node >nul 2>nul
    if %errorlevel% == 0 (
        node init
        npm install express multer express-rate-limit
        echo Node.js dependencies installation completed.
        color 6
        set /p choose=Run the project? [y/n]:
        if "%choose%" == "y" (
            node app.js
        )
    )
    else
    (
        color 4
        echo Node.js is not installed in your system, please install it manually.
    )
)
else
(
    color 4
    echo Git is not installed in your system, please install it manually.
)