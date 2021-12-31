const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const md = require("./markdown-it/lib/index");
const meta = require("markdown-it-meta/meta");
console.log("./markdown-it/lib/index=========");
// const md = require('turpan');

let header = fs
	.readFileSync(path.resolve(path.resolve(process.cwd()), `src/header.txt`))
	.toString();
let footer = fs
	.readFileSync(path.resolve(path.resolve(process.cwd()), `src/footer.txt`))
	.toString();
const entries = fg.sync(`${path.resolve(process.cwd(), "./md")}/**.md`, {
	dot: false,
});
console.log("entries:", entries);
const metaList = [];
entries.forEach((uri) => {
	console.log(path.basename(uri));
	// console.log(path.extname(uri));
	let fileContent = fs.readFileSync(uri, "utf8");
	// console.log('fileContent:', typeof fileContent,fileContent);
	var result = fileContent.split(/^---\n([\s\S]*tags:.*)\n---\n/);
	const metaData = result[1];
	console.log(metaData.split("\n"));
	const metaDataList = metaData.split("\n");
	let obj = {
		title: metaDataList[0].substring(7),
		date: metaDataList[1].substring(6),
		tags: metaDataList[2].substring(6)
	};
	console.log(obj);
	metaList.push(obj);
	console.log("metaData==========:", metaData);
	console.log("metaData<<<<<<<<<<<<<<:");
	console.log("result[1]:", result[2]);
	const HTMLContent = md.render(result[2]);
	console.log("HTMLContent:", HTMLContent);
	fs.writeFile(
		path.resolve(
			path.resolve(process.cwd()),
			`./dist/${path.basename(uri)}.html`
		),
		header + HTMLContent + footer,
		(err) => {
			if (err) throw err;
			console.log("The file has been saved!");
		}
	);
	// fs.writeFile(path.resolve(path.resolve(process.cwd()),`../dist`),header + HTMLContent + footer);
});

console.log(metaList);

function createIndex() {
	const list = metaList.map(item => {
		return `
		<div class="post-link-wrapper">
			<a href="${item.title}.md.html" class="post-link">${item.title}</a>
			<div class="post-meta">
			<div class="post-tags">
				<a class="tag" href="">${item.tags}</a>
				<span>${item.date}</span>
			</div>
			
			</div>
		</div>
		`
	})
		
	
	fs.writeFile(path.resolve(path.resolve(process.cwd()),`./dist/index.html`), header + list.join('') + footer, (err) => {
        if (err) throw err;
        console.log('/dist/index.html has been saved!');
    });
}

function createAbout() {
	let fileContent = fs.readFileSync(path.resolve(process.cwd(),`./src/about.md`), "utf8");
	const HTMLContent = md.render(fileContent);
	
	
	fs.writeFile(path.resolve(path.resolve(process.cwd()),`./dist/about.html`), header + HTMLContent + footer, (err) => {
        if (err) throw err;
        console.log('/dist/about.html has been saved!');
    });
}

createIndex();
createAbout();