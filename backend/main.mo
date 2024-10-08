import Func "mo:base/Func";
import Int "mo:base/Int";
import Text "mo:base/Text";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor {
  // Define the structure for a blog post
  type Post = {
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
    category: Text;
  };

  // Use a stable variable to store posts
  stable var posts : [Post] = [];

  // Define available categories
  let categories = ["Bitcoin", "Ethereum", "DeFi", "NFTs", "Blockchain"];

  // Function to add a new post
  public func addPost(title: Text, body: Text, author: Text, category: Text) : async () {
    let newPost : Post = {
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
      category = category;
    };
    posts := Array.append<Post>([newPost], posts);
  };

  // Function to get all posts, sorted by timestamp (most recent first)
  public query func getPosts() : async [Post] {
    Array.sort<Post>(posts, func(a, b) {
      if (a.timestamp > b.timestamp) { #less }
      else if (a.timestamp < b.timestamp) { #greater }
      else { #equal }
    })
  };

  // Function to get all available categories
  public query func getCategories() : async [Text] {
    categories
  };
}