import {suiClient} from "@/config";
import {ProblemList} from "@/config/key";
import {problemType as singleProblem} from "@/store/modules/oj";

type problemType = {
    fields: {
        key: string,
        value: {
            fields: singleProblem
        }
    }
}

type contentType =
    | {
    dataType: 'moveObject'
    fields: {
        list: {
            fields: {
                contents: problemType[]
            }
        }
    }
}
    | {
    dataType: 'package',
    disassembled: {
        [key: string]: unknown;
    };
}

export default async function getProblems() {
    const res = await suiClient.getObject({id: ProblemList, options: {showContent: true}});
    const content = res.data!.content as contentType;
    const ret = new Map<string, singleProblem>();
    if (content.dataType === 'moveObject') {
        const problems = content.fields.list.fields.contents;
        problems.forEach(problem => {
            ret.set(problem.fields.key, {
                title: problem.fields.value.fields.title,
                gas: problem.fields.value.fields.gas,
                detail: problem.fields.value.fields.detail,
                accepted: problem.fields.value.fields.accepted,
                submitted: problem.fields.value.fields.submitted
            });
        });
    }
    return ret;
}