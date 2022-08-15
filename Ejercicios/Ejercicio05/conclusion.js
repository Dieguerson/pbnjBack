const pros = {
  Handlebars: ["Similar a Vue, herramienta que uso a diario", "Amistoso con el usuario", "Versátil", "Suficientemente similar a HTML, CSS y JS como para ser fácil de entender", "Suficientemente distinto a HTML, CSS y JS como para ser interesante"],
  EJS: ["..."],
  Pug: ["Ser tan distinto a HTML, CSS y JS lo hace interesante"]
};

const cons = {
  Handlebars: ["Similar a Vue, pero más rebuscado"],
  EJS: ["Todo", "Probablemente sea una cuestión personal", "No me gustó ni un poco", "Agregar cualquier cosa de JS a los HTML es incómodo, largo y difícil"],
  Pug: ["Lo novedad se pasa rápido", "Agregar atributos HTML termina siendo una complicación", "No me terminó de cerrar"]
};

const conclusion = "Si tengo que elegir, me quedo con handlebars por ser el más user friendly a la hora de desarrollar y por la similitúd con mi herramienta de trabajo actual";

console.log("Pros:")
console.log("- Handlebars: ")
for (let i = 0; i < pros.Handlebars.length; i++) {
  console.log("-- ", pros.Handlebars[i])
}
console.log("- EJS: ")
for (let i = 0; i < pros.EJS.length; i++) {
  console.log("-- ", pros.EJS[i])
}
console.log("- Pug: ")
for (let i = 0; i < pros.Pug.length; i++) {
  console.log("-- ", pros.Pug[i])
}
console.log("Cons:")
console.log("- Handlebars: ")
for (let i = 0; i < cons.Handlebars.length; i++) {
  console.log("-- ", cons.Handlebars[i])
}
console.log("- EJS: ")
for (let i = 0; i < cons.EJS.length; i++) {
  console.log("-- ", cons.EJS[i])
}
console.log("- Pug: ")
for (let i = 0; i < cons.Pug.length; i++) {
  console.log("-- ", cons.Pug[i])
}
console.log("Conclusión: ", conclusion);