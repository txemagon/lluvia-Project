#!/bin/bash
# make-doc.sh

jsduck ../src/kernel/*.js ../src/kernel/extra-doc/*.js ../src/engine/*.js --output apidoc/v1.0

