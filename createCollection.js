const {
    createProgrammableNft,
} = require("@metaplex-foundation/mpl-token-metadata");
const { mplToolbox } = require("@metaplex-foundation/mpl-toolbox");
const {
    createSignerFromKeypair,
    generateSigner,
    keypairIdentity,
    percentAmount,
    publicKey,
} = require("@metaplex-foundation/umi");
const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");
const { base58 } = require("@metaplex-foundation/umi/serializers");
require('dotenv').config()
const fs = require('fs')

const RPC_URL = process.env.RPC_URL
const privateKey = process.env.PRIVATE_KEY

const umi = createUmi(RPC_URL);

//loads config.json

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));


const keypair = umi.eddsa.createKeypairFromSecretKey(base58.serialize(privateKey));
const authority = createSignerFromKeypair(umi, keypair);


function generateExplorerLink(publicKey, type = "address", network = config.network) {
    return `https://solscan.io/${type}/${publicKey}?cluster=${network}`;
}

async function createCollection() {
    const umi = createUmi(RPC_URL);
    umi.use(keypairIdentity(keypair)).use(mplToolbox());
    const mint = generateSigner(umi);
    console.log("OWNER ADDRESS: ", generateExplorerLink(keypair.publicKey));
    console.log("NFT MINT ADDRESS: ", generateExplorerLink(mint.publicKey, "token"));

    console.info("\nSigning and sending transaction to create collection...");

    const result = await createProgrammableNft(umi, {
        mint,
        name: config.name,
        symbol: config.symbol,
        uri: config.metadata_url,
        isCollection: true,
        authority: authority,
        sellerFeeBasisPoints: percentAmount(config.seller_fee_basis_points),
        creators: config.creators.map((creator) => ({
            address: publicKey(creator.address),
            share: creator.share,
            verified: false,
        })),
    }).sendAndConfirm(umi);

    console.log("Transaction signature: ", generateExplorerLink(base58.deserialize(result.signature)[0], "tx"));
}

createCollection();
