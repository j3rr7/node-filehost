# Simple File Sharing via Network

## Description

Aims to provide a simple and convenient way to share files over the network. This project allows users to host the file sharing service on their own devices, such as a PC or mobile phone, and easily transfer files between different devices.

The project is built using the following technologies:

- [tinyhttp](https://tinyhttp.v1rtl.site/) - a minimalist Node.js framework for building web applications.
- [htmx](https://htmx.org/)  - a JavaScript library for building web pages with minimal JavaScript.
- [alpine.js](https://github.com/alpinejs/alpine) - a lightweight JavaScript framework for building UI components.
- [bootstrap](https://getbootstrap.com/) - a popular CSS framework for building responsive websites.
- [halfmoon](https://www.gethalfmoon.com/) - a front-end framework for building user interfaces.

## Story

Imagine a scenario where you need to transfer a file from your PC to your mobile phone. Instead of relying on cloud storage or external services, you can simply host this file sharing service on your PC and access it from your mobile phone using the IP address. Similarly, you can also host the service on your mobile phone using Termux (a terminal emulator for Android) and upload files directly to your phone.

With this project, you can easily share files within your local network without the need for external servers or complicated setups. It provides a user-friendly interface powered by modern web technologies, making file sharing a breeze.

## How to Use

1. Clone or download the project from the repository.
2. Install the required dependencies by running `npm install`.
3. Start the server by running `npm start`.
4. Open the provided IP address in your web browser to access the file sharing interface.
5. Follow the instructions on the interface to upload and download files.

### Termux Tutorial

1. Install Termux on your Android device.
2. Open Termux and run the following command to install Node.js: `pkg install nodejs-lts`
3. Install the project's dependencies by running `npm i` in Termux.
4. Start the server by running `npm start`.
5. From the Termux console, note the IP address provided by the server.
6. If the port is blocked, make sure to allow it in your device's firewall settings.
7. On another device within the same local network, open a web browser and enter the IP address noted from the previous step.


### Feel free to customize and modify the project according to your needs.