import { OmeStore } from '../stores/OmeStore';

describe('OmeStore tests', function() {
  beforeEach(function() {
    this.store = new OmeStore();
  })

  it('toggles the play/pause button', function() {
    const previousState = this.store.togglePlay.playing
    this.store.togglePlay()
    expect(this.store.playing).toBe(!previousState);
  })

  it('will not allow a tempo < 10', function() {
    const e = { target: {value: 3} }
    this.store.changeTempo(e)
    expect(this.store.tempo).toBe(10);
  })

  it('will not allow a tempo > 240', function() {
    const e = { target: {value: 9001} }
    this.store.changeTempo(e)
    expect(this.store.tempo).toBe(240);
  })

  it('will set the tempo', function() {
    const e = { target: {value: 120} }
    this.store.changeTempo(e)
    expect(this.store.tempo).toBe(120);
  })
})