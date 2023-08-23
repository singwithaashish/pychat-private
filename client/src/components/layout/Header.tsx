export default function Header(
  {isOnline}: {isOnline: boolean}
) {
  const logOut = () => {
    localStorage.removeItem("user-token");
    window.location.href = "/login";
  };
  return (
    <header className="w-full h-[10%] bg-gray-600 text-white flex items-center justify-between px-20">
      <div className="flex items-center">
      <h1 className="text-2xl font-bold">PyChat</h1>
        <div className={"w-2 h-2 rounded-full ml-2 " + (isOnline ? " bg-lime-400" : " bg-red-500")}></div>
      </div>
      <div
        className=" bg-red-600 cursor-pointer text-center font-bold flex justify-center items-center p-2 rounded text-white"
        onClick={logOut}
      >
        Log Out
      </div>
    </header>
  );
}
