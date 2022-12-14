class ErroDeLoginException extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class ConsultaException extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class AlteracaoException extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class ExclusaoException extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class SocioInexistenteException extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class ValorInvalidoException extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class IdadeException extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

class EhIndividualException extends Error {
    constructor(mensagem: string) {
        super(mensagem)
    }
}

export {ErroDeLoginException, ConsultaException, AlteracaoException, ExclusaoException, SocioInexistenteException, ValorInvalidoException, IdadeException, EhIndividualException}