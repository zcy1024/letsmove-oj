import {getPersonalInfo} from "@/lib/contracts";

export default async function getScore(user: string) {
    const {accepted} = await getPersonalInfo(user);
    return (new Set(accepted)).size;
}