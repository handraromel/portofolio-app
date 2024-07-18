import { type PluginOptions, POSITION } from 'vue-toastification'
import { FIVES_TIMEOUT_BUFFER } from '@/constant'

export const toastrOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: FIVES_TIMEOUT_BUFFER,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__slideBlurred',
  maxToasts: 20,
  newestOnTop: true
}
