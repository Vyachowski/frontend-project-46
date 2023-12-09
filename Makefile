install:
	npm ci
gendiff:
	bin/gendiff.js
publish:
	npm publish --dry-run
test:
	npm run test
lint:
	npx eslint .
test-coverage:
	npm test -- --coverage --coverageProvider=v8
