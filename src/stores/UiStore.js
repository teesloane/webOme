import { observable, computed } from 'mobX'

class UiStore {
  @observable menuOpen = false
}

export default new UiStore()