import JSZip from "jszip";
import {getBlobIdAfterPublish, read} from "@/utils"

type Props = {
    account: string,
    title: string,
    gas: string,
    problemMd: File,
    dataZip: File
}

export default async function AddQuestion({account, title, gas, problemMd, dataZip}: Props) {
    console.log(title, gas, problemMd, dataZip);

    const problemBlobId = await getBlobIdAfterPublish(account, await problemMd.text());

    const inputBlobIds: string[] = [];
    const outputBlobIds: string[] = [];
    const zip = new JSZip();
    const res = await zip.loadAsync(dataZip);
    let idx = 1;
    while (res.files[idx.toString() + ".in"] && res.files[idx.toString() + ".out"]) {
        const inputStr = await res.files[idx.toString() + ".in"].async('string');
        inputBlobIds.push(await getBlobIdAfterPublish(account, inputStr));
        const outputStr = await res.files[idx.toString() + ".out"].async('string');
        outputBlobIds.push(await getBlobIdAfterPublish(account, outputStr));
        idx += 1;
    }
}