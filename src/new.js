const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");

function newArticle(name) {
    const file = fg.sync(`${path.resolve(process.cwd(), "./md")}/${name}.md`, {
		dot: false,
	});
    if(file) {
        console.error(`${name}.md 已存在`);
        return;
    }
    const date = new Date().toLocaleDateString();
    const initContent =
`---
title: ${name}
date: ${date}
tags: 
---

`;
    fs.writeFile(path.resolve(path.resolve(process.cwd()),`./md/${date} ${name}.md`), initContent, (err) => {
        if (err) throw err;
        console.log(`${date} ${name}.md 创建成功`);
    });
}

module.exports = newArticle;