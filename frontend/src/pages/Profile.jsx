import { useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Varenya Ramayanam",
    username: "varenya_r",
    bio: "Tech enthusiast | Developer | Music lover",
    followers: [
      { id: 1, name: "Alice", username: "alice_w" },
      { id: 2, name: "John", username: "john_doe" },
      { id: 3, name: "Sophia", username: "sophia_m" },
    ],
    following: [
      { id: 4, name: "Michael", username: "michael_b" },
      { id: 5, name: "Emma", username: "emma_k" },
    ],
    posts: [
      { id: 1, image: "https://source.unsplash.com/random/300x300?tech", caption: "Building something cool! 🚀" },
      { id: 2, image: "https://source.unsplash.com/random/300x300?music", caption: "Jamming to my favorite tunes 🎶" },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };
  const handleChange = (e) => setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });

  const handleRemoveFollower = (id) => {
    setUser({ ...user, followers: user.followers.filter((f) => f.id !== id) });
  };

  const handleUnfollow = (id) => {
    setUser({ ...user, following: user.following.filter((f) => f.id !== id) });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <img
          src="https://source.unsplash.com/random/150x150?person"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
              <textarea
                name="bio"
                value={updatedUser.bio}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
              <button
                onClick={handleSaveClick}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">@{user.username}</p>
              <p className="text-gray-700">{user.bio}</p>
              <div className="flex space-x-4 mt-2">
                <button
                  className="font-semibold text-blue-600 underline"
                  onClick={() => setShowFollowers(true)}
                >
                  {user.followers.length} Followers
                </button>
                <button
                  className="font-semibold text-blue-600 underline"
                  onClick={() => setShowFollowing(true)}
                >
                  {user.following.length} Following
                </button>
              </div>
              <button
                onClick={handleEditClick}
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <h3 className="mt-6 text-xl font-semibold">Posts</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {user.posts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden">
            <img src={post.image} alt="Post" className="w-full h-40 object-cover" />
            <p className="p-2 text-sm">{post.caption}</p>
          </div>
        ))}
      </div>

      {/* Followers List */}
      {showFollowers && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold">Followers</h3>
            {user.followers.length === 0 ? (
              <p className="text-gray-500">No followers yet.</p>
            ) : (
              <ul>
                {user.followers.map((f) => (
                  <li key={f.id} className="flex justify-between items-center p-2 border-b">
                    <p>{f.name} (@{f.username})</p>
                    <button
                      onClick={() => handleRemoveFollower(f.id)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowFollowers(false)}
              className="mt-3 bg-gray-300 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Following List */}
      {showFollowing && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold">Following</h3>
            {user.following.length === 0 ? (
              <p className="text-gray-500">You're not following anyone yet.</p>
            ) : (
              <ul>
                {user.following.map((f) => (
                  <li key={f.id} className="flex justify-between items-center p-2 border-b">
                    <p>{f.name} (@{f.username})</p>
                    <button
                      onClick={() => handleUnfollow(f.id)}
                      className="text-red-500 text-sm"
                    >
                      Unfollow
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowFollowing(false)}
              className="mt-3 bg-gray-300 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
