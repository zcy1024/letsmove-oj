import {getPersonalInfo} from "@/lib/contracts";

export default async function checkEnoughScore(user: string, score: number): Promise<[boolean, string]> {
    const {accepted} = await getPersonalInfo(user);
    const pid = accepted.pop();
    return [(new Set(accepted)).size + 1 === score, pid ? pid : "0"];
}