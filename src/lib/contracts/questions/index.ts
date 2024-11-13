import JSZip from "jszip";
import type {publishResponseType} from "@/utils";
import {publish, read, getBlobId} from "@/utils"

type Props = {
    title: string,
    gas: string,
    problemMd: File,
    dataZip: File
}

export default async function AddQuestion({title, gas, problemMd, dataZip}: Props) {
    console.log(title, gas, problemMd, dataZip);
    publish({toBePublished: await problemMd.text()}).then(async (res: publishResponseType) => {
        const blobId = getBlobId(res);
        console.log(await read({blobId: blobId}));
    });

    // const zip = new JSZip();
    // zip.loadAsync(dataZip).then(async (res) => {
    //     const str = await res.files["1.out"].async('string');
    //     console.log(str);
    // });
}