#!/bin/bash
# Setting up conductor
#npm start
# open "http://say.nuum.co/conductor"
# open "http://say.nuum.co/usher"

for i in {0..15}
do
  open -na "Firefox" --args --new-window "http://say.nuum.co"
done
exit 0
