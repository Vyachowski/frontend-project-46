### Hexlet tests and linter status:
[![Actions Status](https://github.com/Vyachowski/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Vyachowski/frontend-project-46/actions)
[![Actions Status](https://github.com/Vyachowski/frontend-project-46/workflows/Node%20CI/badge.svg)](https://github.com/Vyachowski/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/a626066198bb2e936921/maintainability)](https://codeclimate.com/github/Vyachowski/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a626066198bb2e936921/test_coverage)](https://codeclimate.com/github/Vyachowski/frontend-project-46/test_coverage)

# Hexlet JS Project – JSON Difference generator
![Cover image for project](https://github.com/Vyachowski/frontend-project-46/blob/main/cover.png)
This project is centered around concepts like higher-order functions, recursion, and configuring the environment.

Чтобы читать **Readme на русском**  перейдите по [этой ссылке](https://github.com/Vyachowski/frontend-project-46/blob/main/README_ru.md)

## Description

Library and CLI application for comparing JSON structures, providing a seamless way to visualize and analyze differences.

## Getting Started

### Dependencies

* Node.js
* NPM Package Manager as a part of Node.js

### Installing

* Clone a GitHub repository via

```sh
git clone https://github.com/Vyachowski/frontend-project-46.git
```

or

```sh 
git clone git@github.com:Vyachowski/frontend-project-46.git
```
for ssh
* Run in a root directory of the project
```sh 
npm ci
```
* And than execute
```sh 
npm link
```
to run project via command line easily
* After your work with a project you can perform
```sh
npm remove -g @hexlet/code
```
to uninstall package from the npm global dependencies

### Executing program

You can run the project with:
```sh
make gendiff [filePath1] [filePath2]
```

___

___

### Project demo

#### CLI of Gendiff

[![asciicast](https://asciinema.org/a/622629.svg)](https://asciinema.org/a/622629)

#### Show difference between JSON in default format

[![asciicast](https://asciinema.org/a/622632.svg)](https://asciinema.org/a/622632)

#### Show difference between JSON with options

[![asciicast](https://asciinema.org/a/622633.svg)](https://asciinema.org/a/622633)
