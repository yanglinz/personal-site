package(default_visibility = ["//visibility:public"])

filegroup(
    name = "node_modules",
    srcs = glob(
        include = ["node_modules/**/*"],
        exclude = [
          # Files under test & docs may contain file names that
          # are not legal Bazel labels (e.g.,
          # node_modules/ecstatic/test/public/中文/檔案.html)
          "node_modules/test/**",
          "node_modules/docs/**",
          # Files with spaces are not allowed in Bazel runfiles
          # See https://github.com/bazelbuild/bazel/issues/4327
          "node_modules/**/* */**",
          "node_modules/**/* *",
        ],
    ),
)
