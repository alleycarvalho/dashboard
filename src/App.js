import React from "react";
import { Card, Typography } from "antd";

import "./App.css";

const { Title } = Typography;

const App = () => (
	<div className="CardBriefing">
		<Card title="React Dev Test">
			<p>
				O candidato deve ser capaz de criar um aplicação DASHBOARD
				usando React, com Ant Design, Router e Redux.
			</p>

			<Title level={2} type="danger">
				Obrigatoriedades
			</Title>

			<p>Usar as tecnologias/frameworks/libs.</p>

			<ul>
				<li>Ant Design</li>
				<li>React Hooks</li>
				<li>Redux</li>
				<li>React Router</li>
			</ul>

			<Title level={2} type="secondary">
				O Dashboard
			</Title>

			<p>O dashboard deve ser dividido em SIDEBAR e MAINVIEW.</p>

      <p>O MAINVIEW com as funcionalidades:</p>

			<ul>
				<li>
					Login (Email) e Senha (hardcoded)
					<ul>
						<li
							class="has-line-data"
							data-line-start="20"
							data-line-end="21"
						>
							Validação de dados e todos os são obrigatórios
						</li>
					</ul>
				</li>

				<li>Form Cadastro (Novo Usuário)</li>

				<li>
					Tabela de Usuário (Todos Usuários + Busca por nome)
					<ul>
						<li
							class="has-line-data"
							data-line-start="23"
							data-line-end="25"
						>
							Ao selecionar um usuário abrir Form Cadastro do
							usuário e podendo remover e alterar ou voltar para a
							tabela.
						</li>
					</ul>
				</li>
			</ul>

			<p>
				A MAINVIEW do dashboard deve ser comandada por um SIDEBAR com o
				seguinte menu:
			</p>

			<ul>
				<li>
					Usuários
					<ul>
						<li
							class="has-line-data"
							data-line-start="28"
							data-line-end="29"
						>
							Todos Usuários -&gt; Main &gt; Lista de Usuários
						</li>

						<li
							class="has-line-data"
							data-line-start="29"
							data-line-end="30"
						>
							Novo Usuário -&gt; Main &gt; Form Cadastro
						</li>
					</ul>
				</li>

				<li>
					Acesso Rápido
					<ul>
						<li
							class="has-line-data"
							data-line-start="31"
							data-line-end="32"
						>
							Monstrar 5 Primeiro Usuários da Tabela de Usuário
							com link para a seu Form Cadastro
						</li>
					</ul>
				</li>

				<li>Sair</li>
			</ul>

			<p>
				Utlizar a aplicação rest:{" "}
				<a href="https://gorest.co.in/">https://gorest.co.in/</a>
			</p>

			<ul>
				<li>GET /public-api/users:</li>
				<li>GET /public-api/users?first_name=john</li>
				<li>GET /public-api/users/123</li>
				<li>PUT /public-api/users/123</li>
				<li>DELETE /public-api/users/123</li>
			</ul>

			<Title level={2}>Entrega</Title>

			<p>
				Enviar a pasta <em>./dashboard/</em> compactada e com a seguinte
				estrutura:
			</p>

			<ul>
				<li>./public/*<em>/.</em></li>
				<li>./src/*<em>/.</em></li>
				<li>package.json</li>
				<li>.gitignore</li>
			</ul>
			<p>para o email que você recebeu o teste.</p>
		</Card>
	</div>
);

export default App;
