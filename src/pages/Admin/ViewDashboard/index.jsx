import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./ViewDashboard.module.scss";
import { Chart } from "react-google-charts";
import _ from "lodash"
import { getData } from "../../../service/requests";
import BallStatusDanger from "../../../components/BallStatusDanger";
import BallStatusSuccess from "../../../components/BallStatusSuccess";

export default function Dashboard() {
  const [ loading, setLoading ] = useState();
  const { idProject } = useParams();
  const [ project, setProject ] = useState();
  const [ count, setCount ] = useState(0);
  const [ optionsForQuestsByGroup, setOptionsForQuestByGroup ] = useState([]);
  const [ dataQuestsnotDelivered, setDataQuestsnotDelivered] = useState([]);
  const [ dataQuestsDelivered, setDataQuestsDelivered] = useState([]);
  const [ diffData, setDiffData] = useState({});

  useEffect (() => { 
    // pegar da api
    // getData(`/urldojoao/${idProject}`, setProject, setLoading);

    lateQuestCalculus(result)
    questsDeliveredByGroup(result)
    questsNotDeliveredByGroup(result)
  
  }, [idProject])

  useEffect (() => {
    setDiffData({new: dataQuestsDelivered, old: dataQuestsnotDelivered})
  }, [dataQuestsDelivered, dataQuestsnotDelivered])

  const groupByStatus = (data) => {
    const values = _.groupBy(data, (value) => value.status)

    const result = _.map(values, (value, key) => {
      return [
        key, 
        values[key].length
      ]
    });

    return [ ["status", "qtd grupos"], ...result,]
  }


  const groupBy_QuestsDeliveredByGroup = (data) => {
    const values = _.groupBy(data, (value) => value.nomeGrupo)
    const result = _.map(values, (value, key) => {
      return [
        key, 
        values[key].length
      ]
    });

    return [ ["Grupo", "Entregues"], ...result,]


  }

  const groupBy_QuestsNotDeliveredByGroup = (data) => {
    const values = _.groupBy(data, (value) => value.nomeGrupo)

    const result = _.map(values, (value, key) => {
      return [
        key, 
        values[key].length
      ]
    });

    return [ ["Grupo", "Não Entregues"], ...result,]
  }

  const lateQuestCalculus = (result) => {
    setCount(0)
    let num = 0;

    result["result"]["tarefas"].map((tarefa)  => {
      tarefa["tarefasGrupo"].forEach((tarefaGrupo) => {

        {if (tarefaGrupo.status === "ENTREGUE") {
          num+= 1
        }}

      })
    })
    setCount(num)

  }

  const questsNotDeliveredByGroup = (result) => {
    const arrayNot = [];
    result["result"]["tarefas"].map((tarefa)  => {
      tarefa["tarefasGrupo"].map((tarefaGrupo) => {
        if(tarefaGrupo["status"] === "PENDENTE") {
          arrayNot.push(tarefaGrupo) 
        }
      })

    })
    setDataQuestsnotDelivered(groupBy_QuestsNotDeliveredByGroup(arrayNot))
  }

  const questsDeliveredByGroup = (result) => {
    const array = [];
    result["result"]["tarefas"].map((tarefa)  => {
      tarefa["tarefasGrupo"].map((tarefaGrupo) => {
        if(tarefaGrupo["status"] === "ENTREGUE"  || tarefaGrupo.status === "CORRIGIDA") {
          array.push(tarefaGrupo) 
        }
      })

    })
    setDataQuestsDelivered(groupBy_QuestsDeliveredByGroup(array))

  }


  const result = 
  {
    "result" : { 
    "id": 12,
    "projeto" : "TCC1",
    "statusProjeto" : "EM_ANDAMENTO",
    "tarefas" : 
      [
        {
          "nomeTarefa" : "Introdução",
          "dataEntrega" : "20/09/2022",
          "status":  "aberta",
          "tarefasGrupo" : [
            { 
              "id": 1,
              "nomeGrupo" : "Fumacas",
              "status" : "CORRIGIDA"
            },
            { "id": 2,
              "nomeGrupo" : "Boston Dynamics",
              "status" : "ENTREGUE"
            },
            { 
              "id": 3,
              "nomeGrupo" : "Paola",
              "status" : "ENTREGUE"
            },
            { "id": 4,
              "nomeGrupo" : "Paola",
              "status" : "PENDENTE"
            },
            { "id": 5,
              "nomeGrupo" : "Os Nadas",
              "status" : "ENTREGUE"
            }
          ]
        },
        {
          "nomeTarefa" : "Cronograma",
          "dataEntrega" : "20/10/2022",
          "status":  "fechada",
          "tarefasGrupo" : [
            { 
              "id": 1,
              "nomeGrupo" : "Fumacas",
              "status" : "CORRIGIDA"
            },
            { "id": 2,
              "nomeGrupo" : "Boston Dynamics",
              "status" : "ENTREGUE"
            },
            { 
              "id": 3,
              "nomeGrupo" : "Paola",
              "status" : "ENTREGUE"
            },
            { "id": 4,
              "nomeGrupo" : "Paola",
              "status" : "PENDENTE"
            },
            { "id": 5,
              "nomeGrupo" : "Os Nadas",
              "status" : "ENTREGUE"
            }
                ]
        },
        {
          "nomeTarefa" : "Criação do protótipo front-end baixa fidelidade",
          "dataEntrega" : "20/11/2022",
          "status":  "aberta",
          "tarefasGrupo" : [
            { 
              "id": 1,
              "nomeGrupo" : "Fumacas",
              "status" : "PENDENTE"
            },
            { "id": 2,
              "nomeGrupo" : "Boston Dynamics",
              "status" : "PENDENTE"
            },
            { 
              "id": 3,
              "nomeGrupo" : "Paola",
              "status" : "PENDENTE"
            },
            { "id": 4,
              "nomeGrupo" : "Paola",
              "status" : "PENDENTE"
            },
            { "id": 5,
              "nomeGrupo" : "Os Nadas",
              "status" : "PENDENTE"
            }
            ]
        },
      ]
  }
  }

  return (
    <>
    <div className={style.containerDashboard}>
      {result["result"]["tarefas"].map((tarefa)  => {
        {if (tarefa.status == "aberta") {
          const options = {
            title: tarefa.nomeTarefa,
            colors: ["#845EC2", "#D65DB1", "#5D8DD6"]
          };
          return (
            <div className={style.chartBox}> 
              <Chart
                chartType="PieChart"
                options={options}
                data={groupByStatus(tarefa.tarefasGrupo)}
                width={"500px"}
                height={"300px"}
              /> 
            </div> 
          )
        }}
      })}

      <ul className={style.boxQuestSchedule}>
        {result["result"]["tarefas"].map((tarefa)  => {

          return (
            <li key={tarefa.id} className={style.questSchedule}>
              <span className={style.subtitle5}>{tarefa.nomeTarefa}:</span> <span>{tarefa.status === "aberta" ? <BallStatusSuccess/> : <BallStatusDanger/> }</span>
            </li>
          )

        })}
        <li className={style.questLegend}>
          <span><BallStatusSuccess/></span><span className={style.subtitle5}>Aberta</span>
          <span><BallStatusDanger/></span><span className={style.subtitle5}>Fechada</span>
        </li>
      </ul>  

      <ul className={style.boxQuestCount}>
        <li className={style.justifyContentCenter}>
          <span className={style.subtitle5}>Quests entregues esperando nota</span>
        </li>
        <li className={style.boxCount}>
          <span className={style.countFontSize}>{count}</span><span className={style.colorYellow}>quests</span>
        </li>
      </ul>

      { diffData &&
        <div className={style.chartDiffBox}> 
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            diffdata={diffData}
          />
        </div> 
       }
    </div>
    </>
  )
}