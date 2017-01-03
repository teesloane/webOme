export const KEYS_SELECTOR = [
  { label: 'C',  value:   'C3' }, 
  { label: 'C#', value:  'C#3' }, 
  { label: 'D',  value:   'D3' }, 
  { label: 'D#', value:  'D#3' }, 
  { label: 'E',  value:   'E3' }, 
  { label: 'F',  value:   'F3' }, 
  { label: 'F#', value:  'F#3' }, 
  { label: 'G',  value:   'G3' }, 
  { label: 'G#', value:  'G#3' }, 
  { label: 'A',  value:   'A3' }, 
  { label: 'A#', value:  'A#3' }, 
  { label: 'B',  value:   'B3' },
]

export const SCALES = [
  { label: "Major",            value: [2, 2, 1, 2, 2, 2, 1] },
  { label: 'Natural Minor',    value: [2, 1, 2, 2, 1, 2, 2] },
  { label: 'Harmonic Minor',   value: [2, 1, 2, 2, 1, 2, 2] },
  { label: 'Dorian',           value: [2, 1, 2, 2, 2, 1, 2] },
  { label: 'Mixolydian',       value: [2, 1, 2, 2, 1, 3, 1] },
]

export const GRID = [
  { label: "1"  , value: 1 },
  { label: "1/2", value: 2 },
  { label: "1/4", value: 4 },
  { label: "1/8", value: 8 },
]

// create a enum of midi note to scale note value. ie: midiNoteEnum = {0: "C0", 1: "C#0"}
export const midiToNote = function() {
  let midiNoteEnum = {}
  let scaleNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  let scaleIndex = 0
  
  for (let i = 0; i < 128; i++ ) {
    let octave = Math.floor(i / 12)
    if (scaleIndex > 11) scaleIndex = 0 
    midiNoteEnum[i] = scaleNotes[scaleIndex] + octave
    scaleIndex ++
  }

  return midiNoteEnum
}()
