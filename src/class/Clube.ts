import { SocioIndividual } from "./Socios"
import { Dependentes } from "./Dependentes"
import { Login } from "./Login"
import {ErroDeLoginException, ConsultaException, AlteracaoException, ExclusaoException, SocioInexistenteException} from "../error/erros"

const socioDB: string = "../db/socios.json"
const dependentesDB: string = "../db/dependentes.json"

class Clube implements Login{
  public socios: SocioIndividual[] = []
  public dependentes: Dependentes[] = []
  public fs = require("fs")

  lerSocios(): SocioIndividual[] {
    this.socios = JSON.parse(
      this.fs.readFileSync(socioDB, { enconding: "utf-8" })
    )
    return this.socios
  }

  lerDependentes(): Dependentes[] {
    this.dependentes = JSON.parse(
      this.fs.readFileSync(dependentesDB, { enconding: "utf-8" })
    )
    return this.dependentes
  }

  criarSocios(socio: SocioIndividual): void {
    this.lerSocios()
    try {
			this.consultarSocio(socio.cpf)
			throw new ConsultaException('Socio já cadastrado!')
		} catch (e: any) {
			if (e instanceof SocioInexistenteException) {
        this.socios.push(socio)
        this.fs.writeFileSync(socioDB, JSON.stringify(this.socios), { encondig: "utf-8" })
			}
    }
  }

  criarDependentes(dependente: Dependentes): void {
    this.lerDependentes()
    try {
			this.consultarDependente(dependente.cpf)
			throw new ConsultaException('Dependente já cadastrado!')
		} catch (e: any) {
			if (e instanceof SocioInexistenteException) {
        this.dependentes.push(dependente)
        this.fs.writeFileSync(dependentesDB, JSON.stringify(this.dependentes), { encondig: "utf-8" })
			}
    }
  }

  consultarSocio(cpf: string) {
    this.lerSocios()
    let socioProcurado!: SocioIndividual
    for(let socio of this.socios) {
      if(socio.cpf == cpf) {
        socioProcurado = socio
        break
      } else {
        throw new ConsultaException("Sócio não cadastrado!")
      }
    }
    return socioProcurado
  }

  consultarDependente(cpf: string) {
    this.lerDependentes()
    let dependenteProcurado!: Dependentes
    for(let dependente of this.dependentes) {
      if(dependente.cpf == cpf) {
        dependenteProcurado = dependente
        break
      } else {
        throw new ConsultaException("Dependente não cadastrado!")
      }
    }
    return dependenteProcurado
  }

  private consultarSocioIndice(cpf: string): number{
    this.lerSocios()
    let indice: number = -1
    for(let i: number = 0; i < this.socios.length; i++) {
      if(this.socios[i].cpf == cpf) {
        indice = i
        break
      }
    }
    return indice
  }

  private consultarDependentesIndice(cpf: string): number{
    this.lerDependentes()
    let indice: number = -1
    for(let i: number = 0; i < this.dependentes.length; i++) {
      if(this.dependentes[i].cpf == cpf) {
        indice = i
        break
      }
    }
    return indice
  }

  editarSocio(socio: SocioIndividual): void{
    this.lerSocios()
    let indice = this.consultarSocioIndice(socio.cpf)
    if(indice==-1) {
      throw new AlteracaoException("Não foi possível realizar a alteração!")
    } else {
      this.socios[indice] = socio
      this.fs.writeFileSync(socioDB, JSON.stringify(this.socios), { encondig: "utf-8" })
    }
  }

  editarDependentes(dependente: Dependentes): void{
    this.lerDependentes()
    let indice = this.consultarDependentesIndice(dependente.cpf)
    if(indice==-1) {
      throw new AlteracaoException("Não foi possível realizar a alteração!")
    } else {
      this.dependentes[indice] = dependente
      this.fs.writeFileSync(dependentesDB, JSON.stringify(this.dependentes), { encondig: "utf-8" })
    }
  }

  deletarSocio(cpf: string){
    this.lerSocios()
    let indice: number = this.consultarSocioIndice(cpf)
    if (indice == -1) {
      throw new ExclusaoException("Falha ao excluir o Sócio!") 
    } else {
      for (let i: number = indice; i < this.socios.length; i++) {
        this.socios[i] = this.socios[i + 1]
      }
      this.socios.splice(indice, 1)
      this.fs.writeFileSync(socioDB, JSON.stringify(this.socios), { encondig: "utf-8" })
    }
  }

  deletarDependentes(cpf: string){
    this.lerDependentes()
    let indice: number = this.consultarDependentesIndice(cpf)
    if (indice == -1) {
      throw new ExclusaoException("Falha ao excluir o Sócio!") 
    } else {
      for (let i: number = indice; i < this.dependentes.length; i++) {
        this.dependentes[i] = this.dependentes[i + 1]
      }
      this.dependentes.splice(indice, 1)
      this.fs.writeFileSync(dependentesDB, JSON.stringify(this.dependentes), { encondig: "utf-8" })
    }
  }

  autenticar(cpf: string, senha: string): boolean {
    this.lerSocios()
    if(cpf != cpf || senha != senha){
        throw new ErroDeLoginException("Senha incorreta!")
    } else {
        return true
    }
  }

  totalSocios() {
		console.log(`Total de socios: ${this.socios.length}`)
	}
  
  totalDependentes() {
    console.log(`Total de dependentes: ${this.dependentes.length}`)
	}

}

export{Clube}