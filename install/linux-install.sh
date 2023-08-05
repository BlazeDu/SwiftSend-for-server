#!/bin/bash

if command -v git &>/dev/null; then
    git clone https://github.com/TechnologyWGJ/Airdrop.git
    echo -e "\033[32mClone successfu\033[0m"
    cd Airdrop
    if command -v node &>/dev/null; then
        node init
        npm install express multer express-rate-limit
        echo -e "\033[32mNode.js dependencies installation completed.\033[0m"
        echo "Run the project?[y/n]:"
        read choose
        if [ $choose == "y" ]; then
            node app.js
        fi
    else
        echo -e "\033[31mNode.js is not installed in your system, please install it manually.\033[0m"
fi
else
    echo -e "\033[31mGit is not installed in your system, please install it manually.\033[0m"
fi