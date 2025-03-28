import { ContentWrapper } from "@/components/common/content_wrapper/content_wrapper";
import { H1 } from "@/components/common/headers/H1";
import { H4 } from "@/components/common/headers/H4";

const Page = async () => {
    return <ContentWrapper className="pt-10 flex flex-col items-right gap-6">
        <H1 label="Aviso de Privacidad"/>
        <p><strong>Última actualización:</strong> 20 de febrero de 2025</p>
        <p>
            Este Aviso de Privacidad para LA EMBOSCADURA SL (&quot;nosotros&quot;, &quot;nuestro&quot;) describe cómo y por qué podemos acceder, recopilar, almacenar, usar y/o compartir (&quot;procesar&quot;) su información personal cuando utiliza nuestros servicios (&quot;Servicios&quot;), incluyendo cuando usted:
        </p>

        <ul>
            <li>
                Visite nuestro sitio web en <a href="https://escohotado.es" target="_blank">https://escohotado.es</a> o cualquier otro sitio nuestro que enlace a este Aviso de Privacidad.
            </li>
            <li>
                Utilice el Portal Antonio Escohotado. Proveemos un sitio web, productos digitales y servicios, como un foro comunitario para explorar y estudiar el legado de Antonio Escohotado.
            </li>
            <li>
                Interactúe con nosotros de otras maneras relacionadas, incluyendo ventas, marketing o eventos.
            </li>
        </ul>

        <p>
            <strong>¿Preguntas o inquietudes?</strong> Leer este Aviso de Privacidad le ayudará a comprender sus derechos y opciones de privacidad. Somos responsables de decidir cómo se procesa su información personal. Si no está de acuerdo con nuestras políticas y prácticas, por favor no utilice nuestros Servicios. Si tiene alguna pregunta o inquietud, contáctenos en <a href="mailto:contacto@laemboscadura.com">contacto@laemboscadura.com</a>.
        </p>

        <H4 label="RESUMEN DE PUNTOS CLAVE"/>
        <p>
            Este resumen ofrece los puntos esenciales de nuestro Aviso de Privacidad. Para conocer más detalles, consulte el aviso completo o use la tabla de contenidos a continuación para ubicar la sección que le interese.
        </p>

        <H4 label="1. ¿QUÉ INFORMACIÓN PERSONAL RECOPILAMOS?"/>
        <h3>Información personal que usted nos proporciona</h3>
        <p>
            <strong>En resumen:</strong> Recopilamos la información personal que usted nos facilita de manera voluntaria al registrarse en nuestros Servicios, expresar interés en nuestros productos o servicios, participar en actividades o contactarnos.
        </p>
        <p>
            Esta información puede incluir nombres, direcciones de correo electrónico, nombres de usuario, contraseñas, direcciones de facturación y números de tarjeta de débito/crédito, entre otros.
        </p>
        <p>
            <strong>Información sensible:</strong> No procesamos información sensible.
        </p>
        <p>
            <strong>Datos de pago:</strong> Podemos recopilar los datos necesarios para procesar su pago, como el número de su tarjeta y el código de seguridad. Todos los datos de pago se gestionan y almacenan a través de Stripe, lo que significa que no se localizan en nuestros servidores sino en el proveedor de pago. Puede consultar su aviso de privacidad en: <a href="https://stripe.com/es/privacy" target="_blank">https://stripe.com/es/privacy</a>.
        </p>
        <p>
            <strong>Datos de inicio de sesión social:</strong> Si decide registrarse o iniciar sesión mediante una cuenta de red social, recibiremos cierta información de su perfil del proveedor correspondiente.
        </p>
        <p>
            Toda la información que usted nos proporcione debe ser verdadera, completa y precisa; y usted es responsable de notificar cualquier cambio.
        </p>

        <H4 label="2. ¿CÓMO PROCESAMOS SU INFORMACIÓN?"/>
        <p>
            <strong>En resumen:</strong> Procesamos su información para proporcionar, mejorar y administrar nuestros Servicios, comunicarnos con usted, prevenir fraudes y cumplir con la ley. También podemos procesarla para otros fines si contamos con su consentimiento.
        </p>
        <p>
            Procesamos su información para facilitar la creación y autenticación de su cuenta, para brindarle el servicio solicitado, para responder a sus consultas, para enviarle información administrativa y para permitir la comunicación entre usuarios, entre otros fines.
        </p>

        <H4 label="3. ¿CUÁLES SON LAS BASES LEGALES PARA PROCESAR SU INFORMACIÓN?"/>
        <p>
            <strong>En resumen:</strong> Solo procesamos su información cuando creemos que es necesaria y contamos con una base legal válida, como su consentimiento, la ejecución de un contrato, el cumplimiento de obligaciones legales, la protección de sus derechos o nuestros intereses legítimos.
        </p>
        <ul>
            <li>
                <strong>Consentimiento:</strong> Procesamos su información si usted nos ha dado permiso, el cual puede retirar en cualquier momento.
            </li>
            <li>
                <strong>Ejecutar un contrato:</strong> Procesamos su información para cumplir con nuestras obligaciones contractuales.
            </li>
            <li>
                <strong>Obligaciones legales:</strong> Procesamos su información para cumplir con la ley o cooperar con autoridades.
            </li>
            <li>
                <strong>Intereses vitales:</strong> Procesamos su información cuando es necesario para proteger intereses vitales de usted o de terceros.
            </li>
        </ul>

        <H4 label="4. ¿CUÁNDO Y CON QUIÉN COMPARTIMOS SU INFORMACIÓN PERSONAL?"/>
        <p>
            <strong>En resumen:</strong> Podemos compartir su información en situaciones específicas y con terceros, por ejemplo en transferencias de negocios, con proveedores de servicios o para cumplir con obligaciones legales.
        </p>
        <ul>
            <li>
                <strong>Transferencias de negocio:</strong> En caso de fusiones, ventas o adquisiciones, su información podrá ser transferida a otra entidad.
            </li>
            <li>
                Otras situaciones conforme a lo descrito en este aviso.
            </li>
        </ul>

        <H4 label="5. ¿CÓMO MANEJAMOS LOS INICIOS DE SESIÓN SOCIAL?"/>
        <p>
            <strong>En resumen:</strong> Si decide usar una cuenta de red social para registrarse o iniciar sesión, recibiremos cierta información de su perfil, como su nombre, correo electrónico, lista de amigos y foto de perfil, según lo que el proveedor facilite.
        </p>
        <p>
            Utilizaremos esta información únicamente para los fines descritos en este Aviso de Privacidad.
        </p>

        <H4 label="6. ¿POR CUÁNTO TIEMPO CONSERVAMOS SU INFORMACIÓN?"/>
        <p>
            <strong>En resumen:</strong> Conservamos su información personal solo mientras sea necesaria para los fines establecidos en este Aviso de Privacidad, a menos que la ley exija conservarla por más tiempo.
        </p>
        <p>
            Una vez que ya no necesitemos su información, la eliminaremos o la anonimzaremos de forma segura.
        </p>

        <H4 label="7. ¿CÓMO MANTENEMOS SEGURA SU INFORMACIÓN?"/>
        <p>
            <strong>En resumen:</strong> Implementamos medidas técnicas y organizativas para proteger su información personal, aunque no podemos garantizar una seguridad absoluta.
        </p>
        <p>
            Hacemos nuestro mejor esfuerzo para salvaguardar su información, pero ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
        </p>

        <H4 label="8. ¿RECOPILAMOS INFORMACIÓN DE MENORES?"/>
        <p>
            <strong>En resumen:</strong> No recopilamos ni comercializamos información de niños menores de 18 años de forma intencionada. Si descubrimos que hemos recopilado datos de un menor, procederemos a desactivar la cuenta y eliminar dichos datos.
        </p>
        <p>
            Si tiene conocimiento de que se ha recopilado información de un menor, contáctenos en <a href="mailto:contacto@laemboscadura.com">contacto@laemboscadura.com</a>.
        </p>

        <H4 label="9. ¿CUÁLES SON SUS DERECHOS DE PRIVACIDAD?"/>
        <p>
            <strong>En resumen:</strong> Dependiendo de su ubicación (por ejemplo, en el EEE, Reino Unido o Suiza), usted puede tener derechos adicionales sobre su información personal, como el derecho de acceso, rectificación, eliminación, restricción, portabilidad o el derecho a oponerse al procesamiento.
        </p>
        <p>
            Para ejercer estos derechos, contáctenos utilizando la sección de contacto de este Aviso.
        </p>

        <H4 label="10. CONTROLES DE COOKIES Y PUBLICIDAD EN LÍNEA"/>
        <p>
            La mayoría de los navegadores y algunos sistemas operativos incluyen una función &quot;Do-Not-Track&quot; (DNT) que le permite señalar su preferencia de no ser rastreado. Actualmente, no respondemos a las señales DNT, pero si en el futuro se establece un estándar que debamos seguir, se le informará mediante una versión revisada de este Aviso de Privacidad.
        </p>

        <H4 label="11. ¿QUÉ DATOS ALMACENAMOS?"/>
        <p>
            Los principales datos que almacenamos son el correo electrónico y la contraseña. Los datos de facturación relacionados con la suscripción se almacenan en Stripe, garantizando su seguridad.
        </p>
        <p>
            Asimismo, utilizamos servicios anónimos para analizar la experiencia del usuario (por ejemplo, Sentry para reportar incidencias o AHrefs para análisis anónimos). Con respecto a las cookies, únicamente utilizamos cookies de sesión, de estilo OAutH4.
        </p>

        <H4 label="12. ¿ACTUALIZAMOS ESTE AVISO?"/>
        <p>
            <strong>En resumen:</strong> Sí, actualizaremos este aviso según sea necesario para cumplir con las leyes aplicables.
        </p>
        <p>
            Este Aviso de Privacidad puede actualizarse de vez en cuando. La versión actualizada se indicará con una fecha de revisión en la parte superior. Si realizamos cambios significativos, se le notificará mediante un aviso destacado o por correo electrónico.
        </p>

        <H4 label="13. ¿CÓMO PUEDE CONTACTARNOS SOBRE ESTE AVISO?"/>
        <p>
            Si tiene preguntas o comentarios sobre este Aviso de Privacidad, puede contactarnos enviando un correo electrónico a <a href="mailto:contacto@laemboscadura.com">contacto@laemboscadura.com</a> o por correo postal a:
        </p>
        <div>
        <p><strong>LA EMBOSCADURA SL</strong></p>
        <p><strong>Calle Azcona, 20. 7º A</strong></p>
        <p><strong>Madrid, Madrid, 28028</strong></p>
        <p><strong>España</strong></p>
        </div>
    </ContentWrapper>;
}

export default Page;