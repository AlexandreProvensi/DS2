module.exports = {
    //Efetuar a operacao de adicao
    adicao: (req,res) => {
        const valores = req.body;
        const resultado = valores.a + valores.b;

        res.send({resultado: resultado});
    }, 
    //Efetuar a operacao de subtracao
    subtracao: (req,res) => {
        const valores = req.body;
        const resultado = valores.a - valores.b;

        res.send({resultado: resultado});
    }, 
    //Efetuar a operacao de multiplicacao
    multiplicacao: (req,res) => {
        const valores = req.body;
        const resultado = valores.a * valores.b;

        res.send({resultado: resultado});
    }, 
    //Efetuar a operacao de divisao
    divisao: (req,res) => {
        const valores = req.body;
        const resultado = valores.a / valores.b;

        res.send({resultado: resultado});
    }
}