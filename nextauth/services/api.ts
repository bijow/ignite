import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from 'nookies';
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "../errors/AuthTokenError";

let isRefresing = false;
let faildRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
  
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  // interceptor do axios;
  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        // recebe os cookies novamente
        cookies = parseCookies(ctx);

        // busca dos cookies o refreshToken
        const { 'nextauth.refreshToken': refreshToken } = cookies;
        // tem todas as configurações para repetir a request ao backend (Rota callback etc...)
        const originalConfig = error.config;

        if (!isRefresing) {
          isRefresing = true;
          // faz o refresh token;
          api.post('/refresh', {
            refreshToken
          }).then(response => {
            const { token } = response.data;
            setCookie(ctx, 'nextauth.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            });

            setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            });

            // atualiza as filas das request com o sucesso e depois de sair do foreach limpa a lista
            faildRequestsQueue.forEach(request => request.onSuccess(token));
            faildRequestsQueue = [];
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
          }).catch(error => {
            // atualiza as filas das request com os erros e depois de sair do foreach limpa a lista
            faildRequestsQueue.forEach(request => request.onFailure(error));
            faildRequestsQueue = [];

            if (process.browser) {
              signOut();
            }
          }).finally(() => {
            isRefresing = false;
          });
        }

        // axios só permite promisse!
        return new Promise((resolve, reject) => {
          faildRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`;
              // resolve a promisse com a nova chamada API
              resolve(api(originalConfig));
            },
            onFailure: (error: AxiosError) => {
              reject(error);
            }
          })
        })
      } else {
        // deslogar usuário
        if (process.browser) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
    }

    return Promise.reject(error);
  });

  return api;
}