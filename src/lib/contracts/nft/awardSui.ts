'use server'

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import {Transaction} from "@mysten/sui/transactions";
import {Ed25519Keypair} from '@mysten/sui/keypairs/ed25519';
import {acceptProblem} from "@/lib/contracts"

export default async function awardSui(user: string, pid: string) {
    const rpcUrl = getFullnodeUrl("mainnet");
    const client = new SuiClient({ url: rpcUrl });
    const tx = new Transaction();
    const keypair = Ed25519Keypair.fromSecretKey(process.env.COIN_AWARD!);

    const totalBalance = Number((await client.getBalance({owner: keypair.toSuiAddress()})).totalBalance);
    const amount = totalBalance >= 2000000000 ? 1000000000 : 100000000;
    if (totalBalance < amount + 10000000) {
        return false;
    }
    const coin = tx.splitCoins(tx.gas, [amount]);
    tx.transferObjects([coin], user);
    const recorded = await acceptProblem(user, pid);
    if (!recorded) {
        return false;
    }
    const result = await client.signAndExecuteTransaction({
        transaction: tx,
        signer: keypair,
        requestType: 'WaitForLocalExecution',
        options: {
            showEffects: true,
        }
    });
    return result.effects!.status.status === "success";
}