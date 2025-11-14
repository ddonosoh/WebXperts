# README FRONTEND

Este proyecto corresponde al **frontend del juego Imperio Ludo**. 
El objetivo fue construir una aplicación web funcional, visualmente atractiva y conectada al backend mediante API REST, permitiendo a los usuarios jugar, gestionar su perfil y visualizar estadísticas.

## Estructura general y diseño del HTML

El frontend está implementado con React + Vite, manteniendo una arquitectura modular y reutilizable. El diseño sigue un esquema SPA con rutas controladas mediante `react-router-dom`.

### Principales componentes

- **HomePage (`/`)**  
  Página inicial con la presentación del juego, acceso a inicio de sesión, registro, juego como anonimo y enlaces informativos (Acerca de).

- **Acerca de (`/acercade`)**  
  Página donde uno puede ver las instrucciones e informacion de los desarrolladores.

- **Registro invitado (`/registrarse-como-invitado`)**  
  Página para que los jugadores que desean jugar sin registrarso, ingresando un nombre de usuario pueden jugar sin poder llevar registro y luego son redireccionados `/homenoregistrado`. 

- **Registrarse (`/registrarse`)**  
  Permite crear una cuenta y registrarse, para luego ser redireccionado a `/homeregistrado`. 

- **LoginPage (`/login`)**  
  Página para que los jugadores registrados puedan iniciar sesion, donde se les solicitara su correo y contraseña para ingresar, habiendo ingresado te redirecciona a la homepage de jugador registrado.

- **Home Invitado (`/homenoregistrado`)** 
  Página para que los jugadores no registrados, en donde ellos solo tienen un botón disponible que es el de jugar. Al apretar ese botón son redireccionados automáticamente al matchmaking con un imperio aleatorio. Esto se diferencia de los jugadores registrados ya que ellos son redireccionados a una sección donde pueden escoger el imperio que quieran usar y la posibilidad de unirse a una partida mediante su ID (simulando que un amigo quiere jugar con otro de manera sincronizada). Esta pestaña se encuentra protegida mediante la invocación de la función `EsJugadorNoRegistrado()`, la cual se encuentra en `src/hooks/esJugadorNoRegistrado.js`, la cual recupera el Token y el userId de localstorage y consulta en la base de datos si quien está logueado es Jugador No Registrado, si no es así, se alerta y se redirecciona a HomePage.

- **Home Jugador Registrado (`/homeregistrado`)**  
  Vista personalizada para el jugador con su nombre, foto de perfil, descripción, botones de acción (“Editar perfil” y “Jugar”) y estadísticas globales.  
  Esta vista reemplaza el antiguo “menú principal” por una distribución más profesional en dos columnas:
  - Izquierda: información del jugador.  
  - Derecha: estadísticas globales obtenidas desde el backend.
  Esta pestaña se encuentra protegida mediante la invocación de la función `EsJugadorRegistrado()`, la cual se encuentra en `src/hooks/esJugadorRegistrado.js`, la cual recupera el Token y el userId de localstorage y consulta en la base de datos si quien está logueado es Jugador Registrado, si no es así, se alerta y se redirecciona a HomePage.

- **Perfil Jugador (`/perfil`)**  
  Permite editar nombre de usuario y descripción, así como visualizar su rango global y rendimiento histórico. Esta vista también se encuentra protegida por `EsJugadorRegistrado()`.

- **Selección de Imperio (`/seleccionar-imperio`)**  
  Luego de que el jugador registrado haya apretado el botón de jugar en la sección `/homeregistrado`, el jugador es enviado a esta pestaña donde puede seleccionar alguno de los cuatro Imperios que quiera utilizar en la partida determinada. Además, el jugador tiene la posibilidad de entrar por vía matchmaking tradicional, el cual funciona con las reglas establecidad en el backend respecto del emparejamiento o puede entrar a una partida específica proporcionando el ID de la partida a la que se quiere unir. Es importante recalcar que en una misma partida no pueden haber dos imperios iguales (Vikingos vs Vikingos o Chinos vs Chinos no sucede). Esta vista también se encuentra protegida por `EsJugadorRegistrado()`.

