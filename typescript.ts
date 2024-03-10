type UserStatus = "online" | "invisible" | "away" | "offline" | "dnd";

type User = {
  name: string,
  age: number,
  banned: boolean,
  status: UserStatus
}

type Example = {
  creation_date: string; //datestring
  id: `${string}-${string}-${string}-${string}` //uuid
  like_count: number,
  author: User
}



/**
 * The following function has been implemented naively, with the widest types
 * The input params don't have any intellisense/autocomplete, and the function allows invalid imputs
 * Improve the function's type signature. Points are awarded for:
 * - autocompletion
 * - narrowness of types
 * - correctness of types and hence how good the build-time guarantees are
 * - readability
 * - extendability of relevant types
 */
function setValue<Key extends keyof Example>(key: Key, value: Example[Key]): void {
  console.log(`Set ${key} to ${value}`) //imagine this writes to something like LocalStorage or URLSearchParams
}


setValue("nonexistent", 1231)
setValue("like_count", "morbillion")
setValue("like_count", 56)





/**
 * The following function should receive a list of allowed states and the initial state
 * Yet the current implementation doesn't check if the initial state is one of the allowed states
 * 
 * This is a bonus question, and you don't need to successfully complete it, but points will be made
 * for your approach to solving this problem, even if you don't succeed. While it is possible, solving it is not trivial
 * in current versions of Typescript, but TS has added a utility type that trivially solves it on the day of making this excercize 
 */
function bonus<T extends string>(allowed_states: T[], initial: T) {
  if (!allowed_states.includes(initial)) {
    throw new Error('initial state does not belong to the allowe states')
  }
  console.log(allowed_states, initial)
}

bonus(["foo", "bar"], "invalid")