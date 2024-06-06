# Solana NFT Collection Creator

## Description

This project creates a collection NFT on the Solana blockchain using the Metaplex and Umi libraries. The script reads configuration details from a `config.json` file and environment variables, then creates and mints a programmable NFT collection. The project includes detailed instructions for setting up your environment and configuration, making it easy to deploy your own NFT collection.

## Steps to Setup

1. Clone this repository and navigate to its directory.
2. Install the required packages:
    ```bash
    npm install @metaplex-foundation/mpl-token-metadata @metaplex-foundation/mpl-toolbox @metaplex-foundation/umi @metaplex-foundation/umi-bundle-defaults dotenv
    ```

3. Create a `.env` file in the root directory of your project and add your private key and RPC URL:
    ```env
    PRIVATE_KEY="YOUR_PRIVATE_KEY"
    RPC_URL="YOUR_RPC_URL"
    ```

4. Update the `RPC_URL` with your preferred Solana RPC node provider. Here are some options:
    - [Alchemy](https://www.alchemy.com/)
    - [QuickNode](https://www.quicknode.com/)
    - [Infura](https://www.infura.io/)

5. Configure the `config.json` file with your NFT details:
    ```json
    {
        "name": "YOUR_NFT_NAME",
        "symbol": "SYMBOL",
        "description": "DESCRIPTION",
        "seller_fee_basis_points": 1,
        "metadata_url": "METADATA_URL",
        "creators": [
            {
                "address": "CREATOR_ADDRESS",
                "share": 100
            }
        ],
        "network": "devnet"
    }
    ```

## Configuration Details

### config.json

- `name`: The name of your NFT.
- `symbol`: The symbol representing your NFT collection.
- `description`: A description of your NFT.
- `seller_fee_basis_points`: The seller fee in basis points (e.g., 1 basis point = 0.01%).
- `metadata_url`: The URL pointing to the metadata JSON for the NFT.
- `creators`: An array of creator objects with the following fields:
  - `address`: The creator's Solana wallet address.
  - `share`: The share percentage of the creator.
- `network`: The Solana network to deploy on, either `mainnet` or `devnet`.

### Key Points

- Ensure you have at least $10 worth of SOL on the network you are using to cover transaction fees.
- Make sure the `metadata_url` is accessible and correctly formatted to meet Solana's metadata standards.

## Running the Script

Once you have configured your environment and `config.json` file, run the script to create your NFT collection:
```bash
node createCollection.js
```


# Contributions
Pull requests are welcome! Feel free to contribute to the project to make it even better.
