import React, { useState } from "react";
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    //Aqui também poderia ser api.post("/sessions",{email}) porque o a chave tem o mesmo nome do valor.
    //É transformado em uma variável porque a chamada da API retorna uma resposta, e essa vai ser armazenada ali
    const response = await api.post("/sessions", {
      email: email
    });
    console.log(response);
    //Verifica os dados que retornou do post na API e vai ter o ID do usuário lá.

    const { _id } = response.data;

    //Armazena o ID do usuário na variável 'user' dentro do banco de dados local da aplicação
    localStorage.setItem("user", _id);

    history.push("/dashboard");
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{" "}
        <strong>talentos</strong> para sua empresa.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL*</label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}
