import { SocioFamilia } from "./Socios";

class Dependentes {
  owner: string;
  constructor(
    private _cpf: string,
    private _idade: number,
    private _nome: string,
    owner: SocioFamilia
  ) {
    this._cpf = _cpf
    this._idade = _idade
    this._nome = _nome
    this.owner = owner.cpf;
  }

  public get cpf(){      
    return this._cpf
  }
  public get idade(){      
    return this._idade
  }
  public get nome(){      
    return this._nome
  }
}

export { Dependentes }