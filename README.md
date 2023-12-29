# You can use following commands on CLI

## For Search

```
node cli.js search email="test@email.com"
node cli.js search full_name="John Doe"
node cli.js search email="test@email.com" full_name="John Doe"
```

## For Duplicates

```
node cli.js duplicates  # It will return duplicate records on the basis of email by default.
node cli.js duplicates email  # It  will return duplicate records on the basis of email.
node cli.js duplicates full_name  # It will return duplicate records on the basis of full_name.
node cli.js duplicates email full_name  # It  will return duplicate records if both fields are same.
```

# API Server

You can run API Server by this command:

```
cd client_search
node app.js
```

Once the API Server is running, you can make following HTTP requests through any web client

## For Search

- GET /search?[q][full_name]=john (for searching against full_name field)

- GET /search?[q][email]=test@email.com (for searching against email field)

- GET /search?[q][full_name]=john&[q][email]=john.doe@gmail.com (for searching against full_name and email both)

## For Duplicates

- GET /duplicates # by default finds dupliate basd on email
- GET /duplicates?[field]=full_name # dupliate full_name
- GET /duplicates?[field]=email # duplicate email
- GET /duplicates?[field]=full_name,email # will return duplicate emails and full_name if same in both records

## Run Tests

You can run Tests by this command in application root directory:

```
yarn test
```
