#!/usr/bin/env node
const carving = require('./src/archive');
const newArticle = require('./src/new');

const arg = process.argv;
if(!arg[2]) {
    carving.createIndex();
    carving.createAbout();
} else if(arg[2] === 'new') {
    if(arg[3]) {
        newArticle(arg[3]);
    } else {
        console.error('请输入文章标题');
    }
}