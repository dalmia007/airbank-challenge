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
		getAllAccounts: [Account]
		getAllCategories: [Category]
		getAllTransactions: [Transaction]
		getAccountById(id: String!): Account
		getTransactionById(id: String!): Transaction
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
	},
};
