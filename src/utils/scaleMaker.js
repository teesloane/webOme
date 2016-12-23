var chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// whole notes = 2, half notes = 1
var major = [2, 2, 1, 2, 2, 2, 1] 


/**
 * @param {any} Key: The music Key
 * @param {any} scaleType : an Id that references a data structure of different musical modes that alter the output notes. 
 * @returns {array} : A set of strings representing a scale
 */
function scaleMaker(key, scaleType) {
  let CS = chromaticScale
  let interval = 0;
  const newScale = [];  
  
  // order the chromatic scale to count up from 0, where 0 is the selected key.
  let orderedCS = CS.concat(CS.splice(0, CS.indexOf(key)))
  scaleType.forEach(noteStep => {    
    newScale.push(orderedCS[interval])
    interval += noteStep
  }) 

  return newScale;
}

scaleMaker("E", major)
