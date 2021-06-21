# Petstore-API-GraphQL
Implementation of an API in GraphQL based on: [Pet Store API](https://petstore3.swagger.io/).
## Running API
1. Clone Repo and install node.js
2. Use command line to navigate to project directory
3. Install dependencies using: `npm install`
4. Type `node index.js` in command line
5. Navigate to `http://localhost:4000/`
## Queries
### List Pets
```
query Query {
  pets {
    id
    name
    category {
      id
      name
    }
    status
  }
}
```
### findByStatus
```
query Query($findByStatusInput: statusInput) {
  findByStatus(input: $findByStatusInput) {
    id
    name
    category {
      id
      name
    }
    status
  }
}
```
### findPetId
```
query Query($findPetIdInput: idInput) {
  findPetId(input: $findPetIdInput) {
    id
    name
    category {
      name
      id
    }
    status
  }
}
```
### inventory
```
query Query {
  inventory {
    status
    category {
      name
      id
    }
    name
    id
  }
}
```
### findOrder
```
query Query($findOrderInput: idInput) {
  findOrder(input: $findOrderInput) {
    id
    petId
    quantity
    shipDate
    status
    complete
  }
}
```
### login
```
query Query($loginInput: logInput) {
  login(input: $loginInput)
}
```
## Mutations
### newPet
```
mutation Mutation($newPetInput: petInput) {
  newPet(input: $newPetInput) {
    id
    name
    category {
      name
      id
    }
    status
  }
}
```
### deletePet
```
mutation Mutation($deletePetInput: idInput) {
  deletePet(input: $deletePetInput) {
    id
    name
    category {
      name
      id
    }
    status
  }
}
```
### updatePet
```
mutation Mutation($updatePetInput: updateInput) {
  updatePet(input: $updatePetInput) {
    id
    name
    category {
      name
      id
    }
    status
  }
}
```
### order
```
mutation Mutation($orderInput: orderInput) {
  order(input: $orderInput) {
    id
    quantity
    petId
    shipDate
    status
    complete
  }
}
```
### deleteOrder
```
mutation Mutation($deleteOrderInput: idInput) {
  deleteOrder(input: $deleteOrderInput) {
    id
    petId
    shipDate
    quantity
    status
    complete
  }
}
```
### createUser
```
mutation Mutation($createUserInput: userInput) {
  createUser(input: $createUserInput) {
    id
    username
    firstname
    lastname
    email
    password
    phone
  }
}
```
### deleteUser
```
mutation Mutation($deleteUserInput: logInput) {
  deleteUser(input: $deleteUserInput) {
    id
    username
    firstname
    lastname
    email
    password
    phone
  }
}
```
## Input

### statusInput
```
"findByStatusInput": {
    "status": String!
  }
  ```
### idInput
```
"findPetIdInput": {
    "id": Int!
  }
  ```
### loginInput
```
"loginInput": {
    "username": String!,
    "password": String!
  }
  ```
### petInput
```
"newPetInput": {
    "id": Int!,
    "name": String!,
    "status": String!,
    "category": categoryInput!
  }
```
### updateInput
```
"updatePetInput": {
    "name": String!,
    "id": Int!,
    "status": String!
  }
  ```
  ### orderInput
  ```
  "orderInput": {
    "id": Int!,
    "quantity": Int!,
    "shipDate": String!,
    "status": orderStatus!,
    "complete": Boolean!,
    "petId": Int!
  }
  ```
### userInput
```
"createUserInput": {
    "firstname": String!,
    "username": String!,
    "id": Int!,
    "lastname": String!,
    "email": String!,
    "password": String!,
    "phone": String
  }
  ```
