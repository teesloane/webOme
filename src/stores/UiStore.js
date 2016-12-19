import { observable } from 'mobx'

class UiStore {
  @observable menuOpen = false
}

var uiStore = window.uiStore = new UiStore()
export default uiStore