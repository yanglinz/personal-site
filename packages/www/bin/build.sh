
yarn astro build

# This is a silly hack specifically for vercel builds, where
# dynamically generated image assets in `public` dir is not
# taken into account during the final output generation.
# By adding a second build, we make sure that `public` is properly
# populated with images at the beginning of the build.
if [[ "$CI" == "1" ]]; then
  yarn astro build
fi
