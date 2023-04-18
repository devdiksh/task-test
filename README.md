## Installation

This test task requires [Node.js](https://nodejs.org/) v18.13.0+ to run.

Install the dependencies and devDependencies.

```sh
cd task-test
npm i
```


Make .env file and load environment variables (DB_NAME, DB_USER, DB_PASSWORD) with help of .example.env.

```sh
cp .example.env .env
```

(Create a new empty database using pgAdmin workbench and set its DB_NAME in .env)

If everything is right and after filling up .env file with correct Database credentials, you should be able to start server using below command.


```sh
npm run start
```

You database now will be ready with Person and PersonContacts table.

Use below cURL to create a new person:

```sh
curl --location --request POST 'http://localhost:4000/api/v1/person' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "Raghav",
"surname": "Sharma",
"age": "28",
"gender": "male",
"birthday": "1995-03-25",
"phone": "9876543210",
"email": "raghav@yopmail.com",
"contacts": []
}'
```

You can create another person and add contact by adding contact ids in request

```sh
curl --location --request POST 'http://localhost:4000/api/v1/person' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "Shristi",
"surname": "Mehta",
"age": "28",
"gender": "female",
"birthday": "1995-03-25",
"phone": "9876543210",
"email": "shristi@yopmail.com",
"contacts": [1]
}'
```

Below is cURL command to fetch list of all people

```sh
curl --location --request GET 'http://localhost:4000/api/v1/person?limit=10&page=1'

```

You can use graphQL query as well to fetch all the people on http://localhost:4000/graphql

```sh
query {
    getAllPeople(limit: 3) {
        id
        name
        surname
        email
        phone
        created
        contacts {
            name
            email
        }
    }
}

```
