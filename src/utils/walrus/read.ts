export default async function read({blobId} : {blobId: string}) {
    const res = await fetch(`https://sui-walrus-testnet.bwarelabs.com/aggregator/v1/${blobId}`);
    // console.log(res.text().then(data => console.log(data)));
    return res.text();
}