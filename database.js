const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

const criarBanco = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });


    await db.exec(`
    CREATE TABLE IF NOT EXISTS pilotos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_piloto TEXT,
    localizacao TEXT,
    horarios_disponiveis TEXT,
    disponibilidade_emergencias TEXT
    
    )
    
    `)
    console.log('Banco de dados configurado: a tabela de registro está pronta!')



    const checagem = await db.get("SELECT COUNT (*) AS total FROM pilotos")
    if (checagem.total === 0) {
        await db.exec(`INSERT INTO pilotos (nome_piloto, localizacao, horarios_disponiveis, disponibilidade_emergencias) VALUES
    

       ("Carlos Henrique Souza", "Nova Friburgo (Centro)", "08h às 18h", "Sim"), 
       ("Rafael Gomes Silva", "Nova Friburgo (Olaria)", "14h às 22h", "Sim"), 
       ("Lucas Andrade Costa", "Bom Jardim (Banquete)", "09h às 17h", "Não"), 
       ("Diego Martins Rocha", "Nova Friburgo (Conselheiro Paulino)", "07h às 15h", "Sim"), 
       ("Bruno Ferreira Lima", "Nova Friburgo (Nova Suiça)", "10h às 20h", "Sim"), 
       ("Matheus Oliveira Santos", "Nova Friburgo (Lumiar)", "12h às 20h", "Não"), 
       ("Felipe Barbosa Nunes", "Nova Friburgo (Amparo)", "15h às 19h", "Sim"),
       ("Thiago Ribeiro Duarte", "Nova Friburgo (Campo do Coelho)", "06h às 14h", "Sim"), 
       ("Vinícius Carvalho Mendes", "Nova Friburgo (Mury)", "13h às 21h", "Sim") 


        `)

        console.log("Dados inseridos dentro da tabela pilotos")
    } else {
        console.log(`Banco pronto com ${checagem.total} de pilotos`)
    };

    //SELECT
    console.log("----- Total de Pilotos -----");
    const todoPiloto = await db.all(`SELECT * FROM pilotos`);
    console.log(todoPiloto);

    console.log("-----Bairro Piloto-----");
    const bairroPiloto = await db.all(`SELECT * FROM pilotos WHERE localizacao = "Nova Friburgo (Olaria)"`);
    console.log("bairroPiloto");

    console.log("-----Disponivel para Emergencias-----");
    const Emergencia = await db.all(`SELECT * FROM pilotos WHERE disponibilidade_emergencias = "Sim" `);

    //UPDATE
    await db.run(`
        UPDATE pilotos
        SET disponibilidade_emergencias = "Sim"
        WHERE localizacao = "Nova Friburgo (Mury)"
        `)

    console.log("Pilotos não disponiveis para emergencia");

    //SELECT FINAL
    console.log("-----Relatório Final-----");
    const todosPilotos = await db.all("SELECT * FROM pilotos");
    console.log(todosPilotos);

    
    };
criarBanco();


