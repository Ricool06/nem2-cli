/*
 *
 * Copyright 2018-present NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import chalk from 'chalk';
import {command, metadata} from 'clime';
import {AccountHttp} from 'nem2-sdk';
import {AccountTransactionsCommand, AccountTransactionsOptions} from '../../interfaces/account.transactions.command';
import {AddressResolver} from '../../resolvers/address.resolver';
import {TransactionView} from '../../views/transactions/details/transaction.view';

@command({
    description: 'Fetch transactions from account',
})
export default class extends AccountTransactionsCommand {

    constructor() {
        super();
    }

    @metadata
    execute(options: AccountTransactionsOptions) {
        this.spinner.start();

        const profile = this.getProfile(options);
        const address = new AddressResolver().resolve(options, profile);

        const accountHttp = new AccountHttp(profile.url);
        accountHttp.getAccountTransactions(address, options.getQueryParams())
            .subscribe((transactions) => {
                this.spinner.stop(true);

                if (!transactions.length) {
                    console.log('There aren\'t transactions');
                }

                transactions.forEach((transaction) => {
                    new TransactionView(transaction).print();
                });
            }, (err) => {
                this.spinner.stop(true);
                err = err.message ? JSON.parse(err.message) : err;
                console.log(chalk.red('Error'), err.body && err.body.message ? err.body.message : err);
            });
    }
}
