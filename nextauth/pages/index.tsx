import { GetServerSideProps } from "next";
import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";
import { parseCookies } from 'nookies';
import { withSSRGuest } from "../utils/withSSRGuest";
export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {

    event.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data);
  }

  return (
    <form style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: '100vw',
      height: '100vh',
      gap: 4,
    }}
      onSubmit={handleSubmit}
    >
      <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <button type="submit">Entrar</button>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})