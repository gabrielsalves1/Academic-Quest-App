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
  const [ project, setProject ] = useState();
  const { idProject } = useParams();
  const [ count, setCount ] = useState(0);
  const [ dataEntregues, setDataEntregues] = useState([]);
  const [ optionsEntregue, setOptionsEntregue ] = useState({
    chart: {
      title: "Quests entregues por grupo",
    },
  })
  const [ dataNaoEntregues, setDataNaoEntregues] = useState([]);
  const [ optionsNaoEntregue, setOptionsNaoEntregue ] = useState({
    chart: {
      title: "Quests não entregues por grupo",
    },
  })


  useEffect(() => {
    getData(`/dashboard/${idProject}`, setProject, setLoading);
  }, [idProject]);

  useEffect(() => {
    lateQuestCalculus()
    questsDeliveredByGroup()
    questsNotDeliveredByGroup()
  }, [project]);
  
 
  const lateQuestCalculus = () => {
    setCount(0)
    let num = 0;
  
    project?.result.tarefas.map((tarefa)  => {
      if (tarefa.status === null) {
          num+= 1
      }
    })
    setCount(num)
  }

  const groupBy_QuestsDeliveredByGroup = (dataEntregues) => {
    const values = _.groupBy(dataEntregues, (value) => value.nomeGrupo)
    const result = _.map(values, (value, key) => {
      return [
        key, 
        values[key].length
      ]
    });
    
    return [ ["Grupo", "Entregues"], ...result]
  }

  const questsDeliveredByGroup = () => {
    const array = [];

    project?.result.tarefas.map((tarefa)  => {
      const tarefaGrupo = tarefa?.tarefasGrupos

      tarefaGrupo.forEach((tarefa_grupo) => {
        if(tarefa.status === "ENTREGUE"  || tarefa.status === "CORRIGIDA") {
          array.push(tarefa) 
        }
      })
   
    })
    setDataEntregues(groupBy_QuestsDeliveredByGroup(array))
  }

  const groupBy_QuestsNotDeliveredByGroup = (body) => {
    const values = _.groupBy(body, (value) => value.nomeGrupo)

    const result = _.map(values, (value, key) => {
      return [
        key, 
        values[key].length
      ]
    });
    
    return [ ["Grupo", "Não entregues"], ...result]
  }

  const questsNotDeliveredByGroup = () => {
    const arrayNot = [];

    project?.result.tarefas.map((tarefa)  => {
      const tarefaGrupo = tarefa?.tarefasGrupos
      tarefaGrupo.forEach((tarefa_grupo) => {
        if(tarefa_grupo.status === "PENDENTE") {
          arrayNot.push(tarefa_grupo) 
        }
      })

    })

    setDataNaoEntregues(groupBy_QuestsNotDeliveredByGroup(arrayNot))
  }

  const groupByStatus = (dataEntregues) => {
    const values = _.groupBy(dataEntregues, (value) => value.status)

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
              "status" : "PENDENTE"
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
            },
            { 
              "id": 6,
              "nomeGrupo" : "Paola",
              "status" : "ENTREGUE"
            },
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
              "status" : "ENTREGUE"
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
              "status" : "CORRIGIDA"
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
      {project?.result.tarefas.map((tarefa)  => {
        {if (tarefa.status === "PENDENTE") {
          const tarefaGrupo = tarefa?.tarefasGrupos
          const options = {
            title: tarefa.nomeTarefa,
            colors: ["#845EC2", "#D65DB1", "#5D8DD6"]
          };
          return (
            <>
            <div className={style.chartBox}> 
              <Chart
                chartType="PieChart"
                options={options}
                data={groupByStatus(tarefaGrupo)}
                width={"500px"}
                height={"300px"}
              /> 
              <div> 
                Data de entrega: {tarefa.dataEntrega}
              </div>
            </div> 
           
            </>
          )
        }}
      })}

      <ul className={style.boxQuestSchedule}>
        {project?.result.tarefas.map((tarefa)  => {

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

      { dataEntregues &&
        <div className={style.chartDiffBox}> 
          <Chart
            chartType="Bar"
            width="70%"
            height="300px"
            data={dataEntregues}
            options={optionsEntregue}
          />
        </div> 
      }

      { dataNaoEntregues &&
        <div className={style.chartDiffBox}> 
          <Chart
            chartType="Bar"
            width="70%"
            height="300px"
            data={dataNaoEntregues}
            options={optionsNaoEntregue}
          />
        </div> 
      }
    </div>
    </>
  )
}