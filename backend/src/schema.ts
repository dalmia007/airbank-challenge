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
		getTransactions(ascOrder: Boolean, skip: Int, take: Int, selectedBank: String, selectedAccount: String): [Transaction]
		getAllUniqueBanks: [Account]
		getAllUniqueAccounts: [Account]
	}
	type Mutation {
		updateTransactionCategory(categoryId: String!, transactionId: String!): Transaction
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
				selectedAccount?: string;
			},
			context: Context
		) => {
			const ascOrder = _args.ascOrder || false;
			const skip = _args.skip || 0;
			const take = _args.take || 20;
			const selectedBank = _args.selectedBank || undefined;
			const selectedAccount = _args.selectedAccount || undefined;

			return context.prisma.transaction.findMany({
				take,
				skip,
				orderBy: { date: ascOrder ? 'asc' : 'desc' },
				include: { account: true, category: true },
				where: { account: { name: selectedAccount, bank: selectedBank } },
			});
		},
		getAllUniqueBanks: (_parent: undefined, _args: undefined, context: Context) => {
			return context.prisma.account.findMany({
				distinct: ['bank'],
				select: {
					bank: true,
				},
			});
		},
		getAllUniqueAccounts: (_parent: undefined, _args: undefined, context: Context) => {
			return context.prisma.account.findMany({
				distinct: ['name'],
				select: {
					name: true,
				},
			});
		},
	},
	Mutation: {
		updateTransactionCategory: (
			_parent: undefined,
			_args: {
				categoryId: string;
				transactionId: string;
			},
			context: Context
		) => {
			return context.prisma.transaction.update({
				where: {
					id: _args.transactionId,
				},
				data: {
					categoryId: _args.categoryId,
				},
				include: {
					category: true,
					account: true,
				},
			});
		},
	},
};
