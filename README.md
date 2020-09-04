# personal-expense-management_api
```
Description : API for managing personal expenses and incomes of users 
```
### (#postgres db , #dockerfile, #docker-compose, #node sequelize, #nodejs , #swagger)

### Local Running
To run code locally using docker 
```bash
$ docker-compose up
```
Run db migration for first time: 
```
node_modules/.bin/sequelize db:migrate

```
To revert migration of db 
```bash
$ node_modules/.bin/sequelize db:migrate:undo
```


### API details on swagger UI :
to get information on API (requests and response) browse to 
```
$ {base_api}/api/v1/management/swagger
ex: localhost:5001/api/v1/management/swagger
```















