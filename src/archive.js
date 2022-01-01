const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
// const md = require("./markdown-it/lib/index");
const meta = require("markdown-it-meta/meta");
const md = require('turpan');

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
	let fileContent = fs.readFileSync(uri, "utf8");
	const result = fileContent.split(/^---\n([\s\S]*tags:.*)\n---\n/);
	const metaData = result[1];
	const metaDataList = metaData.split("\n");
	const title = metaDataList[0].substring(7);
	let metaDataObj = {
		title: title,
		date: metaDataList[1].substring(6),
		tags: metaDataList[2].substring(6)
	};
	console.log(metaDataObj);
	metaList.push(metaDataObj);
	const HTMLContent = md.render(result[2]);
	fs.writeFile(
		path.resolve(
			path.resolve(process.cwd()),
			`./dist/${title}.html`
		),
		header + HTMLContent + footer,
		(err) => {
			if (err) throw err;
			console.log(`${title} 编译成功`);
		}
	);
});

console.log(metaList);

function renderTags(tags) {
	const tagList = tags.split(' ').map(tag => {
		return `
		<a class="tag">${tag}</a>
		`
	});
	return tagList.join('')
}

function createIndex() {
	const list = metaList.map(item => {
		return `
		<div class="post-link-wrapper">
			<a href="${item.title}.html" class="post-link">${item.title}</a>
			<div class="post-meta">
			<div class="post-tags">
				<div>
				${item.tags? renderTags(item.tags) : ''}
				</div>
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
	
	
	fs.writeFile(path.resolve(path.resolve(process.cwd()),`./dist/about.html`), header + HTMLContent, (err) => {
        if (err) throw err;
        console.log('/dist/about.html has been saved!');
    });
}

createIndex();
createAbout();