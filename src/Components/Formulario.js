import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import useMoneda from "../Hooks/useMoneda";
import useCriptomoneda from "../Hooks/useCriptomoneda";
import Error from "./Error";
import axios from "axios";

const Botton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color .3 ease

  &:hover{
      background-color: #326AC0
  }
`;

const Formulario = ({ guardarCriptomoneda, guardarMoneda }) => {
  //state Cripto
  const [listacripto, guardarCriptomonedas] = useState([]);
  const [errors, setErrors] = useState(false);

  const MONEDAS = [
    {
      codigo: "USD",
      nombre: "Dolar de Estados Unidos",
    },
    {
      codigo: "MXN",
      nombre: "Peso Mexicano",
    },
    {
      codigo: "EUR",
      nombre: "Euro",
    },
  ];
  const [moneda, SelectMoneda] = useMoneda("Elige tu Moneda", "", MONEDAS);

  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const API =
        "67aface2a2abda8c49bfacde0e3f9b95fe6a3df56d19145bc2a7ed1cbb8ec937";

      const resultado = await axios.get(url);
      guardarCriptomonedas(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  const cotizarMoneda = (e) => {
    e.preventDefault();

    if (moneda === "" || criptomoneda === "") {
      setErrors(true);
      return;
    }

    setErrors(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {errors ? <Error title="Hay un error" /> : null}
      <SelectMoneda />
      <SelectCripto />
      <Botton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
