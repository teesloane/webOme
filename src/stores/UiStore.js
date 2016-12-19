import { observable } from 'mobx'

class UiStore {
  @observable menuOpen = true 
}

var uiStore = window.uiStore = new UiStore()
export default uiStore