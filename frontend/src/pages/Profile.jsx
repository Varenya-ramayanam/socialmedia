import { useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Varenya Ramayanam",
    username: "varenya_r",
    bio: "Tech enthusiast | Developer | Music lover",
    followers: 1200,
    following: 150,
    posts: [
      { id: 1, image: "https://source.unsplash.com/random/300x300?tech", caption: "Building something cool! 🚀" },
      { id: 2, image: "https://source.unsplash.com/random/300x300?music", caption: "Jamming to my favorite tunes 🎶" },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
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
                <p className="font-semibold">{user.followers} Followers</p>
                <p className="font-semibold">{user.following} Following</p>
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
    </div>
  );
};

export default ProfilePage;
