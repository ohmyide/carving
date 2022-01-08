const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const md = require('turpan');

function renderTags(tags) {
	const tagList = tags.split(' ').map(tag => {
		return `
		<a class="tag">${tag}</a>
		`
	});
	return tagList.join('')
}

let header = fs
		.readFileSync(path.resolve(path.resolve(process.cwd()), `src/header.txt`))
		.toString();
let footer = fs
	.readFileSync(path.resolve(path.resolve(process.cwd()), `src/footer.txt`))
	.toString();

function createIndex() {
	const entries = fg.sync(`${path.resolve(process.cwd(), "./md")}/**.md`, {
		dot: false,
	}).reverse();
	console.log(entries);
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
		metaList.push(metaDataObj);
		const HTMLContent = md.render(result[2]);
		const articleTitle = header.replace(/<title><\/title>/g, `<title>${title} - Oh My IDE</title>`);
		fs.writeFile(
			path.resolve(
				path.resolve(process.cwd()),
				`./dist/${title}.html`
			),
			articleTitle + HTMLContent + footer,
			(err) => {
				if (err) throw err;
				console.log(`${title} 编译成功`);
			}
		);
	});

	console.log(metaList);

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
		
	const indexTitle = header.replace(/<title><\/title>/g, '<title>Oh My IDE - The best place to learn IDE development</title>');
	fs.writeFile(path.resolve(path.resolve(process.cwd()),`./dist/index.html`), indexTitle + list.join('') + footer, (err) => {
        if (err) throw err;
        console.log('/dist/index.html has been saved!');
    });
}

function createAbout() {
	const aboutTitle = header.replace(/<title><\/title>/g, '<title>Oh My IDE - The best place to learn IDE development</title>');
	let about = fs.readFileSync(path.resolve(path.resolve(process.cwd()), `src/about.txt`)).toString();
	fs.writeFile(path.resolve(path.resolve(process.cwd()),`./dist/about.html`), aboutTitle + about, (err) => {
        if (err) throw err;
        console.log('/dist/about.html has been saved!');
    });
}

module.exports = {
	createIndex,
	createAbout
}