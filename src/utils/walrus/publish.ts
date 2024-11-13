export default async function publish({toBePublished}: {toBePublished: string}) {
    const res = await fetch("https://sui-walrus-testnet.bwarelabs.com/publisher/v1/store?epochs=100", {
        method: "PUT",
        body: toBePublished
    });

    return res.json();
}