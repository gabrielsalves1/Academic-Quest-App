import React from "react";
import style from "./About.module.scss";
import Logo from '../../assets/img/logo-academic-quest.svg';

export default function About() {
  return (
    <article className={style.article} id="about">
      <h3 className={style.titleSecondary}>Sobre o Academic Quest</h3>

      <p className={style.textAlign}>
        Quem já passou pelo colégio/faculdade/cursos sabe como é confuso organizar e gerenciar trabalhos que duram um semestre inteiro com inúmeras entregas no meio do caminho. Neste cenário podemos observar dois caminhos paralelos:
      </p>
      <br/>
      <dd className={style.textAlign}> 
        - Do aluno, que na maioria das vezes se sente perdido com as entregas e confusos com os próximos passos, o professor demora para ajudar com dúvidas pontuais - fazendo o grupo empacar. Cada integrante do grupo usa uma ferramenta para se organizar individualmente com base em suas preferências, fazendo com que o trabalho fique espalhado em diversos lugares. O que era pra ser um desafio divertido em grupo, acaba virando uma frustração coletiva - o que atrapalha diretamente no aprendizado;
      </dd>
      <br/>
      <dd className={style.textAlign}>
        - E do professor, que tem o desafio de organizar as etapas, as entregas, os encontros, avaliar o trabalho de cada grupo - geralmente grupos de turmas diferentes - dar feedbacks coletivos e individuais, atender as dúvidas de cada grupo no tempo certo, aplicar as notas e tantas outras coisas, acaba sendo desgastante e desmotivador.
      </dd>
      <br/>
      <p>
        O sistema Academic Quest irá ajudar o aluno na hora de gerenciar as tarefas dos projetos acadêmicos, e os professores com relatórios, gráficos e um sistema de gerenciamento que irá auxiliar na criação de grupo e projetos por turma, Identificar Features das ferramentas mais utilizadas no mercado (Monday, Asana, entre outros) adaptando para a aplicação, analisando quais benefícios uma instituição leva em consideração na tomada de decisão de aquisição do sistema.
      </p>
    </article>
  );
}