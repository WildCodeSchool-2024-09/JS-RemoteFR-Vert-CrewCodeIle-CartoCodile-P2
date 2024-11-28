const ClientCard = ({
  profilepic,
  clientName,
  clientJob,
}: { profilepic: string; clientName: string; clientJob: string }) => {
  return (
    <div className="bg-indigo-900 w-64 lg:w-56 h-64 py-1 flex flex-col items-center justify-center gap-3 rounded-md">
      <img
        className="rounded-md w-32"
        src={profilepic}
        alt={`${clientName} portrait`}
      />
      <h3 className="text-secondary text-2xl font-Koulen">{clientName}</h3>
      <span className="text-secondary text-lg font-NotoSans">{clientJob}</span>
    </div>
  );
};

export default ClientCard;
