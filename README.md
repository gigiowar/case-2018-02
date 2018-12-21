## Instruções para executar o projeto

git clone https://github.com/gigiowar/case-2018-02.git

## Requisitos
Instalar o MYSQL

Criar um banco de dados com o nome medical_prescription

### Sem o docker
npm install

node server.js

### Com o docker

executar o docker build Ex:"docker build -t medicine_prescription ."

executar o docker run Ex:"docker run -p 49160:8080 -d medicine_prescription"

## TODO List
Criar o CRUD do users_medicines

Terminar a lógica da prescricao médica
