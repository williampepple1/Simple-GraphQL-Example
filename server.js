const gql = require('graphql-tag');
const {ApolloServer} = require('apollo-server');

const typeDefs = gql`
type User{
    email: String!
    avatar: String
    friends: [User]!
}

type Shoe{
    brand: String!
    size: Int!
}

input ShoesInput {
    brand: String
    size: Int
}

input NewShoeInput {
    brand: String!
    size: Int!
}

type Query{
    me: User!
    shoes(input: ShoesInput): [Shoe]!
}

type Mutation{
    newShoe(input:  NewShoeInput!): Shoe!
}
`

const resolvers = {
    Query: {
        shoes(_, {input}){
            return [{brand: 'Nike', size: 23},
                    {brand: 'Balecianga', size: 22}
        ]
        },

        me() {
            return {
                email: 'John@gmail.com',
                avatar: 'http://Daniel.com',
                friends: []
            }
        }

    },
    Mutation: {
        newShoe(_, {input}){
            return input
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
.then(()=> console.log('listening on port 4000'))