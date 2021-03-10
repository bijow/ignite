import { Counter } from './Components/Couter'
import { RepositoryList } from './Components/RepositoryList'
import './styles/global.scss'

export function App () {
  return (
    <>
      <RepositoryList />
      <Counter />
    </>
  )
}