module letsmoveoj::problem;

use sui::vec_map::{Self, VecMap};
use std::string::String;
use letsmoveoj::admin::AdminList;

const E_NOT_ADMIN: u64 = 0;
const E_NOT_EQUAL_NUMBER_INPUT_OUTPUT: u64 = 1;

public struct Data has store, drop {
    input: String,
    output: String
}

public struct Problem has store, drop {
    gas: u64,
    accepted: u64,
    submitted: u64,
    detail: String,
    data_per_type: String,
    data: vector<Data>
}

public struct ProblemList has key {
    id: UID,
    cur_pid: u64,
    list: VecMap<u64, Problem>
}

fun init(ctx: &mut TxContext) {
    transfer::share_object(ProblemList {
        id: object::new(ctx),
        cur_pid: 0,
        list: vec_map::empty<u64, Problem>()
    });
}

fun create_data(inputs: vector<String>, outputs: vector<String>): vector<Data> {
    let mut i = 0;
    let mut data = vector<Data>[];
    while (i < inputs.length()) {
        data.push_back(Data {
            input: inputs[i],
            output: outputs[i]
        });
        i = i + 1;
    };
    data
}

fun create_problem(
    gas: u64,
    detail: String,
    data_per_type: String,
    inputs: vector<String>,
    outputs: vector<String>
): Problem {
    Problem {
        gas,
        accepted: 0,
        submitted: 0,
        detail,
        data_per_type,
        data: create_data(inputs, outputs)
    }
}

entry fun add_problem(
    list: &mut ProblemList,
    gas: u64,
    detail: String,
    data_per_type: String,
    inputs: vector<String>,
    outputs: vector<String>,
    admin_list: &AdminList,
    ctx: &TxContext
) {
    assert!(admin_list.is_admin(ctx.sender()), E_NOT_ADMIN);
    assert!(inputs.length() == outputs.length(), E_NOT_EQUAL_NUMBER_INPUT_OUTPUT);
    let pid = list.cur_pid + 1;
    list.cur_pid = pid;
    list.list.insert(pid, create_problem(gas, detail, data_per_type, inputs, outputs));
}

entry fun remove_problem(list: &mut ProblemList, mut pids: vector<u64>, admin_list: &AdminList, ctx: &TxContext) {
    assert!(admin_list.is_admin(ctx.sender()), E_NOT_ADMIN);
    while (!pids.is_empty()) {
        let pid = pids.pop_back();
        list.list.remove(&pid);
    };
}

public fun has_problem(list: &ProblemList, pid: u64): bool {
    list.list.contains(&pid)
}