class Application {
  constructor({ id, user_id, program_id, estado, fecha_inscripcion, programa_nombre, universidad }) {
    this.id = id;
    this.user_id = user_id;
    this.program_id = program_id;
    this.estado = estado;
    this.fecha_inscripcion = fecha_inscripcion;
    this.programa_nombre = programa_nombre;
    this.universidad = universidad;
  }
}

module.exports = Application;
