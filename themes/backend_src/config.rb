# Set this to the root of your project when deployed:
http_path = (environment == :production) ? "/" : "/beyond/"
css_dir = "generated/css/"
sass_dir = "src/app"
images_dir = "src/assets/images"
generated_images_dir = "generated/sprites"
http_generated_images_path = (environment == :production) ? "/generated/sprites" : "/beyond/generated/sprites"
javascripts_dir = "generated/js/"
fonts_dir = "fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true

#sass_options = {:debug_info => true}

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
