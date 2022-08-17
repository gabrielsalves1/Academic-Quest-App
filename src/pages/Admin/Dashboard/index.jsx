import React, {useEffect, useState }from "react";
// import style from "./PieChart.module.scss";
import { Chart } from "react-google-charts";
import _ from "lodash"
import { getData } from "../../../service/requests";
import { RiContactsBookLine } from "react-icons/ri";
import Container from "../../../components/Container";

export default function Dashboard() {
  const loadData = (data) => {
    const values = _.groupBy(data, (value) => value.status)
    
    const result = _.map(values, (value, key) => {
      return [
        key, 
        values[key].length
      ]
    });

    return [ ["status", "qtd grupos"], ...result,]
  }

  const result = 
  {
    "result" : { 
    "projeto" : "TCC1",
    "statusProjeto" : "EM_ANDAMENTO",
    "tarefas" : 
      [
        {
          "nomeTarefa" : "Introdução",
          "dataEntrega" : "xx/xx/xxxx",
          "status":  "aberta",
          "tarefasGrupo" : [
            {
              "nomeGrupo" : "Fumacas",
              "status" : "PENDENTE"
            },
            {
              "nomeGrupo" : "Boston Dynamics",
              "status" : "ENTREGUE"
            },
            {
              "nomeGrupo" : "Paola",
              "status" : "ENTREGUE"
            },
            {
              "nomeGrupo" : "Paola",
              "status" : "ENTREGUE"
            },
            {
              "nomeGrupo" : "Os Nadas",
              "status" : "CORRIGIDA"
            }
          ]
        },
        {
          "nomeTarefa" : "Cronograma",
          "dataEntrega" : "xx/xx/xxxx",
          "status":  "aberta",
          "tarefasGrupo" : [
              {
                  "nomeGrupo" : "Fumacas",
                  "status" : "CORRIGIDA"
              },
              {
                  "nomeGrupo" : "Boston Dynamics",
                  "status" : "Entregue"
              }
                ]
              }
      ]
  }
  }

  useEffect (() => { 
    // pegar da api
    // getData(`/materias`, setData, setLoading);
 
    // data2["result"]["tarefas"].forEach((tarefa)  =>
    //   {if (tarefa.status == "aberta") {
    //     setDataFinal(loadData(tarefa.tarefasGrupo))      
    //   };
    // })

  }, [])
  

  
 
  
  return (
    <>   
      <div classStyle="containerDisplayFlex">
        {result["result"]["tarefas"].map((tarefa)  => {
          {if (tarefa.status == "aberta") {
            const options = {
              title: tarefa.nomeTarefa,
              colors: ["#845EC2", "#D65DB1", "#5D8DD6"]
            };
            return (
              <Chart
                chartType="PieChart"
                options={options}
                data={loadData(tarefa.tarefasGrupo)}
                width={"500px"}
                height={"500px"}
              />  
            )
          }}
        })}
      </div> 
    </>
  )
}
