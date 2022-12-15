class ErroDeLoginException extends Error {
    constructor(message: string) {
        super(message)
    }
}

class ConsultaException extends Error {
    constructor(message: string) {
        super(message)
    }
}

class AlteracaoException extends Error {
    constructor(message: string) {
        super(message)
    }
}

class ExclusaoException extends Error {
    constructor(message: string) {
        super(message)
    }
}

class SocioInexistenteException extends Error {
    constructor(message: string) {
        super(message)
    }
}

class SocioExistenteException extends Error {
    constructor(message: string) {
        super(message)
    }
}

class ValorInvalidoException extends Error {
    constructor(message: string) {
        super(message)
    }
}

class IdadeException extends Error {
    constructor(message: string) {
        super(message)
    }
}

class EhIndividualException extends Error {
    constructor(message: string) {
        super(message)
    }
}

export {SocioExistenteException, ErroDeLoginException, ConsultaException, AlteracaoException, ExclusaoException, SocioInexistenteException, ValorInvalidoException, IdadeException, EhIndividualException}