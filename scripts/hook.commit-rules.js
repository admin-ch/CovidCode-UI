const NEW_LINE = '\n';
const MAX_LENGTH = 100;
const fs = require('fs');
const types = [
	'feat',
	'fix',
	'refactor',
	'test',
	'docs',
	'showcase',
	'format',
	'chore'
];
const scopes = [
	'generate-code',
	'shared',
	'toolchain'
];

const commitMsg = fs.readFileSync('.git/COMMIT_EDITMSG').toString();
const lines = commitMsg.split(NEW_LINE);
const header = lines[0];

/* FOR FURTHER IMPROVMENTS

const body = ( lines.length >= 3 ) ? lines[2] : '' ;
const footer = ( lines.length >= 5 ) ? lines[4] : '' ; */

lines.forEach((line) => {
	if ( line.length > MAX_LENGTH ) {
		throw new Error(`\n\nCONTENT TOO LONG! EACH LINE LENGTH MUST NOT LONGER THAN ${MAX_LENGTH}, '${line}' EXCEEDS!\n\n`)
	}
});

const regex = new RegExp(`^(${types.join('|')})(\\((${scopes.join('|')})\\))?:`);
if (!regex.test(header)) {
	throw new Error(`\n\nCOMMIT MESSAGE NOT VALID, '${header}' VIOLATES FORMAT! PLEASE CONSIDER README.md\n\n`);
}
