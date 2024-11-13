import publish from "@/utils/walrus/publish";
import read from "@/utils/walrus/read";

type publishResponseType = {
    newlyCreated?: {
        blobObject: {
            blobId: string
        }
    },
    alreadyCertified?: {
        blobId: string
    }
}

function getBlobId(data: publishResponseType) {
    if (data.newlyCreated)
        return data.newlyCreated.blobObject.blobId;
    return data.alreadyCertified!.blobId;
}

export type {publishResponseType}

export {publish, read, getBlobId}