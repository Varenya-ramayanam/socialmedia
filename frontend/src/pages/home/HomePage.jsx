import { useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      image: "https://source.unsplash.com/random/300x300?tech", 
      caption: "Building something cool! 🚀", 
      likes: 10, 
      comments: [] 
    },
    { 
      id: 2, 
      image: "https://source.unsplash.com/random/300x300?music", 
      caption: "Jamming to my favorite tunes 🎶", 
      likes: 5, 
      comments: [] 
    },
  ]);

  const [newPost, setNewPost] = useState({ image: "", caption: "" });
  const [commentText, setCommentText] = useState({});

  // Handle creating a new post
  const handleCreatePost = () => {
    if (newPost.image && newPost.caption) {
      setPosts([{ ...newPost, id: Date.now(), likes: 0, comments: [] }, ...posts]);
      setNewPost({ image: "", caption: "" });
    }
  };

  // Handle liking a post
  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  // Handle adding a comment
  const handleAddComment = (id) => {
    if (commentText[id]) {
      setPosts(posts.map(post =>
        post.id === id ? { ...post, comments: [...post.comments, commentText[id]] } : post
      ));
      setCommentText({ ...commentText, [id]: "" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Post Creation Section */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-bold mb-3">Create a Post</h2>
        <input
          type="text"
          placeholder="Image URL"
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
          className="border p-2 w-full rounded mb-2"
        />
        <textarea
          placeholder="Write a caption..."
          value={newPost.caption}
          onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
          className="border p-2 w-full rounded mb-2"
        />
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Post
        </button>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg overflow-hidden mb-6">
          <img src={post.image} alt="Post" className="w-full h-40 object-cover" />
          <p className="p-2 text-sm">{post.caption}</p>
          
          {/* Like Button */}
          <div className="flex items-center justify-between px-4 py-2">
            <button onClick={() => handleLike(post.id)} className="text-blue-500 font-semibold">
              ❤️ {post.likes} Likes
            </button>
          </div>

          {/* Comment Section */}
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText[post.id] || ""}
              onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
              className="border p-2 w-full rounded mb-2"
            />
            <button
              onClick={() => handleAddComment(post.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg w-full"
            >
              Add Comment
            </button>
            <div className="mt-3">
              {post.comments.map((comment, index) => (
                <p key={index} className="text-gray-700 text-sm bg-gray-100 p-2 rounded mt-1">{comment}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
