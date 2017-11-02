# [Project Structure Template] NodeJS + Express + Waterline + JWT + EJS Template Views + Heroku + ...

- NodeJS por parte del servidor
- ExpressJS como motor de back-end
- Waterline como ORM de base de datos (Mysql, MongoDB, PostreSQL, Redis...)
- JWT como método de gestión sesiones
- EJS como motor de plantilla para las vistas
- Preparado para despliegue en Heroku

Módulos opcionales de uso:

- **Mail Sender**: `Nodemailer` para envío de emails

## Despliegue Local

    npm install     // Instala dependencias
    npm run dev     // Dev (life-reload automático al realizar cambios en el código gracias a librería "Nodemon")
    npm run start   // Prod (auto-redeploy cuando se cae el servidor gracias a la librería "Forever")

_No es seguro, ni está preparado para hacer frente a entornos de producción reales_

## Despliegue Heroku

    cd projectDirectory
    heroku login    // Login en Heroku
    git init        // [OPCIONAL] Inicia Git si no estaba configurado en el directorio del proyecto
    heroku create <name> --region eu
    npm run deploy

## Subir cambios y desplegar en Heroku

    npm run deploy

## Estructura y arquitectura de directorio de trabajo

- **/middlewares**: funciones que actuan como middlewares de los Routers creados en `/routes`
    - **/middlewares/tokenSessionMiddleware.js**: ejemplo del funcionamiento de un middleware para verificar la existencia de un JWT correcto en la cabecera de las peticiones.
- **/models**: directorio para crear los modelos que gestionará Waterline
    - **/models/_index.js**: fichero encargado de cargar automáticamente en Waterline todos los modelos creados en el directorio `/models`
- **/modules**: módulos externos independientes del servidor
    - **/modules/mailSender**: ejemplo del módulo de envío de correos
- **/routes**: directorio en el que se crean los Router de Express
    - **/routes/example.js**: ejemplo de uso básico de express.Router()
    - **/routes/exampleMiddleware.js**: ejemplo de uso básico de express.Router() con uso de Middleware personalizado
    - **/routes/exampleView.js**: ejemplo de uso básico de express.Router() con respuesta de vista HTML
- **/views**: directorio en el que se crean las vistas del servidor con motor de plantilla EJS
    - **/views/exampleView.ejs**: ejemplo de vista con motor de plantilla EJS

- `server.js`: fichero principal de ejecución del servidor
- `config.js`: fichero de configuración del servidor
- `serverRouter.js`: fichero que gestiona el routing de los end-points del servidor.

## Cambiar motor de BD

Gracias a Waterline, es posible cambiar el motor de base de datos modificando únicamente la conexión en el fichero `config.js`. La lista de adaptadores disponibles se encuentra en: [https://github.com/balderdashy/sails-docs/blob/1.0/concepts/extending-sails/Adapters/adapterList.md](https://github.com/balderdashy/sails-docs/blob/1.0/concepts/extending-sails/Adapters/adapterList.md)

    Para usar un modelo de datos en cualquier ubicación del directorio de trabajo basta con usar `app.models.<nombre_modelo>`. La variable `app` se define automáticamente de manera global y se añaden los modelos en el parámetro `models` al cargar Waterline en el arranque del servidor en el fichero `server.js`

También es posible modificar la base de datos de cada modelo específicao modificando el parámetro `connection` de cada modelo.
## Logs

Se ha configurado la librería [morgan](https://github.com/expressjs/morgan) para que almacene todas las peticiones recibidas en ficheros ".log" en el directorio `/log` (Se creará un fichero nuevo cada 7 días).

También se utiliza [morgan-body](https://github.com/sirrodgepodge/morgan-body) para mostrar por consola el cuerpo y la respuesta de cada petición recbida. Además de esto, se guardará todo el log en el fichero `/log/console.log`. Este fichero está disponible en el end-point "/log" con autenticación básica HTTP.
## + Info

- **bcrypt**: para encriptación de passwords + salt
- **helmet**: librería de seguridad para Express
- **CSS**: librería usada en las vistas [http://milligram.io/](http://milligram.io/)

## //TODO:

- Documentar API con documentación inline [http://apidocjs.com/](http://apidocjs.com/)
- Gestión de errores y errorHandlers [https://github.com/expressjs/errorhandler](https://github.com/expressjs/errorhandler)
- ~~Monitorización y gestión de logs [https://github.com/expressjs/morgan](https://github.com/expressjs/morgan)~~
- Configurar librería Helmet + CSFR protection [https://github.com/expressjs/csurf](https://github.com/expressjs/csurf)
- Añadir módulos (Notificaciones Push GCM & APN, Sockets, etc...)

## Known Bugs

- Las peticiones de evío de emails al end-point: `http://localhost:8001/mailSender` siempre devuelven mensaje de "Mail Sent" a pesar de que haya ocurrido algún error en el envío del correo