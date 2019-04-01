npm --no-git-tag-version version patch
auto-changelog --commit-limit 10 --ignore-commit-pattern '/changelog|CHANGELOG|readme|README|version|/i'
version=$(node -p "require('./package.json').version")
git add *
git commit -m "Update version (v$version)"
git push
git tag -a v$version -m "Update version (v$version)"
git push --tags origin master
npm publish