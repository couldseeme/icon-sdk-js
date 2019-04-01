npm --no-git-tag-version version patch
regex=$(cat <<< "
changelog|
\bUpdate\sCHANGELOG.md\b|
Update\sbuild|
readme|
README|
Add\stest\scase|
Update\sversion\s\(v0.0.7\)|
Update\sCHANGELOG.md\s\(v0.0.9\)|
/i
")
auto-changelog \
    --package \
    --commit-limit false \
    --template keepachangelog \
    --ignore-commit-pattern "${regex//[[:space:]]/}" \
    --starting-commit '36ac2d6c0b9e5059b549cbb0f2a57184c5270387'
version=$(node -p "require('./package.json').version")
npm run build
git checkout master
git add *
git commit \
    -m "Update version (v$version) [ci skip]"
git push https://$GITHUB_TOKEN@github.com/couldseeme/icon-sdk-js master
git tag \
    -a v$version
git push https://$GITHUB_TOKEN@github.com/couldseeme/icon-sdk-js v$version