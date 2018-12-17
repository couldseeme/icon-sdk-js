import assert from 'assert';
import IconService, {
	HttpProvider, SignedTransaction, IconValidator, IconWallet, IconBuilder, IconConverter, IconAmount,
} from '../build/icon-sdk-js.min';

const { CallTransactionBuilder } = IconBuilder;

const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));

const from = 'hx902ecb51c109183ace539f247b4ea1347fbf23b5';
const to = 'cx3502b4dadbfcd654d26d53d8463f2929c2c3948d';
const stepLimit = IconConverter.toBigNumber(2000000);
const nid = IconConverter.toBigNumber(3);
const nonce = IconConverter.toBigNumber(1);
const version = IconConverter.toBigNumber(3);
const timestamp = (new Date()).getTime() * 1000;
const builder = new CallTransactionBuilder();
const transaction = builder
	.from(from)
	.to(to)
	.stepLimit(stepLimit)
	.nid(nid)
	.nonce(nonce)
	.version(version)
	.timestamp(timestamp)
	.method('transfer')
	.params({
		_to: 'hxd008c05cbc0e689f04a5bb729a66b42377a9a497',
		_value: IconConverter.toHex(IconAmount.of(1, IconAmount.Unit.ICX).toLoop()),
	})
	.build();

const testWallet = IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6');

const signedTransaction = new SignedTransaction(transaction, testWallet);

describe('IconService', () => {
	describe('sendTransaction() - CallTransaction', () => {
		it('should return the tx hash', async () => {
			const txHash = await iconService.sendTransaction(signedTransaction).execute();
			assert.ok(IconValidator.isTransactionHash(txHash));
		});
	});
});
