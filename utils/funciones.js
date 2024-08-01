export function validateCedula(cedula) {
    let suma = 0;
    if (cedula.length !== 10 && cedula.length != 13) {
      return false;
    } else {
      let a = [];
      let b = [];
      if (cedula.length % 2 === 0) {
        a.length = b.length = cedula.length / 2;
      } else {
        a.length = Math.floor(cedula.length / 2) + 1;
        b.length = Math.floor(cedula.length / 2);
      }
      a.fill(0);
      b.fill(0);
      let c = 0;
      let d = 1;
      for (let i = 0; i < Math.floor(cedula.length / 2); i++) {
        a[i] = parseInt(cedula.charAt(c));
        c = c + 2;
        if (i < Math.floor(cedula.length / 2) - 1) {
          b[i] = parseInt(cedula.charAt(d));
          d = d + 2;
        }
      }
      for (let i = 0; i < a.length; i++) {
        a[i] = a[i] * 2;
        if (a[i] > 9) {
          a[i] = a[i] - 9;
        }
        suma = suma + a[i] + b[i];
      }
      let residuo = suma % 10
      let verificador = 0
      if (residuo != 0) {
        verificador = 10 - suma % 10
      }
      if (verificador === parseInt(cedula.charAt(cedula.length - 1))) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  
  export function validarEmail(email){
      // Expresión regular para validar el formato del correo electrónico
      var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      // Comprobamos si el correo coincide con el patrón
      if (patron.test(email)) {
        return true; // El correo es válido
      } else {
        return false; // El correo no es válido
      }
    
  }