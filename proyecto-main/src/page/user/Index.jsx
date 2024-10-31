import React from 'react';
import './styles.css';

export const Index = () => {
    

    return (
        <div>
            
            <header className="header1">
                
                <div className="header1-content container">
                    <ul className="header-links">
                        
                            <a href="/Reserva">Reservas</a>
                            <a href="/Lugares">Lugares</a>
                            <a href="VerR">Ver reservas</a>
                            <a href="/">Salir</a>
                        
                    </ul>
                    <h1>EasyPlanning</h1>
                    <p>
                        ¡Descubre un mundo de posibilidades para tus eventos! En nuestra plataforma de reserva,
                        encontrarás el espacio perfecto para celebrar cualquier ocasión especial.
                        Desde bodas y cumpleaños hasta conferencias y reuniones corporativas, estamos aquí para hacer realidad tus sueños.
                        Con una amplia variedad de lugares y servicios personalizados, planificar tu evento nunca ha sido tan fácil.
                        ¡Reserva ahora y comienza a crear recuerdos inolvidables!
                    </p>
                </div>
            </header>
            <section className="Canchas">
                <div className="Canchas-content container">
                    <h2>Tipos de Ambientes</h2>
                    <p className="txt-p">
                        "¡Mira lo que te ofrecemos, y aún hay mucho más esperándote!
                        Nuestra amplia gama de opciones está diseñada para satisfacer todas tus necesidades y superar tus expectativas.
                        Desde espacios elegantes y versátiles hasta servicios adicionales que hacen que cada evento sea único y memorable,
                        estamos aquí para hacer realidad tus visiones. Explora nuestra selección y descubre todo lo que tenemos preparado para ti.
                        ¡No esperes más para hacer de tu evento algo extraordinario!"
                    </p>
                </div>

                <div className="Canchas-group1">
                    <div className="Canchas-1">
                        <h3>CANCHAS</h3>
                        <img src="images/CANCHA_1.jpg" alt="Imagen 1" />
                        <img src="images/CANCHA_2.jpg" alt="Imagen 2" />
                    </div>
                </div>

                <div className="SALONES-group">
                    <div className="Canchas-2">
                        <h3>SALONES SOCIALES</h3>
                        <img src="images/SALONES_1.jpg" alt="Imagen 2" />
                        <img src="images/SALONES_2.png" alt="Imagen 2" />
                    </div>
                </div>

                <div className="AIRE_LIBRE-group">
                    <div className="Canchas-3">
                        <h3>AIRE LIBRE</h3>
                        <img src="images/AIRE LIBRE_1.jpg" alt="Imagen 1" />
                        <img src="images/AIRE LIBRE_2.jpg" alt="Imagen 2" />
                    </div>
                </div>
            </section>

            <main className="Servicios">
                <div className="Servicios-content container">
                    <h2>Servicios de Reserva</h2>
                    <div className="Servicios-group">
                        <div className="Servicios-1">
                            <img src="images/381594_field_football_icon.png" alt="" />
                            <h3>Paquetes</h3>
                        </div>
                        <div className="Servicios-2">
                            <img src="images/baloncesto.png" alt="" />
                            <h3>Eventos en Canchas</h3>
                        </div>
                        <div className="Servicios-3">
                            <img src="images/evento (2).png" alt="" />
                            <h3>Salones de Eventos</h3>
                        </div>
                    </div>
                    <p>
                        "Explora y reserva los mejores eventos para hacer de tu día una experiencia inolvidable. Elige entre una variedad de opciones personalizadas y asegura tu lugar en un solo clic."
                    </p>
                </div>
            </main>

            <section className="general">
                <div className="general-1">
                    <h2>Paquete Fresh Air Premium</h2>
                    <p>
                        Transforma tu evento deportivo en una experiencia inolvidable con nuestro exclusivo <strong></strong>. 
                        Este sofisticado paquete incluye:
                    </p>
                    <ul>
                        <li><strong>Cancha:</strong> Disfruta de un espacio excepcional para tus actividades.</li>
                        <li><strong>Agua Fresca:</strong> Hidratación garantizada para mantener la energía.</li>
                        <li><strong>Sillas y Mesas Elegantes:</strong> Comodidad y estilo para tus invitados.</li>
                        <li><strong></strong> Todo lo necesario para un juego emocionante.</li>
                        <p><strong>¡Reserva ahora y celebra a lo grande!</strong></p>

                    </ul>
                    
                        
                    
                </div>
                <div className="general-2"></div>
            </section>

            <section className="general">
                <div className="general-3"></div>
                <div className="general-1">
                    <h2>Paquete Recreation Basic</h2>
                    <p>
            <strong>Transforma tu celebración en un evento inolvidable con nuestro Paquete de Salones de Eventos.</strong> 
            
        </p>
        <ul>
            <li><strong>Decoración Personalizada:</strong> Nuestros decoradores se encargarán de que el espacio refleje tu estilo único.</li>
            <li><strong>Servicio de Comida:</strong> Menús variados adaptados a tus gustos y preferencias.</li>
            <li><strong>Música en Vivo o DJ:</strong> Ambientamos tu evento con la mejor selección musical para mantener el ritmo.</li>
            <li><strong>Asesoría Completa:</strong> Te acompañamos en la planificación para que todo salga perfecto.</li>
        </ul>
        <p><strong>¡Reserva ahora y celebra a lo grande!</strong></p>
                </div>
            </section>

            <section className="blog container">
                <h2>EXPERIENCIAS</h2>
                <p>
                    Somos los mejores y nuestros usuarios lo confirman. Aquí algunas de las reseñas.
                </p>
                <div className="blog-Content">
                    <div className="blog-1">
                        <img src="images/decoracion-bodas-playa.jpg" alt="" />
                        <h3>EXPERIENCIA 1</h3>
                        <p>
                            "EasyPlanning ha transformado la manera en que organizo mis eventos. 
                             La interfaz es intuitiva y encontrar el lugar perfecto para mi cumpleaños fue muy fácil. 
                             ¡Definitivamente volveré a usarla para mi próxima fiesta!"
                        </p>
                    </div>
                    <div className="blog-1">
                        <img src="images/salon.jpg" alt="" />
                        <h3>EXPERIENCIA 2</h3>
                        <p>
                            "Tuve una experiencia maravillosa utilizando EasyPlanning para organizar una reunión de trabajo.
                            Las opciones de servicios personalizados hicieron que fuera mucho más sencillo coordinar todo. 
                            ¡Recomiendo esta app a todos mis colegas!"
                        </p>
                    </div>
                    <div className="blog-1">
                        <img src="images/eventos-sociales.jpg" alt="" />
                        <h3>EXPERIENCIA 3</h3>
                        <p>
                            "¡Me encantó usar EasyPlanning para nuestra boda! La variedad de lugares y paquetes es impresionante.
                             Además, el proceso de reserva fue rápido y sin complicaciones. 
                             ¡Hicieron que nuestro día especial fuera aún mejor!"
                        </p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content container">
                    <div className="link">
                        <h3>CONTACTOS</h3>
                        <ul>
                         <li><a href="#">+57 3104780159</a></li>
                        <li><a href="#">+57 3205696560</a></li>
                         <li><a href="#">easyplanning2024@gmail.com</a></li>
                         <li><a href="#">Línea fija 605 6698256</a></li>
                        </ul>
                    </div>

                    <div className="link">
                        <h3>INFORMACIÓN</h3>
                        <ul>
                            <li><a href="#">Atencion de 8 am a 12 pm</a></li>
                            <li><a href="#">Sobre nosotros</a></li>
                            <li><a href="#">Terminos y Condiciones</a></li>
                            <li><a href="#">Afiliate con nosotros</a></li>
                        </ul>
                    </div>

                    
                    <div className="link">
                        <h3>¿QUIÉNES SOMOS?</h3>
                        <ul>
                        <li><a href="https://www.instagram.com/easyplanning_reserves/profilecard/?igsh=ZWxoejB0Z241dGZu">INSTAGRAM</a></li>
                            <li><a href="https://www.facebook.com/profile.php?id=61567854211544&mibextid=ZbWKwL">FACEBOOK</a></li>
                            <li><a href="https://x.com/EASYPLANNINGg">TWITTER</a></li>
                            <li><a href="https://www.youtube.com/@EASYPLANNINGwmraic/videos">YOUTUBE</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
