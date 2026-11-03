
function UserProfileCard({ avatar, fullName, jobTitle, isOnline, skills }) {
  const handleContact = () => {
    alert(`Đang kết nối với ${fullName}...`);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-xl w-full max-w-sm">
      {/* Avatar và thông tin */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={fullName}
          className="rounded-full w-16 h-16 object-cover"
        />

        <div>
          <h2 className="font-bold text-xl">{fullName}</h2>
          <p className="text-gray-500">{jobTitle}</p>
        </div>
      </div>

      {/* Trạng thái */}
      <div className="flex items-center gap-2 mt-4">
        <span
          className={`w-3 h-3 rounded-full ${
            isOnline ? "bg-green-400" : "bg-gray-400"
          }`}
        ></span>

        <span className="text-gray-600 text-sm">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Danh sách kỹ năng */}
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 px-3 py-1 rounded-full text-blue-700 text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Nút liên hệ */}
      <button
        onClick={handleContact}
        className="bg-blue-600 hover:bg-blue-700 mt-5 py-2 rounded-lg w-full text-white"
      >
        Liên hệ
      </button>
    </div>
  );
}

export default UserProfileCard;