- **Matchmaking (`/matchmaking`)**  
  Luego de que un jugador haya, ya sea seleccionado su imperio y dado a matchmaking si es registrado, como dado a jugar simplemente si es no registrado, son enviados a esta pestaña de espera donde se provee el ID Partida, el estado de la partida, quien es el jugador 1 y quien es el jugador 2. Esta pestaña funciona con WebSockets para anunciar la llegada de un nuevo jugador dos. Luego de que se haya unido un segundo jugador, ambos son enviados a `/partida/:idpartida`.

- **Partida de Juego (`/partida/:idpartida`)**  
  Sección de juego propiamente tal, se muestra un tablero creado mediante posiciones absolutas, siguiendo el patrón creado en `src/helpers/tableroMap.js`. Además, se renderizan elementos clickeables como el mazo de cartas en donde salen las cartas según cada turno, las fichas que corresponden a sprites encontrados en `src/img/elementosJuego/soldados`. Las cartas también se encuentran en `src/img/elementosJuego/cartas`. Esta pestaña es la más relevante y compleja ya que se comunica con dos enpoints centrales, el cual gestiona robarCarta para cada caso y AplicarEfectoCarta, el cual permtie ejecutar movimientos, otorgar poderes a las fichas, etc.

- **Login de Administrador (`/login-admin`)**  
  Permite iniciar sesión con credenciales de administrador. Una vez autenticado, se redirige al panel `/admin`.

- **Panel de Administración (`/admin`)**  
  Acceso exclusivo para usuarios administradores, desde donde se pueden listar, cancelar, administrar partidas, etc. Es importante mencionar que esta vista se encuentra protegida mediante la invocación de la función `EsAdmin()`, la cual se encuentra en `src/hooks/esAdmin.js`, la cual recupera el Token y el userId de localstorage y consulta en la base de datos si quien está logueado es Admin, si no es así, se redirecciona a HomePage.

- **Crear Admin (`/admin/crear-admin`)**  
  Sección en la cual un administrador logueado puede crear un nuevo administrador, entregando username, correo y contraseña. Esta vista también se encuentra protegida por `EsAdmin()`

- **Listar Admins (`/admin/listar-admins`)**  
  Sección en la cual se listan todos los administradores que se encuentran en la base de datos. Sección también protegida por `EsAdmin()`.

- **Listar Partidas (`/admin/listar-partidas`)**  
  Sección en la cual se listan todas las partidas, mediante filtros como el estado, fecha de inicio y fecha de finalización. Se retornan todas las partidas que cumplan esos filtros con una serie de datos relevantes (quienes están jugando, los imperios escogidos, etc) Sección también protegida por `EsAdmin()`.

- **Cancelar Partidas (`/admin/cancelar-partida`)**  
  Sección en la cual un administrador puede cancelar una partida específica. Dejandola con estado cancelada, y entregando un motivo por el cual fue cancelada. Sección también protegida por `EsAdmin()`.

- **Listar Jugadores (`/admin/listar-jugadores`)**  
  Sección en la cual se listan todos los jugadores, mediante filtros específicos como correo, username, estado de la cuenta, puntos minimos y puntos máximos. Se retorna información interesante que permite identificar a los jugadores y además métricas relevantes como tasa de abandonos, si posee puntos anormales en relación a la cantidad de partidas ganadas, etc. Sección también protegida por `EsAdmin()`.

- **Ver Usuario (`/admin/ver-usuario`)**  
  Sección en la cual se muestea en detalle la información de un usuario registrado cualquiera entregando el ID de este, se retorna so nombre de usuaurio, correo, estado de cuenta, estadísticas varias, etc. Sección también protegida por `EsAdmin()`.

- **Ver Usuario (`/admin/editar-usuario`)**  
  Sección en la cual se puede editar la información de un usuario registrado cualquiera entregando el ID de este. Se pueden editar campos como su username, correo, contraseña, descripción, puntos, y lo más relevante, el estado de su cuenta. Sección también protegida por `EsAdmin()`.

Cada página incluye un **componente Header común**, con navegación dinámica según el tipo de usuario (jugador registrado, no registrado o administrador).

### Funciones Fetch

Dentro de la carpeta `src/js` pueden ser encontradas una serie de archivos, los cuales continene funciones que se comunican a cada EndPoint del backend de la página. Todo surge mediante el archivo `src/js/config.js`. El cual opera como una función fetch generalizada, la cual recibe el endpoint relativo y opciones varias (como puedne ser headers, body, etc). Recupera la data del endpoint asociado, tanto en caso de éxito como de error.

