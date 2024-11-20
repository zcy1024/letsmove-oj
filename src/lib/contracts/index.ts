import AddQuestion from "@/lib/contracts/questions";
import {getProblems, getProblemByID} from "@/lib/contracts/problems"
import submit from "@/lib/contracts/submit";
import {acceptProblem, getPersonalInfo} from "@/lib/contracts/personal"
import personalShare from "@/lib/contracts/share";

export {
    AddQuestion,
    getProblems,
    getProblemByID,
    submit,
    acceptProblem,
    getPersonalInfo,
    personalShare
}