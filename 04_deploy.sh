OUTPUT=$(git rev-parse --abbrev-ref HEAD)
echo "${OUTPUT}"

git add .
git commit -m "before merge with deployBranch"
git push origin $OUTPUT

git checkout deployBranch

<<<<<<< HEAD
git merge OUTPUT
=======
git merge $OUTPUT
>>>>>>> V0.9_fixLocalHost

git add .
git commit -m "Deploy to the System"
git push origin deployBranch