El resto de funciones fetch lo que hacen es tomar este template y llamar a esta función fetch general con cada endpoint correspondiente, el método, el body determinado, etc. Además, hay ciertas funciones, principalmente las de auth, que además se encargar de guardar en localstorage los tokens y el userId, lo que permite que sean recuperables en otras pestañas de ser necesario (además de bloquear vistas, etc). Se recomienda ver la implementación en si, pero en resumidas cuentas estas son las funciones principales que se encargan de la comunicación con el backend.

## Mejoras visuales (HTML + CSS respecto a la Entrega 0)

En esta entrega se realizaron importantes mejoras visuales y de estructura respecto al prototipo inicial, apegandose en base a los mock up desarrollados, los cuales pueden ser encontrados en la raiz del proyecto en la carpeta MockUps. En la entrega 0 no hubo componente de frontend más allá de los mockups, es por eso que se utilizó esa base para las pestañas como registro, login, homepage, etc. Y para el resto de las pestañas se decidió continuar con un estilo similar en términos de colores y formas. Adicionalmente, los sprites de cartas y fichas fueron adaptados para coincidir con estos estilos base, primando colores como amarillos, morados, rosados pastel, etc.  

## Reglas del juego y consideraciones

El juego mantiene las reglas base de *Ludo*, pero se implementaron algunas adaptaciones para hacerlo más dinámico y compatible con entorno web, aunque es importante recalcar que no sufrió variaciones respecto de la Entrega pasada:

- **Turnos y estados de partida:**  
  Se manejan cuatro estados para el caso de partida (`esperando`, `activa`, `finalizada`, `abandonada`).
  Se manejan tres estados para el caso de turnos (`inicializado`, `carta_robada`, `finalizado`)
- **Validaciones automáticas:**  
  Cada movimiento se valida en el backend antes de actualizar la interfaz.
- **Jugadores registrados y no registrados:**  
  Se agregó diferenciación visual y lógica entre ambos tipos de jugadores.
- **Autenticación persistente:**  
  Uso de `localStorage` para mantener sesión del usuario (token + tipoJugador).

## Supuestos y restricciones

- Cada jugador tiene una descripción y una imagen (por defecto `avatar.webp` si no se carga una, lo cual está pendiente de implementarse).  
- Solo usuarios registrados pueden acceder al perfil y estadísticas personales.  
- Los administradores acceden mediante un login dedicado y no comparten vistas con jugadores.  
- El frontend asume que la API REST se ejecuta según lo que disponga la variable `API_URL` encontrada en `src/js/config.js`. En caso de pruebas esta se encuentra en `http://localhost:3000`, en el caso de producción se referencia la URL de Render correspondiente.

## Documentación de dos Endpoints de Juego

Los dos endpoints de juego que son consumidos en la página de `Tablero.jsx` corresponde a `robarCarta()` y `AplicarEfectoCarta()`, los cuales son llamados mediante las funciones fetch del mismo nombre. Como su nombre indica, estas funciones manejan el hecho de que los jugadores puedan robar cartas del mazo para poder ejecutar ciertas acciones con sus fichas, como puede ser el hecho de moverlas a través del tablero o asignarles poderes dependiendo de si salió una carta especial según las reglas establecidas. `robarCarta()`toma en consideración todos los casos respecto al manejo de turnos (en el sentido de que solamente tenga derecho de sacar carta quien debería sacar carta en función de si le toca o no). Siempre luego de un `robarCarta()` debe ir acompañado de un `AplicarEfectoCarta()`, incluso en el caso de que, por ejemplo, todas las fichas de un jugador estén dentro de la zona de inicio, ya que `AplicarEfectoCarta()` es quien se encarga adicionalmente de pasar el turno al jugador siguiente. El flujo es el siguiente:

Los dos jugadores son redireccionados a la partida -> El jugador host roba carta del mazo (la cual aparece en el frontend como botón) -> Se ejecuta la función fetch que llama al endpoint de `robarCarta()` -> Se muestra la carta resultante -> El jugador host debe clickear alguna de sus fichas para aplicar el efecto de la carta (moverla, asignar poder, etc) -> Se ejecuta la función fetch que llama al endpoint de `AplicarEfectoCarta()` -> Le toca al jugador no host (y se repite el ciclo de robar carta).

