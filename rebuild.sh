#!/bin/bash

echo "[" $(for x in *.obj; do printf '"'$(basename $x '.obj')'",'; done ) ' "" ]' | jq '.' > characters.json
