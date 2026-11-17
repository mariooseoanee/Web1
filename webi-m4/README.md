# Inscripciones Liga Universitaria de Deportes U-tad 2026
Misión M4 · Full Contact Forms — Web Development I.
<br>
Consiste en desarrollar una aplicación en React con un formulario completo y accesible (usando React Hook Form y Zod) conectado a una API remota (en este caso simulada como es jsonplaceholder) mediante TanStack Query v5, gestionando tanto el alta como el listado y baja de equipos inscritos.

## Cómo probarlo
Instala las dependencias con `npm install` y arranca el servidor con `npm run dev` (la url de la api en el archivo .env). La aplicación realiza peticiones reales (GET, POST y DELETE) contra la API y que ya que simula las peticiones, tambien se guardan los registros en localStorage (cache) para poder ver los equipos que se han inscrito y filtrarlos por nombre, correo o deporte.<br>

En el formulario se pueden inscribir nuevos equipos validando los datos que se introducen con zod.<br>

En la parte superior hay un panel para activar la simulación de datos corruptos y comprobar cómo Zod (safeParse) que se encarga de bloquear al parsear los datos incorrectos.

## Uso de IA
Utilicé Gemini para hacer la validación cruzada en Zod con zodResolver para que los errores se refirieran al campo exacto, y para implementar el flujo del bonus con safeParse dentro de queryFn, y que la interfaz recibiera ese error para mostrarlo gracias a que se capturaba el error.
<br>
Además, el diseño visual (tablero en dos columnas, y la opcion de meter los datos corruptos mediante el boton) también ha sido sugerido por la IA.

## Autopsia
1. Divido la interfaz en componentes: inputs del formulario reutilizables (`CampoTexto`, `CampoSelect`, `GrupoBotones` y `CheckboxLegal`), bloques donde se juntan estos componentes con las principales funcionalidades (`FormularioInscripcion`, `ListaEquipos`, `FiltrosEquipos`, `TarjetaEquipo`, `Corrupcion`) y estados visuales que informan al usuario mientras se realizan llamadas o hay errores (`EstadoCarga`, `EstadoError`).

2. Toda la validación se hace en `esquema.tsx` que funciona como única fuente de verdad, derivando automáticamente los tipos de TypeScript (z.input, z.output, z.infer) a partir de los esquemas de Zod.

3. Se usa React Hook Form en modo no controlado, cada input se conecta con (register, que se pasa como prop a los componentes hijos) esto hace para que no haya re-renderizados innecesarios al escribir.
La validacion esta conectada con resolver: zodResolver(). Se usa un useWatch para observar el deporte seleccionado y poder actualizar el mínimo de jugadores exigido segun ese deporte.

Todos los inputs gestionan errores desde formState.errors con accesibilidad completa(id, aria-invalid, aria-describedby)


4. El estado del servidor se gestiona con TanStack Query (QueryClientProvider en `main.tsx` que permite compartir el estado entre componentes).

Con useQuery se cachea las consultas incluyendo los filtros activos en la queryKey, mientras que las mutaciones (useMutation para inscribir y cancelar, en general cualquier modificacion) invalidan la clave para que se vuelva a consultar la api y el estado se actualice.

5. En el bonus se introduce un dato que incumple con lo establecido por zod, con safeParse() se valida y, si detecta algún campo corrupto, lanza un error formateado con los problemas encontrados por Zod que TanStack Query captura y se muestra en el componente `EstadoError.