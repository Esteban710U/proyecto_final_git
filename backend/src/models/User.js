// Representa la forma de un usuario tal como se guarda/lee de la base de datos
class User {
  constructor({ id, nombre, email, password_hash, puntaje_admision, created_at }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password_hash = password_hash;
    this.puntaje_admision = puntaje_admision;
    this.created_at = created_at;
  }

  toPublicJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      puntaje_admision: this.puntaje_admision !== null ? Number(this.puntaje_admision) : null
    };
  }
}

module.exports = User;
