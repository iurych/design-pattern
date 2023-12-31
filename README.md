# App

GymPass style app.

## Rfs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter o seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas (até 10km);
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-ins em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto (100km) da academia;
- [] O check-in só pode ser validado até 20 minutos após ser criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);
