export const chromaticScale = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3']

/**
 * @param {any} Key: The music Key
 * @param {any} scaleType : an Id that references a data structure of different musical modes that alter the output notes. 
 * @returns {array} : A set of strings representing a scale
 */
export function scaleMaker(key, scaleType) {
  let CS = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3']
  let interval = 0;
  const newScale = [];

  // order the chromatic scale to count up from 0, where 0 is the selected key.
  let orderedCS = CS.concat(CS.splice(0, CS.indexOf(key)))

  scaleType.forEach(noteStep => {
    newScale.push(orderedCS[interval])
    interval += noteStep
  })

  // add the root note to become a tonic --> replacing the octave number.
  newScale.push(newScale[0])

  for (let i = newScale.length - 1; i >= newScale.length - 3; i--) {
    var newNote = newScale[i].replace("3", "4")
    newScale[i] = newNote
  }

  return newScale;
}