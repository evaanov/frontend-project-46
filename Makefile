install:
	npm ci 

gendiff: 
	node gendiff.js -h


lint: 
	npx eslint .

test:
	npm run test