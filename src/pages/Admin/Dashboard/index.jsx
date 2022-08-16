import React, {useEffect, useState }from "react";
// import style from "./PieChart.module.scss";
import { Chart } from "react-google-charts";
import _ from "lodash"
import { getData } from "../../../service/requests";
import { RiContactsBookLine } from "react-icons/ri";


export default function Dashboard() {
  const [ loading, setLoading ] = useState();
  const [ chartData, setChartData] = useState([])
  const [ dataFinal, setDataFinal] = useState([])
  const [ allOpenQuests, setAllOpenQuests] = useState([])
  // const [ options, setOptions] = useState({})
  
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

  useEffect (() => { 
    // pegar da api
    // getData(`/materias`, setData, setLoading);
 

    const data2 = 
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

    data2["result"]["tarefas"].forEach((tarefa)  =>
      {if (tarefa.status == "aberta") {
        setDataFinal(loadData(tarefa.tarefasGrupo))      
      };
    })

  }, [])
  
  const options = {
    title: "Quest 3 - Requisitos do projeto",
    colors: ["#845EC2", "#D65DB1", "#5D8DD6"]
  };
 
  
  return (
    <>    
      <Chart
        chartType="PieChart"
        options={options}
        data={dataFinal}
        width={"1000px"}
        height={"1000px"}
        
      />      
    </>
  )
}
