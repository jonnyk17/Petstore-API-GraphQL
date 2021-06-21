const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Pets {
    id: Int!
    name: String!
    category: Category!
    status: status
  }
  enum status{
    available
    pending
    sold
  }
  type user{
    id: Int!
    username: String!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    phone: String!

  }
  type order{
    id: Int!
    petId: Int!
    quantity:Int!
    shipDate:String!
    status: orderStatus!
    complete: Boolean!
  }
  input orderInput{
    id: Int!
    petId:Int!
    quantity:Int!
    shipDate: String!
    status: orderStatus!
    complete: Boolean!
  }
  enum orderStatus{
    placed
    approved
    delivered
  }
  input petInput{
    id: Int!
    name: String!
    category: Categoryinput!
    status: String!
  }
  input userInput{
    id: Int!
    username: String!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    phone: String!
  }
  input logInput{
    username: String!
    password: String!
  }
  input updateInput{
    id: Int!
    name: String!
    status: String!
  }
  input idInput{
    id: Int!
  }
  input statusInput{
    status: String!
  }
  input Categoryinput{
    id: Int!
    name: String!
  }
  type Category{
    id: Int
    name: String
  }
  type Mutation{
    newPet(input: petInput): Pets!
    deletePet(input: idInput): Pets
    updatePet(input: updateInput): Pets
    order(input: orderInput): order
    deleteOrder(input: idInput): order
    createUser(input: userInput): user
    deleteUser(input: logInput): user
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    pets: [Pets]
    findByStatus(input: statusInput): [Pets]
    findPetId(input: idInput): Pets
    inventory: [Pets]
    findOrder(input: idInput): order
    login(input: logInput): String!
  }
`;

const pets = [
  {
    id: 1,
    name: "Skipper",
    category: {
      id: 1,
      name: "Dogs"
  },
    status: "available",

  },
  {
     id: 2,
    name: "Taquito",
    category: {
      id: 1,
      name: "Dogs"
  },
    status: "available",

  }
];
const orders=[

];
const users=[
{
  "id": 1,
  "username": "jon56",
  "firstname": "jonny",
  "email": "jonny@im.com",
  "password": "thistruck",
  "lastname": "twochains",
  "phone": "12235432"
}
];
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    pets: () => pets,
    findByStatus (_, {input})  {
      var statusArr=[]
       for(var i=0; i<pets.length; i++){
        if(pets[i].status==='available' && input.status==='available')
        {
          statusArr.push(pets[i])
        }
        else if(pets[i].status=='pending' && input.status=='pending')
        {
         statusArr.push(pets[i])
        }
        else if(pets[i].status=='sold' && input.status=='sold')
        {
          statusArr.push(pets[i])
        }
      }
      return statusArr
    },
    findPetId(_, {input}){
      for(var i=0; i<pets.length; i++){
         if(pets[i].id===input.id)
        {
            return pets[i]
        }
      }
    },
    inventory(){
      var invent=[]
      for(var i=0; i<pets.length; i++){
        if(pets[i].status==="available")
          invent.push(pets[i])
      }
      return invent
    },
    findOrder(_, {input}){
      console.log(input)
      for(var i=0; i<orders.length; i++){
        if(orders[i].id===input.id){
          console.log(orders[i])
          return orders[i]
        }
      }
    },
    login(_, {input}){
        for(var i=0; i<users.length; i++){
          if(users[i].username===input.username){
            if(users[i].password===input.password){
              return users[i].username+" is logged in"
            }
          }
        }
        return "Incorrect username or password"
    }
  },
  Mutation:{
    newPet(_, {input}){
      pets.push(input)
      
      return input
    },
    deletePet(_, {input}){
      let newPet=input
      for(var i=0; i<pets.length; i++){
        if(pets[i].id==newPet.id){
          del=pets.splice(i,1)
          break
        } 
      }
     
      return del[0]
    },
    updatePet(_, {input}){
      for(var i=0; i<pets.length;i++){
        if(pets[i].id===input.id){
          pets[i].name=input.name
          pets[i].status=input.status
          temp=pets[i]
          break
        }
      }
      return temp
    },
    order(_, {input}){
      
      for(var i=0; i<pets.length; i++){
        
        if(pets[i].id===input.petId){
        
          if(pets[i].status==="available"){
            pets[i].status="pending"
            let order=input
            orders.push(order)
            console.log(orders)
            return order
          }
       }
      }
    },
    createUser(_, {input}){
        
        users.push(input)
        return input
    },
    deleteUser(_, {input}){
      for(var i=0; i<users.length; i++){
        if(users[i].username===input.username){
          if(users[i].password===input.password){
            del=users.splice(i,1)
            return del[0]
          }
        }
      }
    },
    deleteOrder(_, {input}){
        for(var i=0; i<orders.length; i++){
          if(orders[i].id===input.id){
            for(var j=0; j<pets.length; j++){
              if(pets[j].id===orders.petId){
                pet[j].status="available"
                break
              }
            }
            del=orders.splice(i,1)
            console.log(orders)
            break
          }
        }
        return del[0]
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });
console.log(pets[0].status)// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
