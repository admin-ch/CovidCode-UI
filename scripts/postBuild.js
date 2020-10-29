const fs = require('fs');
const path =  'dist/public/assets/styles/images';
if (fs.existsSync(`${path}/images`)) {
	fs.readdirSync(`${path}/images`).forEach(file => fs.renameSync(`${path}/images/${file}`, `${path}/${file}`));
	fs.rmdirSync(`${path}/images`);
}
