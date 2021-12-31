// const test = require('../md/test.md');
// .match(/^---$/)

var fs = require('fs')
var path = require('path')
const str = `---
title: 笔尖下的深刻——村上春树
date: 2018-12-28 16:57:33
tags:
---`

// var result = str.match(/---\n([\s\S]*)\n---/)[1];
//   var result = data.replace(/---(\S*)---/g, 'replacement');
// console.log('---------data:',result);



fs.readFile(path.resolve(process.cwd(), './md/test.md'), 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
//   console.log(typeof data, data);
  var result = data.split(/^---\n([\s\S]*)tags:.*\n---\n/);
//   var result = data.replace(/---(\S*)---/g, 'replacement');
  console.log('---------data:',result,result.length);
//   var result = data.replace(/string to be replaced/g, 'replacement');

//   fs.writeFile(someFile, result, 'utf8', function (err) {
//      if (err) return console.log(err);
//   });
});