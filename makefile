.PHONY: help
help: makefile
	@tail -n +4 makefile | grep ".PHONY"


node_modules: package.json package-lock.json
	if test ! -d $@; \
	then npm install; \
	fi


index.js: index.ts  | node_modules
	npx tsc


.PHONY: build
build: index.js


.PHONY: test
test: | node_modules
	bun run ./tests/main.ts


clean:
	rm -rf *.js
	rm -rf node_modules
	rm -rf tests/*.wav
