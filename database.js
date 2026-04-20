const sqlite3 = require ('sqlite3')
const { open } = require ('sqlite')

const criarBanco = async () => {
    const db = await open ({
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
    if( checagem.total === 0){
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
   
    console.log("Dados inseridos dentro da tabela rotina")
    } else {
        console.log(`Banco pronto com ${checagem.total} de pilotos`)
    };

    //SELECT
    console.log("----- Total de Pilotos -----");
    const todoPiloto = await db.all(`SELECT * FROM pilotos`);
    console.log(todoPiloto);

    console.log("-----Bairro Piloto-----");
    const bairroPiloto = await db.all(`SELECT * FROM pilotos WHERE localizacao = " Nova Friburgo (Olaria)"`);
    console.log("bairroPiloto");

    //UPDATE
    await db.run (`
        UPDATE pilotos
        SET disponibilidade_emergencias = "Sim"
        WHERE localizacao = "Nova Friburgo (Mury)"
        `)

        console.log("Pilotos não disponiveis para emergencia");

    //SELECT FINAL
    console.log("-----Relatório Final-----");
    const todosPilotos = await db.all ("SELECT * FROM pilotos");
    console.log(todosPilotos);

};    


criarBanco()