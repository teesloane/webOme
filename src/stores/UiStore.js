import { observable, action} from 'mobx'

 class UiStore {

  @observable modal = {
    show: false,
    body: null,
  }

  @observable menuOpen = true

  // Actions
  @action toggleMenu = () => { this.menuOpen = !this.menuOpen }

  @action showModal(body) {
    this.modal.show = true;
    this.modal.body = body;
  }

  @action closeModal() {
    this.modal.show = false;
    this.modal.body = null;
  }
}

var uiStore = window.uiStore = new UiStore()
export default uiStore