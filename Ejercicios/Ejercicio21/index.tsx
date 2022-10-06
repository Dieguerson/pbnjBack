import { serve } from "https://deno.land/std@0.158.0/http/mod.ts"

const colors = ["red", "yellow"]

const list = () => {
  let colorList = ''
  for (const color of colors) {
    colorList += `<li style="color: ${color}">${color}</li>`
  }
  return colorList
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "POST"){
    const newColor: string = (await req.formData()).get('color') as string
    colors.push(newColor)
  }
  return new Response(`
    <body style="background-color: black; color: white">
      <form action="/" method="POST">
        <label for="color">Color</label>
        </br>
        <input type="text" id="color" name="color"/>
        </br>
        <input type="Submit" value="submit"/>
      </form>

      <ul>
        <p>Colors</p>
        ${list()}
      </ul>
    </body>
  `, 
  {
    headers: {
      "content-type": "text/html; charset=UTF-8",
    },
    status: 200
  })
}

await serve(handler, { port: 8000 })