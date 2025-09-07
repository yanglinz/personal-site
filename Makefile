.PHONY: default
default:
	@true

.PHONY: build
build:
	@node_modules/.bin/task build
