export class OmeBtnSkeleton {
  constructor(id, midiNote, velocity) {
    this.id = id
    this.midiNote = midiNote || 64
    this.velocity = velocity || 100
  }
}
