import incomeImg from '../../assets/income.svg'
import outomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

import { Container } from './styles'

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          Entradas
          <img src={incomeImg} alt="Entradas"/>
        </header>
        <strong>R$ 1000,00</strong>
      </div>
      <div>
        <header>
          Saidas
          <img src={outomeImg} alt="Entradas"/>
        </header>
        <strong>- R$ 500,00</strong>
      </div>
      <div className="hightlight-background">
        <header>
          Total
          <img src={totalImg} alt="Entradas"/>
        </header>
        
        <strong>R$ 500,00</strong>
      </div>
    </Container>
  )
}