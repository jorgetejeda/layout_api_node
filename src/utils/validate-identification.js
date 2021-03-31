let validateCedula = (cedula) => {
    /*
      https://en.wikipedia.org/wiki/Luhn_algorithm#Description
      https://en.wikipedia.org/wiki/Luhn_algorithm#Implementation_examples
    */
  
    let digitoMultiplicador = 2; // Numero por el cual multiplicaremos cada numerro de al cedula sin la serie.
    let suma = 0; // Donde guardaremos el resultado de la suma...
    let result = false;
    const cedulaSinSerieLength = cedula.length - 1;
    // Extraemos el digito verificador(En el caso de la cedula dominicana el ultimo numero. 123-2324354-*1* <--Here)
    const digitoVerificador = cedula.substring(cedulaSinSerieLength);
    // Extraemos los digitos de la cedula sin la serie, para realizar la suma.
    const digitos = cedula.substring(0, cedulaSinSerieLength);
  
    for (let i = 0; i < cedulaSinSerieLength; i++) {
      if (i % 2 == 0)
        digitoMultiplicador = 1;
      else
        digitoMultiplicador = 2;
  
      let resultMulti = +digitos[i] * +digitoMultiplicador;
  
      if (resultMulti > 9)
        resultMulti -= 9;
  
      suma += resultMulti;
    }
  
    const resultCalculo = (10 - (suma % 10)) % 10;
  
    // console.log("Este es el resultado del calculo: " + resultCalculo)
    // console.log("Este es numero verificador.: " + digitoVerificador)
  
    if (resultCalculo == digitoVerificador && digitos.substring(0, 2) != '000')
      result = true;
    else
      result = false;
  
    return result;
  }
  
  module.exports = validateCedula;