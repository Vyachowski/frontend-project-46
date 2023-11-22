### Hexlet tests and linter status:
[![Actions Status](https://github.com/Vyachowski/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Vyachowski/frontend-project-46/actions)
[![Actions Status](https://github.com/Vyachowski/frontend-project-46/workflows/Node%20CI/badge.svg)](https://github.com/Vyachowski/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/a626066198bb2e936921/maintainability)](https://codeclimate.com/github/Vyachowski/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a626066198bb2e936921/test_coverage)](https://codeclimate.com/github/Vyachowski/frontend-project-46/test_coverage)

# Hexlet JS Project – Генератор разницы в JSON файлах

Проект в рамках обучения на курсе «фронтэнд-разработчик» школы «Хекслет». На примере проекта изучается функции высшего порядка, рекурсия и настройка окружения.

For **Readme in English** please follow [this link](https://github.com/Vyachowski/frontend-project-46/blob/main/README.md)

## Описание

NPM библиотека и утилита для коммандной строки, позволяющая показывать разницу между JSON (также YML/YAML) файлами в разных форматах.

## Инструкция

### Зависимости

* Node.js
* NPM менджер пакетов как часть Node.js

### Установка

* Клонируйте репозиторий гитхаб командой

```sh
git clone https://github.com/Vyachowski/frontend-project-46.git
```

или

```sh 
git clone git@github.com:Vyachowski/frontend-project-46.git
```
для ssh
* В корневой директории репозитория выполните
```sh 
npm ci
```
* И потом выполните команду
```sh 
npm link
```
чтобы запускать из командной строки
* После работы с спрограммой:
```sh
npm remove -g @hexlet/code
```
Чтобы удалить пакет из глобальных зависимостей

### Запуск программы

Проект запускается командой:
```sh
make gendiff [filePath1] [filePath2]
```

___

___

### Демонстрация работы

#### Интерфейс Gendiff

[![asciicast](https://asciinema.org/a/622629.svg)](https://asciinema.org/a/622629)

#### Вывод разницы в JSON (без опций)

[![asciicast](https://asciinema.org/a/622632.svg)](https://asciinema.org/a/622632)

#### Вывод разницы в JSON (с опциями)

[![asciicast](https://asciinema.org/a/622633.svg)](https://asciinema.org/a/622633)
