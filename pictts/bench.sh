echo "NEW=====================" >> benchmark.txt
git checkout $1
npm test -- src/benchmark1.test.ts
echo "MAIN=====================" >> benchmark.txt
git checkout main
npm test -- src/benchmark1.test.ts
echo "NEW=====================" >> benchmark.txt
git checkout $1
npm test -- src/benchmark1.test.ts
echo "MAIN=====================" >> benchmark.txt
git checkout main
npm test -- src/benchmark1.test.ts
