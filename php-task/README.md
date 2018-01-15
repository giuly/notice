# PHP Notice Task Assignemnt

## Requirements

Write a method, that can get rss feed, parse it, and return array with parsed data.

Requirements to logic:
1. All item->enclosure url images must be downloaded into our images folder.
2. We need to rename image file into a unique hash (md5, sha1, etc... you decide which approach to use here).
- if image is already in our images folder, it is used, and we do NOT download duplicate
- we use this image hash in response, instead of original url
3. We need a response ($dataJson) in JSON format, that will contain an array of item->title => item->enclosure url attribute. Example: 'Test title' => '/images/{image hashed name}'

### Prerequisites

mkdir images - you need to create 'images' folder in the root of the task, next to inedx.php file

Nginx/Apache server and php-fpm/php

## Run

Just access index.php and an output with the JSON response will be printed.

## Description

* I used 2 classes: Item and SportFeed in order to create 2 separate entities. SportFeed has several methods to parse and process the RSS feed. There are some Exceptions handled, if actions like fail to save file in a folder or invalid RSS url arises.
* I took this approach due to maintainability reason and the posiblity to add new functionalities.

