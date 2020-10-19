
# Desafio MobApps Back-end
O projeto está programado para funcionar com variáveis de ambiente. 
Para inciar, favor setá-las ou usar o comando 'npm run dev'.

## ENDPOINTS

### /user/signup
Cadastra um usuário no sistema
### `POST`:
- Parâmetros body:
    * username (string)
    * password (string)

- Retorno:
    * success: true

---
### /user/
Faz o login no sistema
#### `POST`:
- Parâmetros body:
    - username (string)
    - password (string)

- Retorno:
    - token: token de acesso para as demais requests

----
### /user/
Faz o login no sistema
#### `POST`:
- parâmetros body:
    - username (string)
    - password (string)

- retorno:
    - token: token de acesso para as demais requests

---
### /movies/
Faz o cadastro de um filme
#### `POST`:
- Header:
	- x-access-token: token de autenticação (string)

- parâmetros body:
    - title (string)
    - description (string)
    - date (string) (formato: yyyy-mm-dd)
    - cover (file)

- retorno:
    - success: true
    - object: objeto cadastrado

---
### /movies/
Obtém a listagem de filmes
#### `GET`:
- Header:
	- x-access-token: token de autenticação (string)
	
- parâmetros query:
    - title (string) (opcional)
    - year (string) (apenas o ano) (opcional)

- retorno:
    - array com os resultados correspondentes

OBS: Caso nenhum parâmetro de pesquisa seja enviado, o sistema retornará a listagem de todos os filmes

---
### /movies/
Atualiza os dados de um filme
#### `PUT`:
- Header:
	- x-access-token: token de autenticação (string)
	
- parâmetros query:
    - id (string)
    - title (string) (opcional)
    - description (string) (opcional)
    - date (string) (formato: yyyy-mm-dd) (opcional)
    - cover (file) (opcional)

- retorno:
    - success: true
    - object: objeto modificado

OBS: Caso nenhum parâmetro de pesquisa seja enviado, o sistema retornará a listagem de todos os filmes
