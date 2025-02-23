rm -rf node_modules package-lock.json
echo "node_modules removed"
npm install
echo "node_modules installed"
npm run build
echo "build done"
npx cap sync android
echo "sync done"
npx cap open android
echo "open done"