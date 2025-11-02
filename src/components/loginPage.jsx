import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-[900px] h-[500px] bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Bagian kiri - Welcome */}
        <div className="w-1/2 flex flex-col justify-center px-10 text-white bg-gradient-to-br from-gray-400 to-gray-500">
          <h1 className="text-3xl font-bold mb-4">Welcome to website</h1>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Bagian kanan - Form Login */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-white">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">
            USER LOGIN
          </h2>
          <form className="w-3/4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-gray-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gray-400 hover:bg-gray-500 text-white font-semibold transition duration-200"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