const criarTabela = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS abrigos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_abrigo TEXT,
        bairro TEXT,
        endereco TEXT,
        situacao TEXT                           --CHEIO OU DISPONIVEL
)
`)

    console.log("Banco de dados configurado: a tabela de registros está pronta!")

 const controle = await db.get("SELECT COUNT (*) AS total FROM abrigos")
    if(controle.total ===0) {
    await db.exec(`INSERT INTO abrigos (nome_abrigo, bairro, endereco, situacao)VALUES
    ("Cmei Elza Barbosa Melhorança", "Alto De Olaria", "Rua José Martins dos Santos, nº 54", "disponivel"),

    ("Cmei Júlia Irene Gomes Andrade", "Alto De Olaria", "Rua Raul Veiga nº 210", "disponivel"),

    ("Escola Municipal Américo Ventura Filho", "Alto De Olaria", "Rua Cândido Pardal nº 999", "disponivel"),

    ("Escola Municipal Lafayette Bravo Filho", "Alto do Floresta", "Rua Aureliano Barbosa Filho, s/nº", "disponivel"),

    ("Escola Municipal Ernesto Tessarolo (Parte Alta)", "Alto do Floresta", "Rua Aureliano Barbosa Faria, nº 40", "disponivel"),

    ("Escola Municipal Hermenegildo Gripp", "Amparo", "Rua 10 de outubro, s/nº", "disponivel"),

    ("Colégio Municipal Tiradentes", "Amparo", "Rua João Lamblet, s/nº, Lot. Tiradentes", "disponivel"),

    ("Assembleia de Deus Central", "Amparo", "Estrada de Amparo, Km 09", "disponivel"),

    ("Escola Municipal Celcyo Folly - Conjunto 05", "Amparo Parada Folly", "Rua Arminda Gripp Folly, s/nº", "disponivel"),

    ("Escola Estadual Municipalizada Boa Esperança", "Boa Esperança", "Estrada Boa Esperança, Lumiar, Km 03", "disponivel"),

    ("Escola Municipal Jardel Hottz", "Braunes", "Rua Vicente de Moraes, nº 29", "disponivel"),

    ("Escola Estadual Eduardo Breder", "Campo do Coelho", "Estrada Friburgo-Teresópolis, Km 13", "disponivel"),

    ("Escola Municipal Herminia Silva Condack", "Campo do Coelho", "Avenida Antônio Mário de Azevedo, nº 12381, Km 13", "disponivel"),

    ("Escola Estadual Municipalizada Ernesto de Souza Cardinot", "Cardinot", "Estrada Cardinot, s/nº", "disponivel"),

    ("Escola Municipal Cecília Meirelles", "Cascatinha", "Rua Tohoro Kassuga, nº 218", "disponivel"),

    ("Escola Municipal Amâncio Mário de Azevedo", "Cascatinha", "Rua Dom João VI, nº 1647", "disponivel"),

    ("Creche Municipal Dolores Sá Schuenck", "Centenário", "Rua Rosa Schuenk Toledo, s/nº", "disponivel"),

    ("Escola Municipal Claudir Antônio de Lima", "Catarcione", "Rua Eugênio Nideck, nº 59", "disponivel"),

    ("Colégio Estadual Professor Carlos Côrtes", "Catarcione", "Rua Eugênio Nideck s/nº", "disponivel"),

    ("Escola Estadual Professor Jamil El-Jaick", "Centro", "Rua Doutor R. Euclides Solon de Pontes, nº 33", "disponivel"),

    ("Escola Municipal Santa Paula Frassinetti", "Centro", "Rua Luiza Carpenter, nº 17", "disponivel"),

    ("Escola Estadual Júlio Salusse", "Chácara do Paraíso", "Rua Izelino Madro, s/nº", "disponivel"),

    ("Escola Municipal Herminia dos Santos Silva", "Chácara do Paraíso", "Rua Lair Rocha Turque, nº 41", "disponivel"),
 
    ("Creche Municipal Nadir Cardoso", "Chácara do Paraíso - Jacina", "Rua Lair Rocha Turque, s/nº", "disponivel"),

    ("Cmei Augusta Horn", "Cônego", "Praça de Santana, nº 85", "disponivel"),

    ("Escola Municipal Othelina de Sá Martins A. Condack", "Conquista", "Avenida Antônio Mário de Azevedo, Km 18.800 (Atrás da EM Vevey)", "disponivel"),

    ("Escola Municipal Vevey La Jolie", "Conquista", "Avenida Antônio Mário de Azevedo, Km 18.800", "disponivel"),

    ("Escola Municipal Padre Rafael", "Cordoeira", "Rua Darcília dos Santos, s/nº", "disponivel"),

    ("Ginásio Poliesportivo João Antunes Nogueira", "Cordoeira", "Rua Darcília dos Santos, s/nº", "disponivel"),

    ("Escola Estadual Etelvina Schottz", "Córrego D'antas", "Rua Wibano Antônio Bachini, s/nº", "disponivel"),

    ("Escola Municipal Jõao Vicente Valladares", "Debossan", "RJ-116 Friburgo, Km 69", "disponivel"),

    ("2º andar Rodoviária Norte", "Duas Pedras", "Praça Feliciano Costa, nº 01", "disponivel"),

    ("Ginásio Esportivo Duas Pedras", "Duas Pedras", "Praça Feliciano Costa, s/nº", "disponivel"),

    ("Escola Municipal Florândia da Serra", "Florândia da Serra", "Estrada Rio Grande, Buracada dos Gomes s/nº", "disponivel"),

    ("Escola Municipal Galdinópolis, Conjunto 2", "Galdinópolis", "Estrada Marcos Heringer, s/nº", "disponivel"),
                        
    ("Escola Municipal Alberto Meyer", "Granja Spinelli", "Rua Manoel Frossard, s/nº", "disponivel"),
                         
    ("Centro Municipal de Educação Infantil Menino Jesus", "Jardim Califórnia", "Rua Antônio Suaid, nº 149", "disponivel"),
                          
    ("Escola Municipal Francisco Silveira", "Jardim Califórnia", "Rua Marfisa Rosa da Silva, s/nº", "disponivel"),
                           
    ("Batista Jardim Califórnia", "Jardim Califórnia", "Rua Júlio Alves de Amorim", "disponivel"),
                            
    ("Paróquia Imaculada Conceição", "Jardim Ouro Preto", "Rua Vereador Agostinho Alves de Carvalho", "disponivel"),
                             
    ("CEFET - Centro Federal de Educação Tecnológica", "Jardim Ouro Preto", "Avenida Governador Roberto Silveira, nº 1900", "disponivel"),
                              
    ("Lazareto (Duas Pedras) Ginásio Esportivo Duas Pedras", "Jardinlândia", "Praça Feliciano Costa, s/nº", "disponivel"),
                               
    ("Escola Municipal Hélio Gonçalves Corrêa", "Jardinlândia", "Rua Francisco Primo Queiroz, nº 165", "disponivel"),
                                
    ("Escola Municipal Acyr Spitz", "Lumiar", "Rua José Domingues Benvenuti, s/nº", "disponivel"),
                                 
    ("Escola Pastor Schlupp", "Maria Thereza", "Rua Cinézio da Rocha, s/nº", "disponivel"),
                                  
    ("2º Igreja Batista", "Maria Thereza", "Rua Marinos Eduardo de Vries, nº 287", "disponivel"),
                                   
    ("Igreja Santa Luzia", "Maria Thereza", "Rua Luiz Carestiano, s/nº (Em frente a pracinha)", "disponivel"),
                                    
    ("Cmei Maria Altina Niederauer de Oliveira", "Maringá", "Servidão Asa Branca, s/nº", "disponivel"),
                                     
    ("Quadra", "Maringá", "Próximo o Cemitério", "disponivel"),
                                      
    ("Cantinho Feliz", "Mury", "RJ-116 Friburgo, Km 72", "disponivel"),
                                       
    ("Humédica Brasil", "Mury", "Avenida Walter Machado Thedim, nº 2618", "disponivel"),
                                        
    ("Escola Municipal Adahil da Cruz", "Nova Suíça", "Estrada Eugênio Gripp", "disponivel"),
                                         
    ("Igreja Batista", "Nova Suíça", "Rua Waldir de Brito, s/nº", "disponivel"),
                                          
    ("Sítio Dorival Bravo", "Nova Suíça", "Lote 09, Quadra 23", "disponivel"),
                                           
    ("Ginásio Municipal Adhemar F. Combat", "Olaria", "Alameda Visconde de Tunay", "disponivel"),
                                            
    ("Escola Municipal Maria José Mafort", "Olaria", "Rua Nossa Senhora das Graças, s/nº", "disponivel"),
                                             
    ("Escola Municipal Helena Coutinho", "Olaria", "Rua Joaquim Moreira Pinto, s/nº", "disponivel"),
                                              
    ("Escola Municipal Isabel Gomes Siqueira", "Parque das Flores", "Rua Rufino Siqueira, s/nº", "disponivel"),
                                               
    ("Capela Nossa Senhora das Graças", "Parque das Flores", "Rua Rufino Siqueira, s/nº", "disponivel"),
        
    ("Escola Municipal Jamile Constantino Klein", "Perissê", "Rua Marechal Floriano Peixoto, nº 37", "disponivel"),

    ("Escola Municipal Dr. Dante Magliano", "Ponte da Saudade", "Estrada Prefeito César Guinle, s/nº", "disponivel"),

    ("Rodoviária Sul", "Ponte da Saudade", "Avenida Manoel Carneiro de Menezes, 101-145", "disponivel"),

    ("Humédica Brasil", "Prainha", "Avenida Antônio Mário de Azevedo, Rodovia RJ-130, nº 17020 - Km 17", "disponivel"),

    ("Escola Estadual Emília Rochmant", "Riograndina", "Rua Hermínia dos Santos Silva, s/nº", "disponivel"),

    ("Paróquia Nossa Senhora do Rosário", "Riograndina", "Praça Nossa Senhora do Rosário, nº 01, fundos", "disponivel"),

    ("Creche Municipal Izabel Jovelina Monteiro", "Rui Sanglard", "Rua Isaías Medeiros Lopes, s/nº", "disponivel"),

    ("Escola Municipal Rui Sanglard", "Rui Sanglard", "Rua Isaías Medeiros Lopes, s/nº", "disponivel"),

    ("Escola Municipal Rei Alberto I", "Salinas", "Estrada dos Três Picos, s/nº", "disponivel"),

    ("Galpão da Associação", "Salinas", "Endereço não informado", "disponivel"),

    ("Seminário Dom Bosco", "Santa Bernadete", "Rua Antônio Joaquim Gonçalves, nº 20", "disponivel"),

    ("Cmei Iolanda da Silva", "Santa Bernadete", "Rua Maria da Conceição Ribeiro, nº 228", "disponivel"),

    ("Escola Municipal Waldir Lopes de Carvalho", "Santa Cruz", "Avenida Antônio de Sá Martins, s/nº", "disponivel"),

    ("Capela de São Cristóvão", "São Cristovão", "Rua João Cruzal Amorim, s/nº, Loteamento Larazeto - Duas Pedras", "disponivel"),

    ("Igreja Batista Nacional Novo Amanhecer", "São Geraldo", "Rua Dr. Feliciano Benedito da Costa, s/nº", "disponivel"),

    ("5ª Igreja Batista", "São Geraldo", "Rua Dr. Feliciano Benedito da Costa, s/nº", "disponivel"),

    ("Igreja Presbiteriana Esperança", "São Geraldo", "Rua Dr. Feliciano Benedito da Costa, s/nº", "disponivel"),

    ("Igreja Católica (Nova Esperança)", "São Geraldo", "Rua Dr. Feliciano Benedito da Costa, s/nº", "disponivel"),

    ("Colégio Estadual Salustiano José Ribeiro Serafim", "São Geraldo", "Rua Carlos Condack, s/nº", "disponivel"),

    ("Ginásio Poliesportivo Alberto da Rosa Pinheiro", "São Jorge", "Rua José Ernesto Knust, s/nº", "disponivel"),

    ("Escola Municipal Victorino Bento de Toledo", "São Lourenço", "Estrada Friburgo 002, Km 19", "disponivel"),

    ("Escola Municipal São Pedro da Serra", "São Pedro da Serra", "Rua Rodrigues Alves, nº 74", "disponivel"),

    ("Creche Solares II", "Solares", "Rua Lo Bianco Pasquale, s/nº", "disponivel"),

    ("Igreja Católica Santa Bárbara", "Solares", "Rua Lo Bianco Pasquale (ao lado do nº 03)", "disponivel"),

    ("Galpão do Mathias", "Tauru", "Rua Waldemar Belém Ponciliano, nº 27 - Prado", "disponivel"),

    ("Residência de Morador da Localidade", "Tingly", "Rua Francisco Spargolli, nº 11", "disponivel"),

    ("Escola Municipal Lafayette Bravo Filho", "Três Irmãos", "Rua Aureliano Barbosa Faria, s/nº", "disponivel"),

    ("Escola Municipal Flores de Nova Friburgo", "Vargem Alta", "Estrada João Heringer, s/nº", "disponivel"),

    ("Colégio Municipal Juscelino Kubitscheck de Oliveira", "Varginha", "Rua Leonino Dutra, nº 17", "disponivel"),

    ("Colégio Estadual Professor Zélia dos Santos Cortes", "Vila Amélia", "Rua Teresópolis, nº 118", "disponivel"),

    ("Cmei Leda Tavares Moreira", "Vila Nova", "Rua Prudente de Moraes, nº 76", "disponivel"),

    ("Fórum da Comarca de Nova Friburgo", "Vilage", "Avenida Euterpe Friburguense, nº 201", "disponivel")
    
    `)

        console.log("Dados inseridos dentro da tabela abrigos")
    
} else {
        console.log(`Banco pronto com ${controle.total} de abrigos`)
    };
    
//SELECT - consultas
console.log("------ Total de Abrigos -------");
const todosAbrigos = await db.all(`SELECT * FROM abrigos`);
console.log(todosAbrigos);

//Exemplo de SELECT especifico: Abrigos em Amparo
console.log("------ FILTRO: ABRIGO AMPARO ------");
const abrigoAmparo = await db.all(`SELECT * FROM abrigos WHERE bairro = "Amparo"`);
console.log(abrigoAmparo);

const bairros = await db.all(`SELECT DISTINCT bairro FROM abrigos`);
for (const br of bairros) {
    console.log(`------ FILTRO: ${br.bairro} ------`);
    const resultado = await db.all(
        `SELECT * FROM abrigos WHERE bairro = ?`, [br.bairro]
    );
    console.log(resultado);
}


//UPDATE em Massa: Mudar o status de tudo que for "Centro" de uma vez
await db.run (`
    UPDATE rotina 
    SET status_resolucao = "No local"
    WHERE localizacao = "Centro"
    `)

    console.log("Todos os pacientes do Centro estão sendo atendidos")

//Atualizar Pendente id: 4 de Pendente para "semana concluída"
await db.run(`
    UPDATE rotina
    SET status_resolucao = "Semana Concluida"
    WHERE id = 4
    `)

    console.log("A semana do id 4 foi concluída")

//DELETE CONDICIONAL - Remover tudo 
//await db.run(`DELETE FROM rotina WHERE status_resolucao = "Resolvido"`)
//console.log("Registros de status Resolvido foram atualizados")

//SELECT FINAL
console.log("----- Relatório Final -----");
const resultadoFinal = await db.all ("SELECT * FROM rotina");
console.log(resultadoFinal);


};      
criarBanco()

};

criarTabela()



