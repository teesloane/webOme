import parser from 'note-parser'

export const chromaticScale = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3']

/**
 * @param {any} Key: The music Key
 * @param {any} scaleType : an Id that references a data structure of different musical modes that alter the output notes. 
 * @returns {array} : A set of strings representing a scale
 */
export function scaleMaker(key, scaleType) {
  if (!key || !scaleType) return

  let CS = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3']
  let interval = 0;
  const newScale = [];

  // order the chromatic scale to count up from 0, where 0 is the selected key. if key of "E", CS[0] === "E3"
  let orderedCS = CS.concat(CS.splice(0, CS.indexOf(key)))

  scaleType.forEach(noteStep => {
    newScale.push(orderedCS[interval])
    interval += noteStep
  })

  // add the root note to become a tonic --> replacing the octave number.
  newScale.push(newScale[0])

  return scaleParser(newScale);
}


/**
 * 
 * ScaleMaker
 * @param {array} arr - receive an array of scale notes as strings example: ['C3', 'D#3']
 * @returns Array of notes converted to midi numbers and formatted to make sure next-octaves are accounted for. 
 * @description the scale parser needs to account for scales starting in different keys, and thus, that scale reaching
 * different octaves at different points in the scale. 
 */
export function scaleParser(arr) {
  let midiScale = arr.map(note =>  parser.midi(note))
  let prevNote = midiScale[0]

  return midiScale.map((note, index, arr) => {
    if (note < prevNote || (note === prevNote && index === arr.length - 1)) {
      prevNote = note + 12
      return parser.midi(prevNote)
    }
    return note
  })
}
