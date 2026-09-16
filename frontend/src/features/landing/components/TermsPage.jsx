import React from 'react';
import { Container } from 'react-bootstrap';

const TermsPage = () => {
  return (
    <section className="" id="terminos">
      <Container>
        <h4 className="mb-3">Términos y Condiciones de Uso</h4>
        <hr />
        <p className="text-uppercase small fw-semibold mb-4" style={{ letterSpacing: '.06em', opacity: .75 }}>
          Vigente desde el 2 de abril de 2025
        </p>

        <h5 className="mt-4">1. Partes y aceptación del contrato</h5>
        <div className="border border-secondary border-opacity-25 rounded-3 p-3 p-md-4 mb-3">
          <dl className="row mb-0">
            <dt className="col-sm-4 fw-semibold">Prestador</dt>
            <dd className="col-sm-8 mb-2">Inventiory, servicio operado por Imperial-Net</dd>

            <dt className="col-sm-4 fw-semibold">Sitio oficial</dt>
            <dd className="col-sm-8 mb-2">
              <a href="https://www.imperial-net.com" target="_blank" rel="noopener noreferrer">
                www.imperial-net.com
              </a>
            </dd>

            <dt className="col-sm-4 fw-semibold">Contacto legal</dt>
            <dd className="col-sm-8 mb-2">
              <a href="mailto:info@imperial-net.com">info@imperial-net.com</a>
            </dd>

            <dt className="col-sm-4 fw-semibold">Domicilio</dt>
            <dd className="col-sm-8 mb-0">
              República Argentina. El domicilio legal completo y los datos de inscripción fiscal se informan sin cargo a
              todo Usuario que lo solicite por el canal de contacto indicado.
            </dd>
          </dl>
        </div>
        <p>
          Los presentes Términos y Condiciones (los "Términos") constituyen un contrato de adhesión con cláusulas
          generales predispuestas (arts. 984 a 989 del Código Civil y Comercial de la Nación, "CCyCN") celebrado entre el
          prestador identificado precedentemente ("Inventiory") y toda persona humana o jurídica que acceda o utilice la
          plataforma ("el Usuario").
        </p>
        <p>
          El registro, la contratación de un plan o el mero uso del Servicio implican la aceptación plena, expresa y sin
          reservas de estos Términos y de la Política de Privacidad, que forma parte integrante de este contrato. Quien
          no acepte estos Términos debe abstenerse de utilizar el Servicio. Conforme el art. 1106 del CCyCN, el soporte
          electrónico de este contrato satisface el requisito de instrumentación por escrito, y el Usuario puede
          descargarlo y conservarlo en todo momento.
        </p>

        <h5 className="mt-4">2. Capacidad</h5>
        <p>
          Solo pueden contratar personas humanas mayores de 18 años con plena capacidad para obligarse, o quienes actúen
          invocando representación suficiente de una persona jurídica. Quien contrate en nombre de una sociedad declara y
          garantiza contar con facultades suficientes para obligarla, respondiendo personalmente en caso contrario (art.
          376, CCyCN).
        </p>

        <h5 className="mt-4">3. Objeto y descripción del Servicio</h5>
        <p>
          Inventiory otorga al Usuario una licencia de uso no exclusiva, intransferible, revocable y limitada al plazo de
          la suscripción, sobre una plataforma de software como servicio (SaaS) destinada a la gestión de inventario,
          stock, productos, proveedores, movimientos, compras, ventas y reportes.
        </p>
        <p>
          El Servicio se presta como licencia de uso, no como venta de software. El Usuario no adquiere ningún derecho de
          propiedad sobre el código fuente, la arquitectura, las bases de datos, los diseños ni cualquier otro elemento
          de la Plataforma. Las funcionalidades concretas dependen del plan contratado, según el detalle publicado en el
          sitio, que integra este contrato.
        </p>

        <h5 className="mt-4">4. Registro, cuenta y credenciales</h5>
        <ul>
          <li>El Usuario debe suministrar información veraz, exacta, completa y actualizada. La falsedad de los datos faculta a Inventiory a suspender o dar de baja la cuenta.</li>
          <li>La cuenta es personal e intransferible. El Usuario es el único responsable de la custodia de sus credenciales y de toda operación realizada bajo ellas, aun por terceros.</li>
          <li>El Usuario administrador es responsable de crear, asignar roles y revocar los accesos de sus Usuarios finales, y de garantizar que éstos conozcan y cumplan estos Términos.</li>
          <li>Ante cualquier uso no autorizado o compromiso de credenciales, el Usuario debe notificarlo de inmediato a info@imperial-net.com.</li>
        </ul>

        <h5 className="mt-4">5. Precio, facturación y mora</h5>
        <ul>
          <li>
            <strong>Precio vigente:</strong> el uso del sistema tiene un valor de <strong>$15.000</strong> (pesos quince
            mil) por mes, [IVA incluido / más IVA]. Los precios son los publicados en el sitio al momento de la
            contratación, expresados en pesos argentinos (arts. 4 y 7, Ley 24.240).
          </li>
          <li>La suscripción se factura por períodos mensuales adelantados, renovándose automáticamente por períodos iguales salvo cancelación conforme el punto 9.</li>
          <li>Las operaciones se procesan íntegramente en los entornos de los procesadores de pago contratados.</li>
          <li><strong>Actualización de precios:</strong> Inventiory podrá modificar el precio de los planes notificando con una antelación mínima de 30 (treinta) días corridos. El Usuario que no acepte la modificación podrá rescindir sin penalidad alguna antes de su entrada en vigencia.</li>
          <li><strong>Mora:</strong> la falta de pago en término opera de pleno derecho por el mero vencimiento del plazo (art. 886, CCyCN) y habilita a Inventiory, previa intimación por medio fehaciente y transcurridos [10] días corridos, a suspender el acceso al Servicio. Transcurridos [30] días adicionales sin regularización, podrá rescindir el contrato.</li>
        </ul>

        <h5 className="mt-4">6. Derecho de revocación (Usuario consumidor)</h5>
        <p>
          Cuando el Usuario revista carácter de consumidor o usuario final en los términos del art. 1 de la Ley 24.240,
          le asiste el derecho irrenunciable de revocar la contratación dentro de los 10 (diez) días corridos contados
          desde la celebración del contrato, sin expresión de causa y sin costo alguno (arts. 34 de la Ley 24.240 y 1110
          a 1116 del CCyCN).
        </p>
        <p>
          Para ejercerlo basta con utilizar el <strong>Botón de Arrepentimiento</strong> disponible en la página
          principal del sitio (Resolución SCI N° 424/2020) o comunicarlo a <strong>info@imperial-net.com</strong>. El
          reembolso se efectúa por el mismo medio de pago utilizado.
        </p>
        <blockquote className="border-start border-3 ps-3 fst-italic">
          <p className="mb-0">
            <strong>Leyenda obligatoria (art. 1111, CCyCN):</strong> "Tiene usted el derecho irrenunciable de revocar la
            aceptación dentro de los diez (10) días corridos contados a partir de la celebración del contrato, sin
            responsabilidad alguna."
          </p>
        </blockquote>
        <p>Toda cláusula que pretenda limitar, dificultar o renunciar a este derecho se tiene por no escrita.</p>

        <h5 className="mt-4">7. Obligaciones y conductas prohibidas del Usuario</h5>
        <p>
          El Usuario se obliga a utilizar el Servicio conforme la ley, la buena fe (art. 9, CCyCN), el orden público y
          estos Términos. Queda expresamente prohibido:
        </p>
        <ul>
          <li>Acceder o intentar acceder sin autorización a sistemas, cuentas o datos ajenos, así como vulnerar medidas de seguridad — conductas tipificadas por la Ley N° 26.388 de Delitos Informáticos (arts. 153 bis, 157 bis, 183 y 184 del Código Penal).</li>
          <li>Realizar ingeniería inversa, descompilar, desensamblar o intentar obtener el código fuente, salvo en la medida imperativamente permitida por la ley.</li>
          <li>Revender, sublicenciar, ceder o explotar comercialmente el Servicio a terceros sin autorización escrita de Inventiory.</li>
          <li>Utilizar robots, <em>scrapers</em>, automatizaciones o consultas masivas que degraden el rendimiento de la Plataforma.</li>
          <li>Cargar contenido ilícito, que infrinja derechos de terceros, o datos personales respecto de los cuales no cuente con base legal para su tratamiento.</li>
          <li>Introducir virus, <em>malware</em> o cualquier rutina destinada a dañar los sistemas.</li>
          <li>Utilizar el Servicio para registrar operaciones de origen ilícito o para eludir obligaciones fiscales o de la Ley N° 25.246 de prevención de lavado de activos.</li>
        </ul>
        <p>
          El incumplimiento habilita la suspensión inmediata de la cuenta, sin perjuicio de las acciones civiles y
          penales que correspondan.
        </p>

        <h5 className="mt-4">8. Propiedad intelectual</h5>
        <ul>
          <li>
            <strong>Titularidad de Inventiory:</strong> el software, su código fuente y objeto, la arquitectura, la
            documentación, la marca "Inventiory", los logotipos, los diseños y la interfaz son de propiedad exclusiva de
            Inventiory o de sus licenciantes, protegidos por la Ley N° 11.723 de Propiedad Intelectual y la Ley N° 22.362
            de Marcas. Ningún derecho se cede al Usuario más allá de la licencia limitada del punto 3.
          </li>
          <li>
            <strong>Titularidad del Usuario:</strong> los datos cargados en la Plataforma son y permanecen de propiedad
            exclusiva del Usuario. Inventiory solo los trata en la medida necesaria para prestar el Servicio, y podrá
            emplear estadísticas agregadas y disociadas (art. 28, Ley 25.326) que no permitan identificar al Usuario ni a
            terceros.
          </li>
          <li>
            <strong>Sugerencias:</strong> las mejoras, ideas o <em>feedback</em> que el Usuario aporte voluntariamente
            podrán ser incorporados al producto sin generar derecho a compensación ni cotitularidad alguna.
          </li>
        </ul>

        <h5 className="mt-4">9. Duración, rescisión y baja</h5>
        <ul>
          <li>El contrato tiene la duración del período de suscripción contratado y se renueva automáticamente por períodos iguales.</li>
          <li>
            <strong>Baja por el Usuario:</strong> puede darse de baja en cualquier momento y sin expresión de causa,
            desde el mismo sitio web y por el mismo medio por el que contrató, mediante el procedimiento de Baja On Line
            previsto en la Resolución SCI N° 424/2020. La solicitud se hace efectiva al finalizar el período ya abonado.
          </li>
          <li>
            <strong>Rescisión por Inventiory:</strong> por mora del Usuario; por incumplimiento grave del punto 7, con
            efecto inmediato; o sin causa, notificando con 60 (sesenta) días corridos de anticipación y reintegrando la
            porción proporcional no devengada del precio abonado.
          </li>
          <li>
            <strong>Portabilidad de la información:</strong> extinguido el contrato por cualquier causa, el Usuario
            dispone de 90 (noventa) días corridos para exportar sus datos en formato estructurado y de uso común.
            Inventiory no retendrá los datos del Usuario como medio de coacción para el cobro de sumas adeudadas.
          </li>
        </ul>

        <h5 className="mt-4">10. Disponibilidad, mantenimiento y niveles de servicio</h5>
        <p>
          Inventiory realiza sus mejores esfuerzos para mantener el Servicio disponible de forma continua,
          comprometiéndose a un objetivo de disponibilidad mensual del [99,5]%. Del cómputo se excluyen las ventanas de
          mantenimiento programado notificadas con al menos [48] horas de anticipación, las fallas atribuibles a la
          conectividad o al equipamiento del Usuario, y los supuestos de caso fortuito o fuerza mayor (arts. 955 y 1730,
          CCyCN), incluyendo cortes de energía, fallas de proveedores de infraestructura, ataques informáticos de
          terceros y actos de autoridad.
        </p>
        <p>
          Inventiory podrá modificar, actualizar o discontinuar funcionalidades. Cuando la discontinuación sea sustancial
          y afecte el objeto del contrato, será notificada con 60 (sesenta) días de anticipación, quedando el Usuario
          habilitado a rescindir sin penalidad con reintegro proporcional.
        </p>

        <h5 className="mt-4">11. Garantías y responsabilidad</h5>
        <ul>
          <li>El Servicio se presta conforme a las funcionalidades descriptas en la documentación vigente. Inventiory no garantiza que el Servicio sea ininterrumpido o libre de errores, ni que resulte apto para fines particulares no informados expresamente por escrito.</li>
          <li>El Usuario es exclusivamente responsable de la veracidad, exactitud y licitud de la información que carga; del cumplimiento de sus obligaciones fiscales, contables, laborales y de protección de datos; y de la validación de todo dato que utilice para tomar decisiones comerciales. Los reportes, alertas y proyecciones de la Plataforma son herramientas de apoyo de carácter orientativo y no constituyen asesoramiento contable, impositivo ni legal.</li>
          <li><strong>Limitación de responsabilidad (Usuario NO consumidor):</strong> cuando el Usuario contrate en el marco de su actividad profesional o empresarial, la responsabilidad total y acumulada de Inventiory se limita al monto efectivamente abonado en los 12 (doce) meses inmediatos anteriores al hecho generador, sin responder por lucro cesante, pérdida de chance ni daños indirectos.</li>
          <li><strong>Usuario consumidor:</strong> la limitación anterior no se aplica. Rige plenamente el régimen de la Ley N° 24.240, incluidos sus arts. 10 bis, 37 y 40, y se tienen por no convenidas las cláusulas que desnaturalicen las obligaciones o limiten la responsabilidad por daños (art. 37, LDC; art. 988, CCyCN).</li>
          <li><strong>Dolo y culpa grave:</strong> ninguna limitación alcanza a los daños causados por dolo o culpa grave de Inventiory o de sus dependientes (art. 1743, CCyCN), ni a los daños a la persona.</li>
        </ul>

        <h5 className="mt-4">12. Confidencialidad</h5>
        <p>
          Cada parte se obliga a mantener en reserva la información confidencial de la otra a la que acceda con motivo de
          este contrato, con el mismo grado de diligencia que emplea respecto de la propia y nunca menor a la razonable,
          durante la vigencia del contrato y por [3] años posteriores a su extinción. Quedan exceptuadas la información
          de dominio público, la conocida previamente sin obligación de reserva y la requerida por autoridad competente.
          Rige supletoriamente la Ley N° 24.766 de Confidencialidad.
        </p>

        <h5 className="mt-4">13. Protección de datos personales</h5>
        <p>
          El tratamiento de datos personales se rige por la Política de Privacidad. Respecto de los datos personales de
          terceros que el Usuario cargue en la Plataforma, el Usuario reviste el carácter de Responsable del tratamiento
          e Inventiory el de prestador de servicios de tratamiento en los términos del art. 25 de la Ley N° 25.326,
          obligándose a tratarlos únicamente conforme las instrucciones del Usuario y a no aplicarlos ni cederlos a otro
          fin. El Usuario garantiza contar con base legal suficiente para dicha carga y mantiene indemne a Inventiory
          frente a reclamos derivados de su falta.
        </p>

        <h5 className="mt-4">14. Modificación de los Términos</h5>
        <p>
          Inventiory podrá modificar estos Términos. Las modificaciones sustanciales serán notificadas por correo
          electrónico y mediante aviso destacado en la Plataforma con una antelación mínima de 10 (diez) días corridos a
          su entrada en vigencia. El Usuario que no las acepte podrá rescindir sin penalidad ni costo antes de esa fecha;
          el uso posterior del Servicio importa su aceptación.
        </p>

        <h5 className="mt-4">15. Notificaciones y domicilios</h5>
        <p>
          Las comunicaciones a Inventiory se dirigen a <strong>info@imperial-net.com</strong> y al domicilio del punto 1.
          Las comunicaciones al Usuario se cursan al correo electrónico registrado en su cuenta, que se constituye como
          domicilio electrónico a todos los efectos (art. 75, CCyCN), siendo carga del Usuario mantenerlo actualizado y
          operativo.
        </p>

        <h5 className="mt-4">16. Cesión</h5>
        <p>
          El Usuario no puede ceder su posición contractual sin conformidad escrita de Inventiory. Inventiory podrá
          cederla en supuestos de reorganización societaria o transferencia de fondo de comercio, notificando al Usuario,
          quien podrá rescindir sin penalidad dentro de los [30] días si la cesión afecta sus derechos.
        </p>

        <h5 className="mt-4">17. Nulidad parcial e integración</h5>
        <p>
          La declaración de invalidez de alguna cláusula no afecta la validez de las restantes, las que conservan plena
          vigencia. La cláusula inválida se integra conforme la finalidad económica del contrato y el criterio de los
          arts. 989 y 1122 del CCyCN. En caso de duda sobre los alcances de la obligación del Usuario consumidor, se
          estará a la interpretación que le resulte menos gravosa (art. 37 in fine, Ley 24.240; art. 1095, CCyCN).
        </p>

        <h5 className="mt-4">18. Ley aplicable, reclamos y jurisdicción</h5>
        <p>Este contrato se rige exclusivamente por las leyes de la República Argentina.</p>
        <p>
          El Usuario consumidor puede efectuar su reclamo ante la Dirección Nacional de Defensa del Consumidor o la
          autoridad local competente, e iniciar el procedimiento gratuito del Servicio de Conciliación Previa en las
          Relaciones de Consumo (COPREC), creado por la Ley N° 26.993 —{' '}
          <a href="https://www.argentina.gob.ar/defensadelconsumidor" target="_blank" rel="noopener noreferrer">
            argentina.gob.ar/defensadelconsumidor
          </a>
          .
        </p>
        <p>
          Para toda controversia con un Usuario no consumidor serán competentes los Tribunales Ordinarios de [CIUDAD],
          con renuncia a todo otro fuero o jurisdicción.
        </p>
        <blockquote className="border-start border-3 ps-3 fst-italic">
          <p className="mb-0">
            Para el Usuario consumidor rige el art. 36, último párrafo, de la Ley N° 24.240: será competente el tribunal
            correspondiente al domicilio real del consumidor, siendo nula toda cláusula de prórroga de jurisdicción en
            sentido contrario. Dicha nulidad puede ser declarada de oficio por el juez.
          </p>
        </blockquote>

        <p className="mt-4">
          Para consultas legales, escribinos a <strong>info@imperial-net.com</strong>.
        </p>

        <hr className="mt-4" />
        <p className="small mb-0" style={{ opacity: .6 }}>
          Términos y Condiciones de Uso — versión 1.0
        </p>
      </Container>
    </section>
  );
};

export default TermsPage;
