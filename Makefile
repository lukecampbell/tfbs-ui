.PHONY: bundle

bundle: $(wildcard src/**/*.js)
	npm run build
