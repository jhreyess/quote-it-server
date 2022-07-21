import styled from "styled-components";

const Policy = styled.div`
    margin: 2em 8em;
    padding: 2em 8em;
    background-color: #333333;
    border-radius: 18px;
    @media(max-width: 768px){
        margin: 0;
        padding: 1em 2em;
        font-size: 2vw;
    }
    @media(max-width: 500px){
        font-size: 0.75em;
    }
`
const Hyperlink = styled.a`
    color: #AAF;
    text-decoration: none;
    &:hover{
        text-decoration: underline;
    }
`

const Privacy = () => {
    return(
        <Policy>
            <h1>Política de privacidad</h1>
            <p>Última actualización: Julio 19, 2022</p>
            <p>La siguiente Política de Privacidad, describe nuestra política y procedimientos en cómo recolectamos, usamos y compartimos su información al usar nuestro servicio.</p>
            <p>Usamos esta información para proveer y mejorar nuestro servicio. Al usar nuestro servicio, usted acepta esta Política de Privacidad y sus términos, y acepta que sus datos sean procesados.</p>
            <p>Nuestro Servicio no se dirige a ninguna persona menor de 13 años. No recopilamos a sabiendas información de identificación personal de ninguna persona menor de 13 años. Si usted es padre o tutor y sabe que su hijo nos ha proporcionado Datos personales, por favor contáctenos. Si nos damos cuenta de que hemos recopilado datos personales de cualquier persona menor de 13 años sin verificación del consentimiento de los padres, tomamos medidas para eliminar esa información de nuestros servidores.</p>
            <h1>Definiciones</h1>
            <p>Para que este documento sea más fácil de leer, utilizaremos algunos símbolos a través del mismo. Por ejemplo, al referirnos a "Quote It!", estamos hablando de:</p>
            <ul>
                <li><strong>Aplicaciones móviles</strong> de Quote It! como</li>
                <ul><li>Quote It!</li></ul>
                <li><strong>Sitios Web</strong> de Quote It! como</li>
                <ul><li><Hyperlink href="https://quote-it-app.herokuapp.com/">quote-it-app.herokuapp.com</Hyperlink></li></ul>
            </ul>
            <p>Los productos y servicios de Quote It! son propiedad y están operados por Josué Humberto Reyes Suárez, a la que se hace referencia como "JHRS", "nos" o "nosotros". Cuando nos referimos al usuario de nuestros servicios,
                usamos el término "usuario" o "usted".
            </p>
            <h1>Información que recopilamos y cómo la recopilamos</h1>
            <p>La información que recopilamos depende de los servicios y funcionalidad que solicite al usar nuestros servicios. Puede negarse a enviarnos información personal; sin embargo, eso puede impedir brindar el servicio o
                funcionalidad de Quote It! parcial o totalmente.
            </p>
            <h2>Tipos de datos recopilados</h2>
            <h3>Datos personales</h3>
            <p>La información personal que recopilamos y el propósito para el cual lo hacemos se describe a continuación.</p>
            <p>Al usar Quote It!, para crear una cuenta, necesitamos datos de identificación para contactar o identificar al usuario, entre los cuales se incluye:</p>
            <ul>
                <li><p>Correo electrónico</p></li>
                <li><p>Nombre de usuario</p></li>
                <li><p>ID de usuario</p></li>
                <li><p>Datos de uso</p></li>
            </ul>

            <h3>Datos de uso</h3>
            <p>Los datos de uso se recopilan automáticamente cuando usa nuestros servicios.</p>
            <p>Los datos de uso pueden incluir información como la dirección del protocolo de Internet de su dispositivo (por ejemplo, la dirección IP), el tipo de navegador, la versión del navegador, las páginas de nuestro Servicio que visita, la hora y la fecha de su visita, el tiempo que pasa en esas páginas, dispositivo único identificadores y otros datos de diagnóstico.</p>
            <p>Cuando accede al Servicio a través de un dispositivo móvil, podemos recopilar cierta información automáticamente, incluido, entre otros, el tipo de dispositivo móvil que utiliza, la identificación única de su dispositivo móvil, la dirección IP de su dispositivo móvil, su sistema operativo móvil, el tipo de navegador de Internet móvil que utiliza, identificadores únicos de dispositivos y otros datos de diagnóstico.</p>
            <p>También podemos recopilar información que su navegador envía cada vez que visita nuestro Servicio o cuando accede al Servicio a través de un dispositivo móvil.</p>
            <h3>Información recopilada al usar la aplicación</h3>

            <p>Al usar Quote It!, para ofrecer ciertas funcionalidades de nuestra aplicación, es posible que recopilemos con permiso previo:</p>
            <ul>
                <li>Imágenes y otra información de la cámara y la biblioteca de fotos de su dispositivo</li>
            </ul>
            <p>Usamos esta información para proporcionar características de nuestro servicio, para mejorar y personalizar nuestro servicio. La información puede ser cargada en los servidores del desarrollador y/o en el servidor de un proveedor de servicios o simplemente puede ser almacenar en su dispositivo.</p>
            <p>Puede habilitar o deshabilitar el acceso a esta información en cualquier momento, a través de la configuración de Su dispositivo.</p>

            <h2>Uso de datos personales</h2>
            <p>Tu información personal puede ser usada para los siguientes propósitos:</p>
            <ul>
                <li><p><strong>Para proporcionar y mantener nuestro Servicio</strong>, incluyendo monitorear el uso de nuestro Servicio.</p></li>
                <li><p><strong>Para administrar su cuenta:</strong> para gestionar Su registro como usuario del Servicio. Los Datos Personales que proporcione pueden darle acceso a diferentes funcionalidades del servicio que están disponibles para usted como usuario registrado.</p></li>
                <li><p><strong>Para contactarte:</strong> Para contactarlo por correo electrónico, llamadas telefónicas, SMS u otras formas equivalentes de comunicación electrónica, como notificaciones automáticas de una aplicación móvil sobre actualizaciones o comunicaciones informativas relacionadas con las funcionalidades, productos o servicios contratados, incluidas las actualizaciones de seguridad, cuando sea necesario o razonable para su implementación.</p></li>
                <li><p><strong>Para proporcionar</strong> noticias, ofertas especiales e información general sobre otros bienes, servicios y eventos que ofrecemos que son similares a los que ya adquirió o preguntó, a menos que haya optado por no recibir dicha información..</p></li>
                <li><p><strong>Para administrar solicitudes:</strong> Para atender y gestionar sus solicitudes hacia nosotros.</p></li>
                <li><p><strong>Para otros propósitos</strong>: Podemos utilizar su información para otros fines, como el análisis de datos, la identificación de tendencias de uso, la determinación de la eficacia de nuestras campañas promocionales y para evaluar y mejorar nuestro Servicio, productos, servicios, marketing y su experiencia.</p></li>
            </ul>

            <p>Es posible que compartamos tu información personal bajo las siguientes condiciones:</p>
            <ul>
                <li><strong>Con proveedores de servicios:</strong> Podemos compartir Su información personal con Proveedores de Servicios para monitorear y analizar el uso de nuestro Servicio, para contactarlo.</li>
                <li><strong>Con su consentimiento</strong>: Podemos divulgar su información personal para cualquier otro propósito con su consentimiento.</li>
            </ul>

            <h2>Retención de los datos personales</h2>
            <p>Nosotros podemos conservar sus datos personales solo durante el tiempo que sea necesario para los fines establecidos en esta Política de privacidad. Conservaremos y utilizaremos sus datos personales en la medida necesaria para cumplir con nuestras obligaciones legales (por ejemplo, si estamos obligados a conservar sus datos para cumplir con las leyes aplicables), resolver disputas y hacer cumplir nuestras políticas y acuerdos legales.</p>
            <p>La Compañía también conservará los Datos de uso para fines de análisis interno. Los datos de uso generalmente se retienen por un período de tiempo más corto, excepto cuando estos datos se utilizan para fortalecer la seguridad o mejorar la funcionalidad de nuestro servicio, o cuando estamos legalmente obligados a retener estos datos por períodos de tiempo más largos.</p>

            <h2>Transferencia de sus datos personales</h2>
            <p>Su información, incluidos los Datos Personales, es procesada por nosotros y en cualquier otro lugar donde se encuentren las partes involucradas en el procesamiento. Significa que esta información se puede transferir y mantener en computadoras ubicadas fuera de Su estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir de las de Su jurisdicción.</p>
            <p>Tomaremos todas las medidas razonablemente necesarias para garantizar que sus datos se traten de forma segura y de acuerdo con esta Política de privacidad y no se realizará ninguna transferencia de sus datos personales a una organización o país a menos que existan controles adecuados establecidos, incluida la seguridad de Sus datos y otra información personal.</p>
            
            <h2>Divulgación de sus datos personales</h2>
            <h3>Cumplimiento de la ley</h3>
            <p>En determinadas circunstancias, es posible que se nos solicite que divulguemos sus Datos personales si así lo requiere la ley o en respuesta a solicitudes válidas de las autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).</p>
            <h3>Otros requerimientos legales</h3>
            <p>La Compañía puede divulgar sus Datos personales de buena fe cuando considere que esta acción es necesaria para lo siguiente:</p>
            <ul>
                <li>Cumplir con una obligación legal</li>
                <li>Prevenir o investigar posibles irregularidades en relación con el Servicio</li>
                <li>Proteger la seguridad personal de los Usuarios del Servicio o del público</li>
                <li>Proteger contra responsabilidad legal</li>
            </ul>

            <h2>Seguridad de los datos personales</h2>
            <p>La seguridad de sus datos personales es importante para nosotros, pero recuerde que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100 % seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger sus datos personales, no podemos garantizar su seguridad absoluta.</p>

            <h1>Links hacia otros sitios</h1>
            <p>Nuestro Servicio puede contener enlaces a otros sitios web que no son operados por Nosotros. Si hace clic en el enlace de un tercero, será dirigido al sitio de ese tercero. Le recomendamos encarecidamente que revise la Política de privacidad de cada sitio que visite.</p>
            <p>No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios o servicios de terceros.</p>

            <h1>Cambios a la Política de Privacidad</h1>
            <p>Es posible que actualicemos nuestra Política de privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.</p>
            <p>Le informaremos por correo electrónico y/o un aviso destacado en nuestro servicio, antes de que el cambio entre en vigencia y actualizaremos la fecha de "Última actualización" en la parte superior de esta Política de privacidad.</p>
            <p>Se le recomienda revisar esta Política de Privacidad periódicamente para cualquier cambio. Los cambios a esta Política de privacidad son efectivos cuando se publican en esta página.</p>

            <h1>Contáctanos</h1>
            <p>Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos a traves de:</p>
            <ul>
                <li><p>Email: contact.jhrs@gmail.com</p></li>
                <li><p>Visitando nuestra página: <Hyperlink href="https://quote-it-app.herokuapp.com/" rel="noreferrer" target="_blank">https://quote-it-app.herokuapp.com/</Hyperlink></p></li>
            </ul>
        </Policy>
    )}

export default Privacy;