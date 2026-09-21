class Program {
  constructor({ id, nombre, facultad, universidad, puntaje_minimo, cupos }) {
    this.id = id;
    this.nombre = nombre;
    this.facultad = facultad;
    this.universidad = universidad;
    this.puntaje_minimo = puntaje_minimo;
    this.cupos = cupos;
  }
}

module.exports = Program;
