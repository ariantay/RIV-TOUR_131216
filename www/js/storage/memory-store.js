var MemoryStore = function(successCallback, errorCallback) {
    this.findById = function(id, callback) {
        var statues = this.statues;
        var statue = null;
        var l = statues.length;
        for (var i=0; i < l; i++) {
            if (statues[i].id === id) {
                statue = statues[i];
                break;
            }
        }
        callLater(callback, statue);
    }

    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

     this.statues = [
		{ "id": 0, "name": "Ysmael Villegas", "lon": -117.375471, "lat": 33.980080, "distance": 25, "phone": "123-456-7890", "street": "Near the corner of Main Street and Tenth Street", "city": "Riverside", "state": "CA", "weblink": "http://www.riversideca.gov/museum/", "info": { 
			"english":"Much like a Hollywood movie, Staff Sergeant Ysmael “Smiley” Villegas, nicknamed “Smiley” because of the broad smile he often had on his face, joined the U.S. Army in July, 1944. About eight months later, Villegas led his men into combat, at the Battle of Luzon, to take a hill for strategic purposes. The enemy was heavily entrenched and fought back vigorously. Even in the face of great danger, Villegas led his men up the hill and, in a move that drew enemy fire to him and away from his men, attacked five enemy foxholes.  “Running like a football player, he charged a network of foxholes, neutralizing five enemy gun squads, saving 400 trapped American soldiers,” an eyewitness reported. But as he made his way to the sixth foxhole, Villegas was mortally wounded. He was awarded the Medal of Honor by President Harry Truman making Villegas Riverside County’s first recipient of the Medal of Honor. The National Medal of Honor is the highest award the United States of America awards for bravery.</br></br>Villegas grew up in Riverside’s Casa Blanca neighborhood and rose to display true heroism and bravery in World War II. March 20, 1945 – one day before his 21st birthday –Villegas was credited with saving the lives of his entire squadron of U.S. troops.  He was buried with full military honors at Riverside National Cemetery, just a few miles from where he grew up.</br></br>The area around the statue is known as Veterans Plaza, which honors the sacrifices made over the years by members of America’s armed forces.</br></br>The statue was unveiled on May 27, 1995.", 
			"spanish":"Como una película de Hollywood es la vida del sargento Ysmael Villegas, dado el apodo de “Smiley” porque siempre tenía una gran sonrisa en la cara. Él se inscribió en el ejército de los Estados Unidos en el mes de julio de 1944. Solo 8 meses después, Villegas dirigió sus soldados a combate en la batalla de Luzon, para obtener una colina para una ventaja estratégica. El enemigo estaba en buena posición y atacó con mucha fuerza.</br></br>Aunque el peligro era monumental, Villegas dirigió a sus soldados sobre la colina. El  atrajo la atención de las balas de los enemigos a él y ataco a 5 de sus trincheras. “Corrió como un jugador de football, ataco las trincheras, y salvo a 400 soldados  atrapados americanos,” reporto un testigo. Pero en camino a la sexta trinchera, Villegas fue herido gravemente.</br></br>La medalla de honor fue presentada a Villegas quien fue el primero en recibirla del condado de Riverside, por el presidente Harry Truman. La medalla nacional de honor es el reconocimiento más alto que da los Estados Unidos por demostrar gran valentía.</br></br>Villegas creció en la ciudad de Riverside en el vecindario casa blanca. Él fue un verdadero ejemplo de valentía y heroísmo en la segunda guerra mundial. Él 20 de marzo de 1945, un día antes de cumplir veinte un años, Villegas fue acreditado con salvar las vidas de todos sus soldados americanos. Villegas fue enterrado con honores militares en el cementerio nacional de Riverside, unas millas cerca de donde creció.</br></br>El área alrededor de la estatua es conocida como la plaza de veteranos, que honra los sacrificios hechos sobre los años por los miembros de las fuerzas armadas.</br></br>La estatua en su honor fue presentada al público el 27 de mayo de 1995."},
		'textFile':'test.txt', 'urlstring':'villegas'},
		{ "id": 1, "name": "Martin Luther King Jr.", "lon": -117.375075, "lat": 33.981092, "distance": 25, "phone": "123-456-7890", "street": "Near the corner of Main Street and Ninth Street", "city": "Riverside", "state": "CA", "weblink": "http://www.riversideca.gov/museum/", "info": { 
			"english":"The Martin Luther King Jr. statue was unveiled May 22nd 1999 and was built as a reminder to live the dream of peace, justice and equality for all humankind. Martin Luther King Jr. was a Baptist minister who became a leader in the African-American Civil Rights Movement and ultimately became a Civil Rights icon for the world. In Montgomery, Alabama, he led a boycott against segregated buses.  In Birmingham, Alabama, he organized many nonviolent protests that gained national attention for the brutal actions from the police toward the protestors. Dr. King is best known for his 1963 “I Have a Dream” speech that he delivered at the March on Washington.</br></br>	This statue shows Martin Luther King Jr. in a minister’s robe flowing with his forward step. The robe has images of the Civil Rights Movement carved into it including Rosa Parks, the Montgomery bus boycott, the March on Washington and the Birmingham Jail where Dr. King wrote his famous letters. The sculptor also included portraits of people such as Gandhi, who inspired King’s philosophy of nonviolent protest, his wife, Coretta King and their children, and others who joined him in the Civil Rights Movement. Dr. King is shown striding forward to capture the spirit of the “I Have a Dream” speech in which he envisions a future where “people are not judged by the color of their skin, but by the content of character.”",
			"spanish":"La estatua de Martin Luther King Jr. fue presentada al público el 22 de mayo de 1999 y fue construida como un recuerdo para compartir su sueño de  paz, justicia, e igualdad para toda la humanidad. Martin Luther King Jr. fue un pastor Bautista quien se convirtió en un líder y símbolo para el movimiento de los derechos civiles de afro- americanos.</br></br>	En Montgomery, Alabama el dirigió un boicot contra los autobuses segregados. Luego en Birmingham, Alabama organizo muchas protestas no violentas para atraer la atención nacional por los actos de brutalidad por parte de la policía contra los protestantes. El doctor King fue muy reconocido por su discurso  titulado Yo Tengo un Sueño que conmovió a todos en la marcha en Washington.</br></br>	Esta estatua enseña a Martin Luther King Jr. en una bata de pastor  y el marchando hacia adelante. Su bata tiene imágenes del movimiento de derechos civiles que incluyen a la gran Rosa Parks, el boicot de autobuses segregados  en Montgomery, la marcha en Washington, y la prisión de Birmingham donde el doctor King escribió sus cartas famosas.</br></br>	El escultor también incluyo las caras de Gandhi quien inspiro la filosofía non violenta de King y a la esposa Coretta y sus hijos que marcharon con él. El doctor King está marchando hacia adelante para capturar el espíritu de su discurso Yo Tengo un Sueño en el cual ve un futuro donde la gente no será juzgada por el color de su piel, si no por su carácter."},
		'textFile':'test.txt', 'urlstring':'king'},
		{ "id": 2, "name": "Cesar Chavez", "lon": -117.374638, "lat": 33.981843, "distance": 25, "phone": "123-456-7890", "street": "The Southwest corner of Main Street and University Avenue", "city": "Riverside", "state": "CA", "weblink": "http://www.riverside.courts.ca.gov/bldgs/historic.shtml", "info": { 
			"english":"Cesar Chavez rose from humble beginnings to become one of the world’s best-known Mexican Americans and a hero in the Latino civil rights movement. As a farm worker, then a labor leader and ultimately a civil rights activist, Chavez demonstrated the power one individual can have to generate a spark that ignites a movement which can create change in our society.</br></br>	As follower and practitioner of nonviolent heroes like Rev. Martin Luther King Jr. and Gandhi, Chavez used non-violence as a form of political protest. Chavez drew attention to the plight of farmworkers not just in California, but around the world. In the process, he inspired countless people, especially Latinos, to fight for their beliefs and not accept the status quo.</br></br>	Through boycotts, strikes and other political actions, including fasting and other forms of personal sacrifice, Chavez led a movement that turned commitment into change. By the late 1970s, Chavez had turned the United Farm Workers Union, a union he co-founded, into the bargaining unit for 50,000 field workers in California and Florida.  His trademark chant -- “Si, se puede,” or “Yes, we can” moved a generation and beyond.</br></br>	His death on April 23, 1993 was mourned by people of all races from across California and throughout the United States. His birthday, March 31, is now known as Cesar Chavez Day and is a state holiday in California, Colorado and Texas.</br></br>	The statue was unveiled June 8, 2013.", 
			"spanish": "César Chávez vino de raíces humildes y se convirtió en uno de los héroes mexico-americano más reconocido del movimiento social de derechos para campesinos en los Estados Unidos. Chávez empezó como un trabajador agrícola, después un líder sindical, y finalmente se convirtió en el portavoz y gran activista de derechos civiles. El demostró el poder que un solo individuo puede tener en empezar un movimiento que sí puede crear cambio en nuestra sociedad.</br></br>	Chávez protestaba políticamente mediante marchas, huelgas y boicots, siguiendo los ejemplos de otros héroes de no violencia como Martin Luther King Jr. y Gandhi. El expuso la cruel realidad de los problemas de los campesinos en California en todo el mundo. Durante la lucha el inspiro a mucha gente especialmente a los Latinos, que lucharan por lo que querían y que no aceptaran la discriminación de la sociedad.</br></br>	El ayudo a empezar la Unión de Campesinos Unidos y en 1970 ya tenía más de 50,000 trabajadores  agrícolas que eran miembros de California y Florida. Tenía muchos admiradores y seguidores que reconocían muy bien su grito de “Si, se puede” y crean en él poder que podía crear. Chávez fue el gran líder que si cumplió en mejorando las vidas de los campesinos con salarios adecuados y con la primera declaración de derechos para los trabajadores agrícolas.</br></br>	El falleció el día 23 de abril de 1993 e impacto a gente de todas razas en California y todos Estados Unidos. El día de su nacimiento el 31 de marzo es reconocido como El Día de César Chávez y es un día oficial en California, Colorado, y Tejas.</br></br>	La estatua hecha en su honor fue presentada al público el 8 de julio del 2013."},
		'textFile':'test.txt', 'urlstring':'chavez'},
		{ "id": 3, "name": "Dosan Ahn Chang-Ho", "lon": -117.374328, "lat": 33.982079, "distance": 25, "phone": "123-456-7890", "street": "Near the corner of Main Street and University Avenue", "city": "Riverside", "state": "CA", "weblink": "http://en.wikipedia.org/wiki/The_Mission_Inn_Hotel_%26_Spa", "info": { 
			"english":"The statue here was created to credit the legacy of Korean born “Dosan” Ahn Chang-Ho:  a pioneer, an educator, an orange picker and a patriot.</br></br>	He was a Korean Independence activist and spent seven years in Riverside as a worker and leader of Korean citrus grove workers.  Ahn Chang-Ho was one of the early leaders of the Korean-American immigrant community in the United States.  He is often referred to by his pen name “Dosan” which means Island Mountain.</br></br>	Dosan was born in a small town in Korea in 1878 and came to America in 1902. He came to Riverside in 1904 to help the community of Korean farm workers. He lived in a small Korean village on Pachappa Avenue now known as Commerce Street and he picked oranges for Cornelius Earle Rumsey, owner of Alta Cresta Groves.</br></br>	Dosan was no ordinary ranch hand.  Following Japan’s authorization of Korea in 1910, Dosan formulated the basics for the Provisional Government of Korea right here in Riverside. Dosan left Riverside in 1919 to organize the Korean Provisional Government, as an exile in Shanghai, China. The government upheld the Shanghai Declaration of Independence based on Dosan’s democratic ideals.  He died in 1938 and a national memorial commemorating his work now stands in the center of Gangnam District in Seoul, one of Riverside’s distinguished sister cities. He is one of Korea's most respected patriotic figures and his statue draws people from all over the world.</br></br>	The statue was unveiled on August 11, 2001.",
			"spanish": "Esta estatua fue creada para honrar el legado del coreano “Dosan” Ahn Chang-Ho que fue un líder, educador, trabajador agrícola, y un patriota. Él fue un activista para la independencia de Corea y vivió 7 años en la ciudad de Riverside como trabajador y líder de los trabajadores coreanos de los campos de naranjas. Ahn Chang-Ho fue uno de los primeros líderes de la comunidad de inmigrantes coreano- americanos en los Estados Unidos. Ahn es conocido también por el nombre “Dosan” que significa Isla Montaña.</br></br>	Dosan nació en un pequeño pueblo en corea en 1878 y llego a américa en 1902. Se movió a Riverside en 1904 para ayudar a la comunidad de trabajadores coreanos agrícolas. Él vivió en una comunidad pequeña coreana en la avenida de Pachappa que ahora es conocida como la calle de Commerce. El piscaba naranjas para el dueño de Alta Cresta Groves que se llamaba Cornelius Earle Rumsey.</br></br>	Dosan no solo trabajaba en la agricultura en Riverside también formulo los principios para el Gobierno Provisional de Corea después de que se independizara de Japón. Dosan dejo Riverside en 1919 para organizar el Gobierno Provisional de Corea cuando estaba en  exilio en Shanghai, China. Las ideas democráticas de Dosan también fueron aplicadas por el gobierno de Shanghai en su propia Declaración de Independencia.</br></br>	El falleció en 1938 y un monumento nacional conmemorando su trabajo está en el centro del Distrito Gangnam en Seoul, que también es una ciudad hermana de Riverside. Dosan es una figura patriótica muy respetada. La estatua hecha en su honor fue presentada al público el 11 de agosto del 2001 y es visitado por gente de todo el mundo."}, 
		'textFile':'test.txt', 'urlstring':'chang-ho'},
		{ "id": 4, "name": "Mahatma Gandhi", "lon": -117.373918, "lat": 33.982729, "distance": 25, "phone": "123-456-7890", "street": "Near the corner of Main Street and Mission Inn Avenue", "city": "Riverside", "state": "CA", "weblink": "http://en.wikipedia.org/wiki/Universalist_Unitarian_Church_of_Riverside", "info": {
			"english":"Welcome to the statue honoring civil rights leader Mahatma Gandhi, “The ‘great-souled one” whose spirit for political greatness came to fruition in a land located on the opposite side of the Earth, in another century, and in another language most of us would not understand but speaks loudly to the richness of Riverside’s soul.</br></br>	Born on October 2, 1869, the preeminent leader of Indian nationalism in British-ruled India, Mahatma Gandhi led India to independence and inspired movements for civil rights and freedom across the world.  He lived very modestly and wore the traditional Indian dhoti and shawl, woven with yarn hand spun on a charkha as displayed on the statue before you.</br></br>	Gandhi first employed civil disobedience as an expatriate lawyer in South Africa, in the resident Indian community’s struggle for civil rights.  After his return to India in 1915, he undertook the organization of farmers and urban laborers to protest against excessive land-tax and discrimination.  Additionally, he led nationwide campaigns for easing poverty, expanding women’s rights, and building religious and ethnic harmony.  In 1930, Gandhi famously led Indians in the 250 mile Dandi Salt March, challenging the British-imposed salt tax.</br></br>	Although Gandhi was committed to nonviolence and truth in all situations, he was imprisoned for many years in both South Africa and India due to his outspoken beliefs.</br></br>	The statue was unveiled on October 9, 2005.", 
			"spanish":"Bienvenido al estatua en honor al líder de derechos civiles Mahatma Gandhi.  “El gran alma y su conocimiento de política llego a lo más alto en otra tierra localizada en el otro lado del mundo, en otro siglo, y en otra lengua que muchos de nosotros no entendemos pero habla fuerte a la riqueza del espíritu de Riverside.”</br></br>	Nació el 2 de octubre de 1869 y fue el líder principal dé nacionalismo Indio en la India la cual era controlada por Britania. Mahatma Gandhi dirigió a India a la independencia e inspiro movimiento para los derechos civiles y libertad alrededor del mundo. Él vivía muy humildemente y llevaba puesto el tradicional vestuario Indio con el dhoti y sarape que estaba hecho a mano en una rueda conocida como charkha.</br></br>	Gandhi primero trabajo con la desobediencia civil cuando era abogado extranjero en Sur África, en una comunidad de residentes indios que luchaban por sus derechos civiles. Después de regresar a la India en 1915, él fue líder de una organización de granjeros y trabajadores urbanos para protestar contra el impuesto excesivo de la tierra y la discriminación. También fue líder de campañas nacionales para ayudar a la pobreza, derechos para las mujeres, y construcción de edificios religiosos. En 1930, Gandhi dirigió a los hindús en la marcha de la sal de Dandi, para rechazar el impuesto forzado por los británicos.</br></br>	Aunque Gandhi fue un hombre no violento y honesto en todas las situaciones, el fue arrestado y puesto en prisión por muchos años en Sur África y India por compartir sus creencias.</br></br>	 La estatua fue presentada al público el 9 de octubre del 2005.</br></br>"},
		'textFile':'test.txt', 'urlstring':'gandhi'},
		{ "id": 5, "name": "Eliza Tibbets", "lon": -117.373358, "lat": 33.983756, "distance": 25, "phone": "123-456-7890", "street": "Near the Southwest corner of Main Street and Sixth Street", "city": "Riverside", "state": "CA", "weblink": "http://www.riversideca.gov/museum/", "info": { 
			"english":"Before you stands a vivacious, charming and well-spoken woman that has more than likely impacted your every day life.</br></br>	Born in 1823, Eliza Tibbets lived in New York, Washington D.C. and Ohio before coming to Riverside in the 1870s.  Upon arrival in Riverside, Eliza was interested in plants to grow in their yard located at Central Avenue near Palm so she wrote a letter to a friend from Washington D.C., William Sunders, a gentleman in charge of the U.S. Government Plant Importation Program.</br></br>	Immediately, Sunders shipped two samples of seedless naval orange trees to Riverside.  Eliza was diligent in caring for her trees; one account says that she watered the young trees with her dishwater obtained from the Gage Canal.  To her delight of Eliza, the trees quickly took to Riverside’s climate and exceeded all expectations, growing greater with size and with a much improved flavor than when grown in Washington D.C.  In order to credit the originating samples, the delicious orange was appropriately named the Washington Navel.</br></br>	Eliza is credited with introducing the Washington Navel orange to Riverside and ultimately to the world, giving Riverside an international name and boosting the local economy.  One of the original trees now grows in a tiny, triangular park at the junction of Arlington and Magnolia Avenues.  It still bears a healthy annual crop and is known as the Parent Navel Orange Tree.</br></br>	The statue was unveiled on August 5, 2011.", 
			"spanish":"En frente de ti esta una mujer encantadora, animada, e inteligente que de seguro ha impactado tu vida.</br></br>	Eliza Tibbets nació en 1823 y vivió en Nueva York, Washington Distrito de Columbia, y Ohio antes de mudarse a la ciudad de Riverside en 1870. Eliza quería crecer nuevas plantas en su jardín de su casa localizada en la avenida Central cerca de la calle Palm. Ella escribió una carta a su amigo William Saunders en Washington D.C. el cual estaba encargado del Programa de Importación de Plantas para el Gobierno de los Estados Unidos.</br></br>	Inmediatamente, Saunders le mando dos muestras de árboles de naranja naval a Riverside. Eliza cuido muy bien de sus árboles dándoles agua que ella colectaba del canal Gage. Los arboles crecieron rápidamente en el clima de Riverside y superaron todas las expectativas de Eliza porque crecieron más que su tamaño normal y con mejor sabor que cuando los crecían en Washington D.C. Las deliciosas naranjas fueron nombradas Washington Navel para darle crédito al lugar de su origen.</br></br>	Eliza fue la responsable de introducir la naranja de Washington Navel a Riverside y al resto del mundo. Esto ayudo en convertir a Riverside en una ciudad  reconocida internacional y a subir la economía local. Uno de los arboles originales ahora crece en un pequeño, parque triangular en la intersección de las avenidas Arlington y Magnolia. Cada año da un buen fruto y es reconocido como el árbol padre de las naranjas navel.</br></br>	La estatua hecha en su honor fue presentada al público el 5 de agosto del 2011."},
		'textFile':'test.txt', 'urlstring':'tibbets'},
	];
		
    callLater(successCallback);
}