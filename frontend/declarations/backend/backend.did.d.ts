import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'title' : string,
  'body' : string,
  'author' : string,
  'timestamp' : bigint,
  'category' : string,
}
export interface _SERVICE {
  'addPost' : ActorMethod<[string, string, string, string], undefined>,
  'getCategories' : ActorMethod<[], Array<string>>,
  'getPosts' : ActorMethod<[], Array<Post>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
