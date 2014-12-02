#!/bin/sh
 
FILES="libs/sha256.js libs/aes.js libs/enc-base64-min.js libs/pbkdf2.js libs/enc-utf16-min.js libs/core-min.js libs/jquery-1.11.0.js \
	   libs/bootstrap.min.js libs/faye-browser-min.js libs/pnotify.custom.min.js\
	   libs/profile-ti.js js/main.js js/configuration.js js/helpers.js js/notification.js js/profile.js js/storage.js js/security.js \
	   js/localization.js js/gateway.js js/alias.js"

MININFIED_JS="js/butler.min.js"
echo "Uglifying and minifying JS files..."
/usr/local/share/npm/bin/uglifyjs $FILES -o $MININFIED_JS

echo "Copying butler.min.js to the live folder"
cp $MININFIED_JS live/js/

echo "Copying butlerui.css to the live folder"
cp css/butlerui.css live/css
cat css/pnotify.custom.min.css >> live/css/butlerui.css 

echo "Preparing the SmartMobile web skeleton"
cp skeleton.html skeleton/index.html
cp live/js/butler.min.js skeleton/js
cp live/css/butlerui.css skeleton/css
cp server.js skeleton
tar cvzf butlerjs-skeleton.tgz skeleton

echo "Done!"
