const rl = require('readline-sync');
const fs = require('fs');
const { Select } = require('enquirer');

function interface(){
    const select = new Select({
        name: 'interface',
        message: 'Qual operação deseja realizar?',
        choices: [
            'ADICIONAR NOTAS', 'EDITAR NOME DA NOTA', 'EDITAR CONTEÚDO DE UMA NOTA',
            'LISTAR NOTAS',
        ]
    });
        select.run()
        .then((input) =>{
            if(input === 'ADICIONAR NOTAS'){ad_note()
            }else if(input === 'EDITAR NOME DA NOTA'){edit_note()
            }
        });

}
function ad_note(){
    let title = rl.question('Qual o título da sua anotação?\n');
        if(!title){
            title = 'nota';
        } else if(title){
            console.log(`Titúlo '${title}' adicionado.`);
        } else {
            console.error('Error');
        }
    let note = rl.question('Insira o seu texto:\n');
        if(!note){
            note = ' ';
        } else {
            console.log('Texto adicionado!');
        }

        fs.writeFile(`${title}.txt`, note, (err) =>{
            if(err){
                console.log(err);
            } else {
                console.log('Nota criada!');
                interface();
            }
        })
}
function edit_note(){
    let resp;
    const inp = new Select({
        name: 'inp',
        message: 'O que deseja editar?',
        choices: ['Títúlo', 'Texto'],
    });
        inp.run()
        .then((inp) =>{
            if(inp === 'Títúlo'){
                let whatNote = rl.question('Qual nota deseja alterar o nome?');
                whatNote = `${whatNote}.txt`;
                console.log(whatNote);
                    if(fs.existsSync(`./${whatNote}`)){
                        console.log('Arquivo encontrado!');

                    let newTitle = rl.question('Qual o novo nome do arquivo?\n');
                    newTitle = `${newTitle}.txt`;
                        fs.rename(whatNote, newTitle ,(err)=>{
                            if(err){console.log(err)};
                        })
                    } else {
                        console.log('Arquivo não encontrado') 
                        interface();
                    }
            }
        })
    }
function edit_content(){
    let note = rl.question('Qual nota deseja editar o conteúdo?\n');
        note = `${note}.txt`;
    if(fs.existsSync(note)){
        let newContent = rl.question('Insira o novo conteúdo:\n');
        if(!newContent){console.error('Conteúdo não adicionado')
            interface();
        }
    }
}

interface();