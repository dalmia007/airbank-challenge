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
		getTransactions(ascOrder: Boolean, skip: Int, take: Int): [Transaction]
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
		getTransactions: (
			_parent: undefined,
			_args: {
				ascOrder?: boolean;
				skip?: number;
				take?: number;
			},
			context: Context
		) => {
			const ascOrder = _args.ascOrder || false;
			const skip = _args.skip || 0;
			const take = _args.take || 25;
			return context.prisma.transaction.findMany({
				take,
				skip,
				orderBy: { date: ascOrder ? 'asc' : 'desc' },
				include: { account: true, category: true },
			});
		},
	},
};
