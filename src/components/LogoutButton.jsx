const LogoutButton = () => {
    const handleLogout = async () => {
        await fetch("https://api.flatty.ai/api/v1/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <button
            onClick={handleLogout}
            className="text-[#703ACA] font-semibold"
        >
            Logout
        </button>
    );
}

export default LogoutButton;