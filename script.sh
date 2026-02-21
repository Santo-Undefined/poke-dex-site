#! /bin/bash

# This script updates the pokemon_local_data.txt
# Updates the index.html and other html pages
# Then runs deno formatter on all the html files

# Updates pokemon_local_data.txt
# deno -A src/update_pokemon_details.js #not needed all the time

# Creates index.html and types pages
deno -A src/create_HTML_pages.js

# formatting all pages
deno fmt *.html