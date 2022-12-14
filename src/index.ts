import prompt from "prompt-sync"
import { Clube } from "./class/Clube"
import { SocioIndividual, SocioFamilia } from "./class/Socios"
import { Dependentes } from "./class/Dependentes"
import {ErroDeLoginException, ConsultaException, AlteracaoException, ExclusaoException, SocioInexistenteException, ValorInvalidoException, IdadeException, EhIndividualException} from "./error/erros"

let input = prompt()
let clube: Clube = new Clube()
let opcao: String = ''

do {
    console.log('\nSeja bem vindo ao Social Clube\nDigite uma opção:')
    console.log(
        '1 - Cadastrar Socio       2 - Consultar Socio       3 - Alterar Socio       4 - Excluir Socio       5 - Total de Socios\n' +
        '6 - Cadastrar Dependente  7 - Consultar Dependente  8 - Alterar Dependente  9 - Excluir Dependente  10 - Total de Dependentes\n' +
        '11 - Entrar no Clube      0 - Sair\n')

    try {
        opcao = input("Opção:")
        switch (opcao) {
            case "1":
                cadastrarSocio()
                break
            case "2":
                consultarSocio()
                break
            case "3":
                alterarSocio()
                break
            case "4":
                excluirSocio()
                break
            case "5":
                totalSocio()
                break
            case "6":
                cadastrarDependente()
                break
            case "7":
                consultarDependente()
                break
            case "8":
                alterarDependente()
                break
            case "9":
                excluirDependente()
                break
            case "10":
                totalDependente()
                break
            case "11":
                entrar()
                break
        }
    } catch (e: any) {
        if (e instanceof Error) {
            console.log(e.message)
        } else {
            console.log("Ocorreu um erro no sistema!")
        }
    } finally {
        input("Operação finalizada. Digite <enter>")
    }
} while (opcao != "0")
console.log("Sistema encerrado!")


function cadastrarSocio(): void {
    console.log("\nCadastrar Socio:\n");
    let cpf: string = input('Digite o cpf: ')
    let nome: string = input('Digite o nome: ')
    let senha: string = input('Digite a senha: ')

    let ehFamilia: string = input('E socio familia (s/n): ')
    let socio!: SocioIndividual

    if (ehFamilia == 'n') {
        socio = new SocioIndividual(cpf, nome, senha)
    } else if (ehFamilia == 's') {
        socio = new SocioFamilia(cpf, nome, senha)
    } else {
        throw new ValorInvalidoException('Valor inválido!')
    }

    clube.criarSocios(socio)
}

function cadastrarDependente(): void {
    console.log("\nCadastrar Dependente:\n");
    let cpf: string = input('Digite o cpf: ')
    let idade: number = input('Digite a idade: ')
    let nome: string = input('Digite o nome: ')
    let owner: SocioFamilia = input('Digite o cpf do socio: ')

    let dependente = new Dependentes(cpf, idade, nome, owner)
    let ehIndividual = typeof(clube.consultarSocio(owner.cpf))

    if (idade > 21) {
        throw new IdadeException('Nao permitimos dependentes com idade acima de 21!')
    }else if(ehIndividual != SocioIndividual){
        throw new EhIndividualException('O socio solicitado nao pode ter dependentes!')
    }

    clube.criarDependentes(dependente)
}

function consultarSocio() {
    console.log("\nConsultar Socio:\n")
    let cpf: string = input('Digite o cpf do conta: ')
    let socio: SocioIndividual = clube.consultarSocio(cpf)
    exibirSocio(cpf)
}

function consultarDependente() {
    console.log("\nConsultar Dependente:\n")
    let cpf: string = input('Digite o cpf do conta: ')
    let dependente: Dependentes = clube.consultarDependente(cpf)
    exibirDependente(cpf)
}

function alterarSocio(): void {
    console.log("\nCadastrar Socio:\n");
    let cpf: string = input('Digite o cpf: ')
    let nome: string = input('Digite o nome: ')
    let senha: string = input('Digite a senha: ')

    let socio = new SocioIndividual(cpf, nome, senha)

    clube.editarSocio(socio)
}
function alterarDependente(): void {
    console.log("\nCadastrar Socio:\n");
    let cpf: string = input('Digite o cpf: ')
    let idade: number = input('Digite a idade: ')
    let nome: string = input('Digite o nome: ')
    let owner: SocioFamilia = input('Digite o cpf do socio: ')

    let dependente = new Dependentes(cpf, idade, nome, owner)

    clube.editarDependentes(dependente)
}

function excluirSocio() {
    console.log("\nExcluir Socio:\n")
    let cpf: string = input('Digite o cpf: ')
    clube.deletarSocio(cpf)
}
function excluirDependente() {
    console.log("\nExcluir Dependente:\n")
    let cpf: string = input('Digite o cpf: ')
    clube.deletarDependentes(cpf)
}

function entrar(){
    console.log("\nLogin:\n")
    let cpf: string = input('Digite o cpf: ')
    let senha: string = input('Digite a senha: ')
    clube.autenticar(cpf, senha)
}

function totalSocio() {
	console.log("\nTotal:\n")
    clube.totalSocios()
}

function totalDependente() {
	console.log("\nTotal:\n")
	clube.totalDependentes()
}

function exibirSocio(cpf: string) {
	console.log(`CPF: ${clube.consultarSocio(cpf)}`)
}

function exibirDependente(cpf: string) {
	console.log(`CPF: ${clube.consultarDependente(cpf)}`)
}