module letsmoveoj::personal;

use sui::vec_map::{Self, VecMap};
use letsmoveoj::problem::ProblemList;
use letsmoveoj::admin::AdminList;

const E_NOT_CORRECT_PROBLEM: u64 = 0;
const E_NOT_ADMIN: u64 = 1;

public struct PersonalInfo has store {
    accepted: vector<u64>,
    share: vector<u64>
}

public struct PersonList has key {
    id: UID,
    list: VecMap<address, PersonalInfo>
}

fun init(ctx: &mut TxContext) {
    transfer::share_object(PersonList {
        id: object::new(ctx),
        list: vec_map::empty<address, PersonalInfo>()
    });
}

fun new_user(user: address, list: &mut PersonList) {
    list.list.insert(user, PersonalInfo {
        accepted: vector[],
        share: vector[]
    });
}

entry fun accept_problem(
    user: address,
    list: &mut PersonList,
    pid: u64,
    problem_list: &ProblemList,
    admin_list: &AdminList,
    ctx: &TxContext
) {
    assert!(problem_list.has_problem(pid), E_NOT_CORRECT_PROBLEM);
    assert!(admin_list.is_admin(ctx.sender()), E_NOT_ADMIN);
    if (!list.list.contains(&user)) {
        new_user(user, list);
    };
    list.list[&user].accepted.push_back(pid);
}

public fun accepted(list: &mut PersonList, user: address, pid: u64): bool {
    if (!list.list.contains(&user)) {
        new_user(user, list);
    };
    list.list[&user].accepted.contains(&pid)
}

public fun share_content(list: &mut PersonList, user: address, sid: u64) {
    list.list[&user].share.push_back(sid);
}