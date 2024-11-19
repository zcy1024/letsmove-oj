'use server'

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import {Transaction, TransactionArgument} from "@mysten/sui/transactions";
import {Ed25519Keypair} from '@mysten/sui/keypairs/ed25519';
import {PackageID, ProblemList, AdminList} from "@/config/key";

type Network = "mainnet" | "testnet" | "devnet" | "localnet";

const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || "testnet";

export default async function moveCall(args: TransactionArgument[], packageID: string, gas: string, pid: string) {
    const rpcUrl = getFullnodeUrl(network);
    const client = new SuiClient({ url: rpcUrl });
    const tx = new Transaction();
    tx.setGasBudget(Number(gas));
    tx.moveCall({
        package: PackageID,
        module: "problem",
        function: "try_to_solve",
        arguments: [tx.pure.u64(Number(pid)), tx.object(ProblemList), tx.object(AdminList)]
    });
    tx.moveCall({
        package: packageID,
        module: "main",
        function: "main",
        arguments: args
    });
    const keypair = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);
    const result = await client.signAndExecuteTransaction({
        transaction: tx,
        signer: keypair,
        requestType: 'WaitForLocalExecution',
        options: {
            showEffects: true,
            showEvents: true,
            showObjectChanges: true
        }
    });
    const eventOutput = JSON.stringify(result.events?.find(event => event.type === `${packageID}::main::MainEvent`)?.parsedJson);
    const createOutput = JSON.stringify(result.objectChanges?.find(object => object.type === "created" && object.objectType === `${packageID}::main::Main`));
    return [eventOutput, createOutput];
}