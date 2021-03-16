import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps {
  onOpenNewTranscationModal: () => void;
}

export function Header ({onOpenNewTranscationModal}: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dtmoney"/>
        <button
          type="button"
          onClick={onOpenNewTranscationModal}
        >
          Nova transação
        </button>
      </Content>
    </Container>
  )
}