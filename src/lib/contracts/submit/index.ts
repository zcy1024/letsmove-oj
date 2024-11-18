import {getProblemByID} from "@/lib/contracts"
import {Transaction, TransactionArgument} from "@mysten/sui/transactions";
import {read} from "@/utils";
import moveCall from "@/lib/contracts/submit/moveCall";
import {suiClient} from "@/config";

function strToVec(str: string) {
    const ret: string[] = [];
    str.split(' ').forEach(item => {
        ret.push(item);
    });
    return ret;
}

function pure(tx: Transaction, opt: string, val: string) {
    if (opt === "u64") {
        return tx.pure.u64(val);
    }
    if (opt === "string") {
        return tx.pure.string(val);
    }
    if (opt === "u64_vector") {
        return tx.pure.vector("u64", strToVec(val).map(item => Number(item)));
    }
    if (opt === "string_vector") {
        return tx.pure.vector("string", strToVec(val));
    }
    return tx.pure.u64(val);
}

function getAnswer(output: string) {
    const words = output.split(' ');
    if (words.length < 4) {
        return ["", ""];
    }
    const outputType = words[1];
    let result = `{"${words[2]}":"`;
    let i = 3;
    while (i < words.length) {
        result = result.concat(words[i]).concat(i + 1 < words.length ? " " : "\"}");
        i = i + 1;
    }
    return [outputType, result];
}

type objectContentType = {
    fields: {
        [key: string]: unknown
    }
}

async function getResultFromObjectId(objectId: string) {
    const object = await suiClient.getObject({id: objectId, options: {showContent: true}});
    const content = object.data!.content as objectContentType;
    return JSON.stringify(content.fields);
}

type createOutputType = {
    objectId: string
}

async function checkAnswer(output: string, eventOutput: string, createOutput: string) {
    const [outputType, result] = getAnswer(await read({blobId: output}));
    if (outputType === "MainEvent") {
        return result === eventOutput;
    }
    if (outputType === "Main") {
        const parsedOutput = JSON.parse(createOutput) as createOutputType;
        const objectId = parsedOutput.objectId;
        const userResult = await getResultFromObjectId(objectId);
        return userResult === `{"id":{"id":"${objectId}"},${result.slice(1)}`;
    }
    return false;
}

export default async function submit(pid: string, packageID: string) {
    // pid: 2 PackageID: 0xd3176922e3ff9d2f654385c481adcfeacffc6de1b6c0264731fb5e47ab87e83b
    const problem = await getProblemByID(pid);
    if (!problem) {
        return "Pid Error!";
    }

    const inputs = problem.inputs;
    const outputs = problem.outputs;
    let i = 0;
    while (i < inputs.length) {
        const input = inputs[i];
        const output = outputs[i];
        const tx = new Transaction();
        const args: TransactionArgument[] = [];

        const inputText = await read({blobId: input});
        const lines = inputText.split('\n');
        lines.forEach(line => {
            const split = line.split(' ');
            if (split.length < 3) {
                return;
            }
            const opt = split[1];
            const val = split[2];
            args.push(pure(tx, opt, val));
        });

        const [eventOutput, createOutput] = await moveCall(args, packageID);
        const isOK = await checkAnswer(output, eventOutput, createOutput);
        if (!isOK) {
            return `Error on Test #${i}`
        }

        i = i + 1;
    }
    return "Accepted";
}