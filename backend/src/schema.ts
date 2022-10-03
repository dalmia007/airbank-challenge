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
		getTransactions(ascOrder: Boolean, skip: Int, take: Int, selectedBank: String): [Transaction]
		getAllBanks: [Account]
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
				selectedBank?: string;
			},
			context: Context
		) => {
			const ascOrder = _args.ascOrder || false;
			const skip = _args.skip || 0;
			const take = _args.take || 25;
			const selectedBank = _args.selectedBank || undefined;
			return context.prisma.transaction.findMany({
				take,
				skip,
				orderBy: { date: ascOrder ? 'asc' : 'desc' },
				include: { account: true, category: true },
				where: { account: { bank: selectedBank } },
			});
		},
		getAllBanks: (_parent: undefined, _args: undefined, context: Context) => {
			return context.prisma.account.findMany({
				distinct: ['bank'],
				select: {
					bank: true,
				},
			});
		},
	},
};
