 - you have 64 keys in the midiNotes array
- you loop through them and render a button with an id for each one. 
- the number of columns you want to have should be calculated from something in the state. 
- the mode / patch you have are going to change what notes are on what button.

# Example mode: Standard sequencer:

- one row -- all notes/buttons are the same pitch. 
- adding colums would be the equivalent to adding another step in the sequencer. 


# Current goal:

- display the buttons in a 8x8 grid
- make all buttons in one row the same pitch
- create sequencer
  - create a @observable currentStep state.
  - each timeOut -> step forward in currentStep, 
  - use the currentStep to get the current notes (`gatherNotes()`) to play from the array of notes at that moment. 