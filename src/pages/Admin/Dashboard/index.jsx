import React, {useEffect, useState }from "react";
// import style from "./PieChart.module.scss";
import { Chart } from "react-google-charts";
import _ from "lodash"

function PieChart() {
  
  const [ chartData, setChartData] = useState([])

  const loadData = (data) => {
    const values = _.groupBy(data, (value) => value.status)

    const result = _.map(values, (value, key) => {
      return [
        key, 
        _.sumBy(values[key], (v) => v.qtd)
      ]
    });


    return [
      ["status", "qtd grupos"], ...result,

    ]
  }

  useEffect (() => { 
    // pegar da api
    // projeto tem status


    // seleciona turma
    // seleciona matéria
    // seleciona projeto
      // cria tarefas {name}

    // tarefas > status > grupos que sao obrigados a entregar
    //grupo.tarefa.status

    // status: aberta, fechada, devolvida(com nota)
    // estado: pra fazer, fazendo, feito

    const data = [
      {quest: "Requisitos", group: "Fumacas", status: "done", qtd: 1 },
      {quest: "Requisitos", group: "Grupo 3", status: "doing", qtd: 1 },
      {quest: "Requisitos", group: "Grupo 2", status: "todo", qtd: 1 },
      {quest: "Requisitos", group: "Grupo 4", status: "doing", qtd: 1 },
      {quest: "Requisitos", group: "Grupo 5", status: "doing", qtd: 1 },
      {quest: "Requisitos", group: "Grupo 5", status: "done", qtd: 1 },
      {quest: "Requisitos", group: "Grupo 5", status: "todo", qtd: 1 },
    ];

    setChartData(loadData(data));
  }, [])

 
 

  const options = {
    title: "Quest 3 - Requisitos do projeto",
    colors: ["#00B983", "#FFAC2C", "#FF3143"]
  };

 
  
  return (
    <>
      <div className="card">

      </div>
      <Chart
        chartType="PieChart"
        options={options}
        data={chartData}
        width={"1000px"}
        height={"1000px"}
        
      />      
    </>
  )
}

export default PieChart;

