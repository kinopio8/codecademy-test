// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

console.log('testing');

// Factory function
const pAequorFactory = (num, dnaBase) => {
  return {
    specimenNum: num,
    dna: dnaBase,
    /* task 4 */
    mutate() {
      let mutateIndex = Math.floor(Math.random() * this.dna.length);
      /* keep randomize */
      let newMutant = returnRandBase();
      console.log(`index of mutation is at ${mutateIndex}`);
      while (newMutant === this.dna[mutateIndex]) {
        newMutant = returnRandBase();
        console.log(`new DNA is the same, mutating...`);
      }
      console.log(`dna at index ${mutateIndex} is ${this.dna[mutateIndex]}`);
      this.dna[mutateIndex] = newMutant;
      console.log(
        `dna at index ${mutateIndex} mutated to ${this.dna[mutateIndex]}`
      );
    },
    /* task 5 */
    compareDNA(pAequor) {
      let similarity = 0;
      for (let x = 0; x < this.dna.length; x++) {
        if (this.dna[x] === pAequor.dna[x]) similarity++;
      }
      /* Calculate similarity percentage */
      similarity = ((similarity / this.dna.length) * 100).toFixed();
      console.log(
        `specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${similarity}% DNA in common`
      );
    },
    /* task 6 */
    willLikelySurvive() {
      /* 60% equates to larger than or equal to 9 occurances */
      let cCount = 0;
      let gCount = 0;
      this.dna.forEach((dnaEntry) => {
        if (dnaEntry === 'C') {
          cCount++;
        }
      });
      this.dna.forEach((dnaEntry) => {
        if (dnaEntry === 'G') {
          gCount++;
        }
      });
      return gCount >= 9 || cCount >= 9;
    },
  };
};

let testStrand = mockUpStrand();
console.log(`testStrand is: ${testStrand}`);
let newSpecimen = pAequorFactory(1, testStrand);
console.log(`specimen 1 has dna ${newSpecimen.dna}`);
/* task 4 */
newSpecimen.mutate();
console.log(`specimen 1 mutated dna ${newSpecimen.dna}`);

/* task 5 */
let testStrand2 = mockUpStrand();
let newSpecimen2 = pAequorFactory(2, testStrand2);
let testStrand3 = mockUpStrand();
let newSpecimen3 = pAequorFactory(3, testStrand3);
console.log(`specimen 2 dna: ${newSpecimen2.dna}`);
console.log(`specimen 3 dna: ${newSpecimen3.dna}`);
newSpecimen2.compareDNA(newSpecimen3);

/* task 6 */
let testStrand4 = mockUpStrand();
let newSpecimen4 = pAequorFactory(4, testStrand4);
console.log(`specimen 4 dna: ${newSpecimen4.dna}`);
console.log(`specimen 4 survivability is ${newSpecimen4.willLikelySurvive()}`);

/* task 7 */
let pAequorCount = 1;
let pAequorArray = [];
while (pAequorCount !== 3) {
  let newSpecimen0 = pAequorFactory(pAequorCount, mockUpStrand());
  if (newSpecimen0.willLikelySurvive() === true) {
    pAequorCount++;
    pAequorArray.push(newSpecimen0);
  }
}
console.log(`specimens array`);
for (let x = 0; x < pAequorArray.length; x++) {
  console.log(`specimen ${pAequorArray[x].specimenNum} ` + pAequorArray[x].dna);
}
