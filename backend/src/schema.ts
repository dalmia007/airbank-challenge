import { gql } from 'apollo-server';
import { Context } from './context';

export const typeDefs = gql`
	type Account {
		id: String!
		name: String!
		bank: String!
		transactions: [Transaction]
	}
	type Category {
		id: String!
		name: String!
		color: String
		transactions: [Transaction]
	}
	type Transaction {
		id: String!
		account: Account!
		accountId: String!
		category: Category
		categoryId: String
		reference: String
		amount: Float!
		currency: String!
		date: String!
	}
	type Query {
		getTransactionById(id: String!): Transaction
		getAllCategories: [Category]
		getAllTransactions: [Transaction]
	}
`;

export const resolvers = {
	Query: {
		getTransactionById: (_parent: undefined, args: { id: string }, context: Context) => {
			return context.prisma.transaction.findUnique({
				where: { id: args.id },
				include: { account: true, category: true },
			});
		},
		getAllCategories: (_parent: undefined, _args: undefined, context: Context) => {
			return context.prisma.category.findMany();
		},
		getAllTransactions: (_parent: undefined, _args: undefined, context: Context) => {
			return context.prisma.transaction.findMany();
		},
	},
};
