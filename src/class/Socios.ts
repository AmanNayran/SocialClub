class SocioIndividual {
    constructor(
        private _cpf: string, 
        private _nome: string, 
        private _senha: string,
    ){
        this._cpf = _cpf
        this._nome = _nome
        this._senha = _senha
    }

    public get cpf(){
        return this._cpf
    }
    public get nome(){      
        return this._nome
    }
    public get senha(){
        return this._senha
    }

}

class SocioFamilia extends SocioIndividual {
    constructor(_cpf: string, _nome: string, _senha: string){
        super(_cpf, _nome, _senha)
    }

}

export{ SocioIndividual, SocioFamilia }