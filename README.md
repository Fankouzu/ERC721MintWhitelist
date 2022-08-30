# Token Contracts

## Install
```
npm install
```

## Compile
```
%%set the following two enviorment variables
export INFURA_API_KEY=
export MNEMONIC=
npm run compile
```

## Deploy contract
1. edit file[./scripts/01_DeployToken.js](./scripts/01_DeployToken.ts)
2. run
```
npx hardhat run ./scripts/01_DeployToken.ts --network metermain
```

## Make proof
1. edit file[./Addresses.json](./Addresses.json)
2. run
```
npx hardhat run ./scripts/02_MakeProof.ts
```


