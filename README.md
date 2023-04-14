curl -X POST -H "Content-Type: application/json" -d '{"query": "{ hello }"}' http://localhost:3000/graphql


curl -X GET http://localhost:3000/api/people?limit=5&offset=10