#!/bin/bash
npm install -g supervisor
supervisor -e 'js|html' --ignore ./nodemodules ./index.js
