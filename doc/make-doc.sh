#!/bin/bash
# make-doc.sh


jsduck --config=lluviadoc.json
cp apidoc/resources/images/favicon.ico apidoc/v1.0/
sed -i 's/\.ico/.ico?v=2/' apidoc/v1.0/template.html
cp apidoc/resources/images/blue_logo_20.png apidoc/v1.0/resources/images/logo.png
cp apidoc/resources/images/blue_logo_150.png apidoc/v1.0/resources/images/logo-screen-noglow.png

