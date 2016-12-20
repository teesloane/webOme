import { observable, action} from 'mobx'

class UiStore {
  @observable menuOpen = true

  // Actions
  @action toggleMenu = () => { this.menuOpen = !this.menuOpen }
}

var uiStore = window.uiStore = new UiStore()
export default uiStore