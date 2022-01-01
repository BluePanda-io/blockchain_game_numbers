OUTPUT=$(git rev-parse --abbrev-ref HEAD)
echo "${OUTPUT}"

git add .
git commit -m "before merge with deployBranch"
git push origin $OUTPUT

git checkout deployBranch

git merge $OUTPUT

git add .
git commit -m "Deploy to the System"
git push origin deployBranch