Es importante recalcar que, hay ciertos problemas respecto de la optimización de estos endpoints, lo que genera que el servidor en ciertas circunstancias se caiga y no se puedan concretar las solicitudes del juego. Este es un aspecto que debe ser mejorado para entregas futuras. Sin embargo, en la normalidad de las situaciones, estos endpoints son consumidos correctamente. Por último, ocurren ciertas condiciones bordes, sobre todo en `AplicarEfectoCarta()` que tienen el efecto de que algunas fichas no ejecuten el comportamiento esperado, lo cual también debe ser corregido.

## Documentación de WebSockets Frontend

El sistema implementa una capa de comunicación en tiempo real basada en WebSockets, utilizada tanto en la sala de espera (`Matchmaking.jsx`) como en el tablero de juego (`Tablero.jsx`). 

Cuando un usuario entra a la sala de Matchmaking, el frontend crea una conexión WebSocket con el servidor. Una vez establecida, el cliente envía un mensaje del tipo join, indicando el id de la partida y el del usuario. El servidor registra esa conexión dentro de la partida correspondiente, lo que permite mantener un canal directo con todos los jugadores que participen en ella.

Cada vez que un jugador se une, el servidor envía un mensaje broadcast a todos los clientes conectados a esa partida, notificando que un nuevo jugador ha ingresado. De esta manera, ambos jugadores pueden ver en tiempo real cuando su oponente está listo. Una vez que se detecta que hay dos jugadores presentes, el servidor envía un evento match_complete, que indica que la partida va a comenzar.

Dentro del tablero, cada jugador mantiene una conexión WebSocket propia y nuevamente envía un mensaje join para asociarse con la partida en curso. Desde este punto, todas las acciones relevantes del juego se transmiten en tiempo real mediante eventos del tipo accion.

El flujo funciona de la siguiente forma:

1. Un jugador ejecuta una acción local, por ejemplo, robar una carta o mover una ficha. Estas acciones siempre se procesan primero mediante endpoints, ya que la base de datos debe mantenerse en un estado consistente.

2. Luego, el frontend envía un mensaje WebSocket al servidor El mensaje describe la acción ejecutada (por ejemplo, "robar_carta" o "mover_ficha"), junto con los datos necesarios para replicarla visualmente.

3. El servidor reenvía la acción a todos los jugadores conectados No modifica nada en la base de datos, solo sincroniza interfaces.

4. Cada cliente actualiza su interfaz de manera inmediata El jugador oponente ve la carta robada, la ficha movida o cualquier otro cambio sin necesidad de recargar ni consultar endpoints adicionales.

Las cartas robadas se actualizan visualmente cuando se recibe un evento robar_carta. Las fichas del tablero se actualizan cuando llega un mensaje mover_ficha y el cliente descarga la nueva información desde el endpoint correspondiente. Tanto en Matchmaking como en el Tablero, las conexiones WebSocket se cierran automáticamente cuando el usuario abandona la vista. 

## Instrucciones para usar el Frontend

### Requisitos previos (para probar en local)
- Paquetes instalados, tanto los de front como en back, ambos detalladas en sus package.json respectivos.
- Backend de la API corriendo en `http://localhost:3000`.
- Frontend corrriendo en `http://localhost:5173`

### Instalación
- yarn install
- yarn dev
- La aplicación estará disponible en: http://localhost:5173/

# Readme colaborativo

## Documentacion EsLint 

El proyecto utiliza ESLint para asegurar un código consistente, limpio y alineado con las mejores prácticas de desarrollo en React.
Además, la configuración está integrada con Vite y soporta reglas específicas para hooks y recarga en caliente. El objetivo de usarlo esta en:
* Mantener un estilo de codificación homogéneo entre todos los integrantes del equipo.
* Detectar errores comunes antes de ejecutar la aplicación.
* Prevenir malas prácticas en el uso de React Hooks.
* Integrarse con Vite para facilitar el desarrollo local.

Para usarlo se realiza de la siguiente manera:
* yarn eslint .

## Link del WebService subido a ...