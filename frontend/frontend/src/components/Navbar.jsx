function Navbar({ user, setUser }) {
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="font-bold text-lg">Task Manager</h1>

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div className="flex gap-2">
          <button>Login</button>
          <button>Signup</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
