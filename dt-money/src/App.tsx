
import { useState } from 'react'
import { TransActionsProvider } from './hooks/useTransactions'
import Modal from 'react-modal'
import { Dashboard } from "./componets/Dashboard"
import { Header } from "./componets/Header"
import { NewTransctionModal } from './componets/NewTransactionModal'
import { GlobalStyle } from "./styles/global"

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransActionsProvider>
      <Header onOpenNewTranscationModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransctionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransActionsProvider>
  )
}
