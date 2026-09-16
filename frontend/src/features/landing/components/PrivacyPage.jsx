import React from 'react';
import { Container } from 'react-bootstrap';

const PrivacyPage = () => {
  return (
    <section className="py-0" id="privacidad">
      <Container>
        <h4 className="mb-3">Política de Privacidad y Protección de Datos Personales</h4>
        <hr />
        <p className="text-uppercase small fw-semibold mb-4" style={{ letterSpacing: '.06em', opacity: .75 }}>
          Vigente desde el 2 de abril de 2025
        </p>

        <h5 className="mt-4">1. Responsable del tratamiento</h5>
        <div className="border border-secondary border-opacity-25 rounded-3 p-3 p-md-4 mb-3">
          <dl className="row mb-0">
            <dt className="col-sm-4 fw-semibold">Responsable</dt>
            <dd className="col-sm-8 mb-2">Inventiory, servicio operado por Imperial-Net</dd>

            <dt className="col-sm-4 fw-semibold">Sitio oficial</dt>
            <dd className="col-sm-8 mb-2">
              <a href="https://www.imperial-net.com" target="_blank" rel="noopener noreferrer">
                www.imperial-net.com
              </a>
            </dd>

            <dt className="col-sm-4 fw-semibold">Contacto en materia de datos</dt>
            <dd className="col-sm-8 mb-2">
              <a href="mailto:info@imperial-net.com">info@imperial-net.com</a>
            </dd>

            <dt className="col-sm-4 fw-semibold">Domicilio</dt>
            <dd className="col-sm-8 mb-0">
              República Argentina. El domicilio legal completo y los datos de inscripción fiscal se informan sin cargo a
              todo titular que lo solicite por el canal de contacto indicado.
            </dd>
          </dl>
        </div>
        <p>
          En adelante, indistintamente, "Inventiory", "nosotros" o el "Responsable". El servicio de software de gestión
          de inventario, stock, compras, ventas y reportes provisto bajo modalidad SaaS se denomina el "Servicio" o la
          "Plataforma".
        </p>

        <h5 className="mt-4">2. Marco normativo aplicable</h5>
        <p>
          Esta Política se dicta conforme a la <strong>Ley N° 25.326 de Protección de los Datos Personales</strong>, su
          Decreto Reglamentario N° 1558/2001, las disposiciones y resoluciones de la Agencia de Acceso a la Información
          Pública (AAIP) —en particular la Disposición DNPDP N° 11/2006 y la Resolución AAIP N° 47/2018 sobre medidas de
          seguridad—, el artículo 43, tercer párrafo, de la Constitución Nacional (acción de hábeas data), la Ley N°
          24.240 de Defensa del Consumidor y los artículos 1092 a 1122 del Código Civil y Comercial de la Nación en
          cuanto resulten aplicables.
        </p>

        <h5 className="mt-4">3. Alcance y definiciones</h5>
        <ul>
          <li><strong>Datos personales:</strong> información de cualquier tipo referida a personas humanas o de existencia ideal determinadas o determinables (art. 2, Ley 25.326).</li>
          <li><strong>Usuario / Cliente:</strong> la persona humana o jurídica que contrata el Servicio y administra una cuenta.</li>
          <li><strong>Usuario final:</strong> la persona habilitada por el Cliente para operar la Plataforma.</li>
          <li><strong>Datos de Cliente:</strong> la información que el Cliente y sus Usuarios finales cargan, generan o almacenan en la Plataforma.</li>
        </ul>

        <h5 className="mt-4">4. Datos que tratamos</h5>
        <ul>
          <li>
            <strong>Datos de registro y de cuenta:</strong> nombre y apellido, denominación social, CUIT/CUIL, correo
            electrónico, teléfono, domicilio comercial, rol dentro de la organización y credenciales de acceso. Las
            contraseñas se almacenan exclusivamente mediante funciones de <em>hash</em> con <em>salt</em>: Inventiory no
            conoce ni puede recuperar la contraseña en texto plano.
          </li>
          <li>
            <strong>Datos de facturación:</strong> condición frente a AFIP/ARCA, domicilio fiscal, comprobantes y estado
            de pagos. No almacenamos números completos de tarjetas ni códigos de seguridad: el pago se procesa
            íntegramente en el entorno de los procesadores habilitados.
          </li>
          <li>
            <strong>Datos de uso y técnicos:</strong> dirección IP, fecha y hora de acceso, navegador, sistema operativo,
            identificadores de sesión, funcionalidades utilizadas, registros de auditoría de operaciones y logs de error.
          </li>
          <li>
            <strong>Datos de Cliente cargados en la Plataforma:</strong> inventario, listas de precios, proveedores,
            órdenes y, si el Cliente así lo decide, datos personales de terceros. Respecto de estos datos el Cliente es
            el Responsable del tratamiento e Inventiory actúa como prestador de servicios de tratamiento en los términos
            del art. 25 de la Ley 25.326.
          </li>
          <li>
            <strong>Datos de soporte:</strong> contenido de consultas, tickets y correos y, cuando corresponda,
            grabaciones de sesiones de asistencia técnica, previo aviso.
          </li>
          <li>
            <strong>Datos que NO solicitamos:</strong> Inventiory no requiere datos sensibles en el sentido del art. 2 de
            la Ley 25.326 (origen racial o étnico, opiniones políticas, convicciones religiosas, filosóficas o morales,
            afiliación sindical, salud o vida sexual). El Usuario se obliga a no cargarlos en campos de texto libre.
          </li>
        </ul>

        <h5 className="mt-4">5. Finalidades y bases de licitud</h5>
        <ul>
          <li><strong>Crear y administrar la cuenta y prestar el Servicio:</strong> ejecución del contrato (art. 5, inc. 2.a y d).</li>
          <li><strong>Facturación, cobro y cumplimiento fiscal:</strong> obligación legal (art. 5, inc. 2.b).</li>
          <li><strong>Soporte técnico y atención de reclamos:</strong> ejecución del contrato.</li>
          <li><strong>Seguridad, prevención de fraude, auditoría y trazabilidad:</strong> interés legítimo del Responsable u obligación legal.</li>
          <li><strong>Mejora del producto y estadísticas agregadas:</strong> datos disociados (art. 28).</li>
          <li><strong>Comunicaciones comerciales:</strong> consentimiento libre, expreso e informado, revocable en todo momento.</li>
        </ul>
        <p>
          Los datos no serán utilizados para fines distintos o incompatibles con aquellos que motivaron su obtención
          (art. 4, inc. 3, Ley 25.326).
        </p>

        <h5 className="mt-4">6. Consentimiento</h5>
        <p>
          El tratamiento se funda en el consentimiento libre, expreso e informado del titular, prestado mediante acto
          positivo inequívoco al momento del registro (art. 5, Ley 25.326), salvo los supuestos legalmente exceptuados.
          El consentimiento para comunicaciones comerciales se recaba en forma separada y su negativa no condiciona la
          prestación del Servicio.
        </p>

        <h5 className="mt-4">7. Plazo de conservación</h5>
        <ul>
          <li>
            <strong>Datos de cuenta y Datos de Cliente:</strong> durante la vigencia del contrato y hasta 90 (noventa)
            días corridos posteriores a su terminación, plazo dentro del cual el Cliente podrá exportar su información.
            Vencido ese plazo se eliminan o anonimizan de los entornos productivos, y de los respaldos dentro del ciclo
            de rotación de copias (máximo [180] días).
          </li>
          <li><strong>Documentación contable e impositiva:</strong> por los plazos exigidos por la legislación fiscal y el art. 328 del Código Civil y Comercial (10 años).</li>
          <li><strong>Logs de seguridad y auditoría:</strong> hasta [12] meses.</li>
        </ul>

        <h5 className="mt-4">8. Cesiones, encargados y terceros</h5>
        <p>Inventiory no vende, alquila ni comercializa datos personales. Los datos podrán ser comunicados exclusivamente a:</p>
        <ul>
          <li>
            <strong>Proveedores de infraestructura y servicios</strong> que actúan como encargados del tratamiento por
            cuenta y orden de Inventiory, bajo contrato escrito con obligaciones de confidencialidad y seguridad
            equivalentes a las de esta Política (art. 25, Ley 25.326): alojamiento en la nube, correo transaccional,
            procesamiento de pagos, analítica y herramientas de soporte.
          </li>
          <li>
            <strong>Autoridades judiciales o administrativas competentes</strong>, ante requerimiento fundado dictado en
            el marco de sus atribuciones legales. Inventiory notificará al Cliente, salvo prohibición legal expresa.
          </li>
          <li>
            <strong>Terceros adquirentes</strong> en caso de reorganización societaria, fusión o transferencia de fondo
            de comercio, manteniéndose íntegramente las obligaciones de esta Política y previa notificación al Usuario.
          </li>
        </ul>

        <h5 className="mt-4">9. Transferencia internacional de datos</h5>
        <p>
          La infraestructura puede alojarse en servidores ubicados fuera de la República Argentina ([indicar región]).
          Toda transferencia a países que no sean considerados de protección adecuada conforme la Disposición DNPDP N°
          60-E/2016 se instrumenta mediante los contratos modelo de transferencia internacional aprobados por dicha
          norma, o con el consentimiento expreso del titular (art. 12, Ley 25.326).
        </p>

        <h5 className="mt-4">10. Medidas de seguridad</h5>
        <p>
          Conforme el art. 9 de la Ley 25.326 y la Resolución AAIP N° 47/2018, adoptamos medidas técnicas y
          organizativas apropiadas al nivel de riesgo:
        </p>
        <ul>
          <li>Cifrado del canal (TLS 1.2 o superior) y cifrado en reposo de la base de datos.</li>
          <li>Autenticación basada en tokens con expiración y política de contraseñas robustas.</li>
          <li>Control de acceso por roles y perfiles, bajo principio de mínimo privilegio.</li>
          <li>Registros de auditoría de accesos y operaciones críticas.</li>
          <li>Copias de respaldo periódicas y pruebas de restauración.</li>
          <li>Segregación de ambientes de desarrollo, prueba y producción.</li>
          <li>Acuerdos de confidencialidad con personal y proveedores.</li>
        </ul>
        <p>
          Ninguna medida de seguridad es infalible. Inventiory no garantiza la inviolabilidad absoluta de sus sistemas,
          pero se obliga a actuar con la diligencia profesional exigible (art. 1725, CCyCN).
        </p>

        <h5 className="mt-4">11. Incidentes de seguridad</h5>
        <p>
          Detectado un incidente que afecte la confidencialidad, integridad o disponibilidad de datos personales,
          Inventiory lo contendrá y analizará sin demora, notificará al Cliente afectado dentro de las [72] horas de
          tomado conocimiento cierto del hecho —describiendo su naturaleza, los datos comprometidos, las medidas
          adoptadas y las recomendaciones aplicables— y efectuará las comunicaciones que correspondan ante la AAIP y
          demás autoridades competentes.
        </p>

        <h5 className="mt-4">12. Derechos del titular de los datos</h5>
        <p>
          Todo titular puede ejercer, en forma gratuita a intervalos no inferiores a seis meses (salvo interés legítimo
          acreditado), los derechos de:
        </p>
        <ul>
          <li><strong>Acceso</strong> (art. 14, Ley 25.326): respuesta dentro de los 10 (diez) días corridos.</li>
          <li><strong>Rectificación, actualización y supresión</strong> (art. 16): resolución dentro de los 5 (cinco) días hábiles.</li>
          <li><strong>Retiro o bloqueo</strong> del banco de datos y revocación del consentimiento.</li>
          <li><strong>Oposición</strong> al tratamiento con fines publicitarios y retiro del registro (art. 27, inc. 3).</li>
          <li><strong>Impugnación de valoraciones personales</strong> automatizadas (art. 20).</li>
        </ul>
        <p>
          <strong>Canal de ejercicio:</strong> correo a <strong>info@imperial-net.com</strong>, acompañando copia de
          documento que acredite identidad, o presentación en el domicilio legal indicado en el punto 1.
        </p>
        <blockquote className="border-start border-3 ps-3 fst-italic">
          <p className="mb-2">
            <strong>Leyenda obligatoria (art. 27, Decreto 1558/2001):</strong> "El titular de los datos personales tiene
            la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis
            meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso
            3 de la Ley N° 25.326."
          </p>
          <p className="mb-2">
            <strong>Leyenda obligatoria (Resolución AAIP N° 4/2019):</strong> "La AGENCIA DE ACCESO A LA INFORMACIÓN
            PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las
            denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las
            normas vigentes en materia de protección de datos personales."
          </p>
          <p className="mb-0">
            <strong>Leyenda obligatoria para publicidad (art. 27, inc. 3, Ley 25.326):</strong> "El titular podrá en
            cualquier momento solicitar el retiro o bloqueo de su nombre de los bancos de datos a los que se refiere el
            presente artículo."
          </p>
        </blockquote>

        <h5 className="mt-4">13. Usuarios alcanzados por el RGPD</h5>
        <p>
          Cuando corresponda la aplicación del Reglamento (UE) 2016/679 se reconocen además los derechos de limitación
          del tratamiento, portabilidad y oposición, el derecho a no ser objeto de decisiones individuales automatizadas
          con efectos jurídicos y el derecho a reclamar ante la autoridad de control del Estado miembro correspondiente.
        </p>

        <h5 className="mt-4">14. Cookies y tecnologías similares</h5>
        <ul>
          <li><strong>Cookies técnicas o necesarias:</strong> imprescindibles para la autenticación, el mantenimiento de la sesión y la seguridad. No requieren consentimiento.</li>
          <li><strong>Cookies de preferencias:</strong> idioma, tema visual y configuración de tablas.</li>
          <li><strong>Cookies analíticas:</strong> métricas agregadas de uso.</li>
        </ul>
        <p>
          Las cookies no necesarias solo se activan previo consentimiento otorgado mediante el banner correspondiente,
          que permite aceptarlas, rechazarlas o configurarlas granularmente. El Usuario puede además eliminarlas o
          bloquearlas desde su navegador; el bloqueo de cookies técnicas puede impedir el funcionamiento del Servicio.
        </p>

        <h5 className="mt-4">15. Menores de edad</h5>
        <p>
          El Servicio está dirigido exclusivamente a personas mayores de 18 años con capacidad para contratar. Inventiory
          no recolecta conscientemente datos de menores de edad; detectada tal situación se procederá a su supresión
          inmediata.
        </p>

        <h5 className="mt-4">16. Decisiones automatizadas</h5>
        <p>
          Inventiory no adopta decisiones automatizadas que produzcan efectos jurídicos sobre el Usuario ni lo afecten
          significativamente. Las sugerencias de reposición de stock, alertas o proyecciones que ofrece la Plataforma son
          meramente orientativas y no sustituyen el criterio del Usuario.
        </p>

        <h5 className="mt-4">17. Registro de bases de datos</h5>
        <p>
          Inventiory declara haber inscripto —o encontrarse en trámite de inscripción de— sus bases de datos ante el
          Registro Nacional de Bases de Datos de la AAIP, conforme el art. 21 de la Ley 25.326. [N° de inscripción: ____].
        </p>

        <h5 className="mt-4">18. Modificaciones</h5>
        <p>
          Esta Política puede modificarse para adecuarla a cambios normativos, técnicos u operativos. Toda modificación
          sustancial será notificada con una antelación mínima de 10 (diez) días corridos por correo electrónico y
          mediante aviso destacado en la Plataforma. Cuando la modificación requiera consentimiento, éste será recabado
          en forma expresa.
        </p>

        <h5 className="mt-4">19. Autoridad de control y reclamos</h5>
        <p>
          Ante cualquier incumplimiento, el titular puede denunciar ante la{' '}
          <strong>Agencia de Acceso a la Información Pública</strong> — Av. Pte. Julio A. Roca 710, Piso 2°, C.A.B.A. —{' '}
          <a href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener noreferrer">
            argentina.gob.ar/aaip
          </a>{' '}
          — o promover la acción de hábeas data (art. 43 CN y arts. 33 y ss. de la Ley 25.326).
        </p>

        <h5 className="mt-4">20. Ley aplicable y jurisdicción</h5>
        <p>
          Esta Política se rige por las leyes de la República Argentina. Para toda controversia serán competentes los
          tribunales ordinarios con asiento en [CIUDAD], sin perjuicio de que, cuando el Usuario revista el carácter de
          consumidor, resulte competente el tribunal de su domicilio real conforme los artículos 36 de la Ley 24.240 y
          2654 del Código Civil y Comercial de la Nación, siendo nula toda cláusula en contrario.
        </p>

        <p className="mt-4">Gracias por confiar en Inventiory.</p>

        <hr className="mt-4" />
        <p className="small mb-0" style={{ opacity: .6 }}>
          Política de Privacidad — versión 1.0
        </p>
      </Container>
    </section>
  );
};

export default PrivacyPage;
