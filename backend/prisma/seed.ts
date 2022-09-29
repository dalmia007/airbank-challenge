import { Account, Category, PrismaClient, Transaction } from '@prisma/client';
const prisma = new PrismaClient();

const csvParser = require('csv-parser');
const fs = require('fs');

const accountsFilePath = './data/accounts.csv';
const categoriesFilePath = './data/categories.csv';
const transactionsFilePath = './data/transactions.csv';

function getAccountsData(): Promise<Account[]> {
	return new Promise((resolve, reject) => {
		let accounts: Account[] = [];
		fs.createReadStream(accountsFilePath)
			.pipe(
				csvParser({
					headers: ['id', 'name', 'bank'],
					skipLines: 1,
				})
			)
			.on('error', (error: Error) => reject(error))
			.on('data', (data: Account) => accounts.push(data))
			.on('end', () => resolve(accounts));
	});
}

function getCategoriesData(): Promise<Category[]> {
	return new Promise((resolve, reject) => {
		let categories: Category[] = [];
		fs.createReadStream(categoriesFilePath)
			.pipe(
				csvParser({
					headers: ['id', 'name', 'color'],
					skipLines: 1,
				})
			)
			.on('error', (error: Error) => reject(error))
			.on('data', (data: Category) => categories.push(data))
			.on('end', () => resolve(categories));
	});
}

function getTransactionsData(): Promise<Transaction[]> {
	return new Promise((resolve, reject) => {
		let transactions: Transaction[] = [];
		fs.createReadStream(transactionsFilePath)
			.pipe(
				csvParser({
					headers: ['id', 'accountId', 'categoryId', 'reference', 'amount', 'currency', 'date'],
					skipLines: 1,
				})
			)
			.on('error', (error: Error) => reject(error))
			.on('data', (data: Transaction) =>
				transactions.push({
					...data,
					categoryId: data.categoryId ? data.categoryId : null,
					date: new Date(data.date),
				})
			)
			.on('end', () => resolve(transactions));
	});
}

async function main() {
	const accounts = await getAccountsData();
	const categories = await getCategoriesData();
	const transactions = await getTransactionsData();

	await prisma.account.createMany({ data: accounts });

	await prisma.category.createMany({ data: categories });

	await prisma.transaction.createMany({ data: transactions });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
