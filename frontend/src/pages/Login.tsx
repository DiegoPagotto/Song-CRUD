import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Header } from "../components/Header";

import { login, signup } from "../api/users/users";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [usernameSignup, setUsernameSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const handleUsernameSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameSignup(e.target.value);
  };

  const handlePasswordSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordSignup(e.target.value);
  };

  const handleUsernameLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameLogin(e.target.value);
  };

  const handlePasswordLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordLogin(e.target.value);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    const user = {
      username: usernameLogin,
      password: passwordLogin,
    };

    login(user)
      .then((response) => {
        localStorage.setItem("token", response.data.success.token);
        navigate("/songs");
      })
      .catch(() => {
        toast.error("Usuário ou senha incorretos ou não encontrados.");
      });
  };

  const handleSignup = (e: any) => {
    e.preventDefault();

    if (usernameSignup === "" || passwordSignup === "") return toast.error("Preencha todos os campos.");

    const user = {
      username: usernameSignup,
      password: passwordSignup,
    };

    signup(user)
      .then(() => {
        toast.success("Usuário cadastrado com sucesso, agora realize o login.")
        setUsernameSignup("");
        setPasswordSignup("");
      })
      .catch(() => {
        toast.error("Usuário já cadastrado.");
        setUsernameSignup("");
        setPasswordSignup("");
      });
  };
  return (
    <>

      <main className="flex flex-col gap-10 items-center justify-center h-screen w-full">
        <div className="flex items-center justify-center h-full">
          <Header modalAction={() => { }} showOptions={false} />
          <div className="w-full max-w-xl">
            <div className="flex space-x-6">
              <div className="w-2/3">
                <h1 className="text-3xl font-bold mb-8 text-center">Registro</h1>
                <form className="bg-violet-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="shadow bg-violet-200  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="usernameSignup"
                      type="text"
                      placeholder="Digite seu username"
                      value={usernameSignup}
                      onChange={handleUsernameSignupChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Senha
                    </label>
                    <input
                      className="shadow bg-violet-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="passwordSignup"
                      type="password"
                      placeholder="Digite sua senha"
                      value={passwordSignup}
                      onChange={handlePasswordSignupChange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-violet-500 w-full hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleSignup}
                    >
                      Registrar
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-2/3">
                <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
                <form className="bg-violet-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="usernameLogin"
                    >
                      Username
                    </label>
                    <input
                      className="shadow bg-violet-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="usernameLogin"
                      type="text"
                      placeholder="Digite seu username"
                      value={usernameLogin}
                      onChange={handleUsernameLoginChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="passwordLogin"
                    >
                      Senha
                    </label>
                    <input
                      className="shadow bg-violet-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="passwordLogin"
                      type="password"
                      placeholder="Digite sua senha"
                      value={passwordLogin}
                      onChange={handlePasswordLoginChange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-violet-500 w-full hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleLogin}
                    >
                      Entrar
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
          <Toaster position="top-right" />
        </div>
      </main>
    </>
  );
};

export default Login;
