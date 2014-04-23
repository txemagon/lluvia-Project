#!/bin/bash
# image_for
#
# Usage: ./image_for file.output_format
#
# Example: Given: straight_line.tex
#          Type: ./image_for straight_line.png
# for a png output.
# dvipng shall exist.
# dvipdf shall exist for a pdf output and so on.

filename=$(basename "$1")
outputextension="${filename##*.}"
name="${filename%.*}"

declare -A options=( [png]="-o $name.$outputextension" [pdf]="$name.$outputextension" [ps]="-o $name.$outputextension")
if [ ! -d tmp ]; then
   	mkdir tmp;
fi;

sed "s/__input_image__/${name}/" image_template.tex | latex -output-directory=tmp > /dev/null

case "$outputextension" in
	"dvi" ) mv tmp/texput.dvi "$name.$outputextension"
		;;
    * ) "dvi$outputextension" tmp/texput.dvi ${options["$outputextension"]}
		;;
esac


rm -rf tmp

display "$name.$outputextension"


