class Usuario{
  constructor({nombre, apellido, libros, mascotas}){
    this.nombre = nombre,
    this.apellido = apellido,
    this.libros = libros,
    this.mascotas = mascotas
  }

  getFullName(){
    return `${this.apellido}, ${this.nombre}`
  }

  addMascota(mascota){
    this.mascotas.push(String(mascota))
  }

  countMascotas(){
    return this.mascotas.length
  }

  addBook(nombre, autor){
    this.libros.push({nombre: String(nombre), autor: String(autor)})
  }

  getBookNames(){
    let titulos = []
    this.libros.forEach(libro => titulos.push(libro.nombre))
    return titulos
  }
}

let diega = new Usuario ({
  nombre: "Diego",
  apellido: "Gabrielli",
  libros: [{nombre: "La Torre Oscura", autor: "Stephen King"}, {nombre: "The Witcher", autor: "Andrzej Sapkowski"}],
  mascotas: ["Homero", "Simba"]
});

console.table(diega);
console.log("Nombre completo: ", diega.getFullName());
console.log("Cantidad de Mascotas: ", diega.countMascotas());
console.log("Títulos: ", diega.getBookNames());
diega.addMascota("Felini");
console.table(diega);
console.log("Cantidad de Mascotas: ", diega.countMascotas());
diega.addBook("American Gods", "Neil Gaiman");
console.table(diega);
console.log("Títulos: ", diega.getBookNames());

let pancho = new Usuario ({
  nombre: "Francisco",
  apellido: "Blanco",
  libros: [{nombre: "Player's Handbook", autor: "WotC"}, {nombre: "Dungeon Master's Guide", autor: "WotC"}],
  mascotas: ["Simón", "Yuri"]
});

console.table(pancho);
console.log("Nombre completo: ", pancho.getFullName());
console.log("Cantidad de Mascotas: ", pancho.countMascotas());
console.log("Títulos: ", pancho.getBookNames());
pancho.addMascota("Eevee");
console.table(pancho);
console.log("Cantidad de Mascotas: ", pancho.countMascotas());
pancho.addBook("Xanathar's Guide to Everything", "WotC");
console.table(pancho);
console.log("Títulos: ", pancho.getBookNames());