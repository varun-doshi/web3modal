import { proxy, subscribe as valtioSub } from 'valtio/vanilla'
import type { ModalCtrlState } from '../../../types/statefullCtrlTypes'
import { OptionsCtrl } from './OptionsCtrl'
import { RouterCtrl } from './RouterCtrl'

// -- initial state ------------------------------------------------ //
const state = proxy<ModalCtrlState>({
  open: false
})

// -- controller --------------------------------------------------- //
export const ModalCtrl = {
  state,

  subscribe(callback: (newState: ModalCtrlState) => void) {
    return valtioSub(state, () => callback(state))
  },

  open(wcUri?: string) {
    const { chains } = OptionsCtrl.state
    if (chains?.length ? chains.length > 1 : false) RouterCtrl.replace('SelectNetwork')
    else RouterCtrl.replace('ConnectWallet')
    OptionsCtrl.setStandaloneUri(wcUri)
    state.open = true
  },

  close() {
    state.open = false
  }
}
