# Quantum Space Gems
A on-chain game set in space, where players embark on a journey to planets, collecting precious gems

![Quantum Space Gems Thumbnail](./packages/nextjs/public/game.png)

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

## Gameplay
<ul>
  <li>Player have to buy and mint Troop NFT to play</li>
  <li>Player can deploy the Troop on to the planet</li>
  <li>Each troop start with 50 oxygen points</li>
  <li>Moving troop costs 1 oxygen points</li>
  <li>You can capture the gem field and mine for Gem as ERC20 tokens</li>
</ul>

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Quantum-Space-Gems, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/codechefsong/Quantum-Space-Gems.git
cd Quantum-Space-Gems
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`
