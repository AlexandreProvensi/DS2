module.exports = {
    adicao: (req, res) => {
        const valores = req.body;
        const resultado = valores.a + valores.b;

        res.send({ resultado: resultado });
    },
    subtracao: (req, res) => {
        const valores = req.body;
        const resultado = valores.a - valores.b;

        res.send({ resultado: resultado });
    },
    multiplicacao: (req, res) => {
        const valores = req.body;
        const resultado = valores.a * valores.b;

        res.send({ resultado: resultado });
    },
    divisao: (req, res) => {
        const valores = req.body;
        const resultado = valores.a / valores.b;

        res.send({ resultado: resultado });
    }
}